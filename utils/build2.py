#!/usr/bin/env python

try:
	import argparse
	ap = 1
except ImportError:
	import optparse
	ap = 0

import os
import tempfile
import sys

COMMON_FILES = [
'MOD3.js',
'util/ModConstant.js',
'core/Point.js',
'core/Matrix.js',
'core/Vector3.js',
'core/Matrix4.js',
'core/VertexProxy.js',
'core/FaceProxy.js',
'core/MeshProxy.js',
'core/Modifier.js',
'plugins/Library3d.js',
'plugins/PluginFactory.js',
'ModifierStack.js',
'modifiers/Pivot.js',
'modifiers/Bend.js',
'plugins/Three/LibraryThree.js',
'plugins/Three/VertexThree.js',
'plugins/Three/MeshThree.js',
]

def merge(files):

	buffer = []

	for filename in files:
		with open(os.path.join('..', 'src', filename), 'r') as f:
			buffer.append(f.read())

	return "".join(buffer)


def output(text, filename):

	with open(os.path.join('..', 'build', filename), 'w') as f:
		f.write(text)


def compress(text):

	in_tuple = tempfile.mkstemp()
	with os.fdopen(in_tuple[0], 'w') as handle:
		handle.write(text)

	out_tuple = tempfile.mkstemp()

	os.system("java -jar compiler/compiler.jar --language_in=ECMASCRIPT5_STRICT --js %s --js_output_file %s" % (in_tuple[1], out_tuple[1]))

	with os.fdopen(out_tuple[0], 'r') as handle:
		compressed = handle.read()

	os.unlink(in_tuple[1])
	os.unlink(out_tuple[1])

	return compressed


#def addHeader(text, endFilename):
#	return ("/** http://github.com/foo123/MOD3.js\n\n** port by Nikos M.\n** http://nikos-web-development-netai.net/\n**/"  + text


def makeDebug(text):
	position = 0
	while True:
		position = text.find("/* DEBUG", position)
		if position == -1:
			break
		text = text[0:position] + text[position+8:]
		position = text.find("*/", position)
		text = text[0:position] + text[position+2:]
	return text


def buildLib(files, debug, minified, filename):

	text = merge(files)

	if debug:
		text = makeDebug(text)
		filename = filename + 'Debug'

	folder=''

	filename = filename + '.js'

	print ("=" * 40)
	print ("Compiling", filename)
	print ("=" * 40)

	if minified:
		text = compress(text)

	output("/** http://github.com/foo123/MOD3\n**\n** AS3Mod port to javascript by Nikos M.\n** http://nikos-web-development-netai.net/\n**/\n"+text, folder + filename)


def buildIncludes(files, filename):

	template = '\t\t<script type="text/javascript" src="../src/%s"></script>'
	text = "\n".join(template % f for f in files)

	output(text, filename + '.js')


def parse_args():

	if ap:
		parser = argparse.ArgumentParser(description='Build and compress MOD3.js')
		parser.add_argument('--common', help='Build MOD3.js', action='store_const', const=True)
		parser.add_argument('--debug', help='Generate debug versions', action='store_const', const=True, default=False)
		parser.add_argument('--minified', help='Generate minified versions', action='store_const', const=True, default=False)
		parser.add_argument('--all', help='Build all MOD3.js', action='store_true')

		args = parser.parse_args()

	else:
		parser = optparse.OptionParser(description='Build and compress MOD3.js')
		parser.add_option('--common', dest='common', help='Build MOD3.js', action='store_const', const=True)
		parser.add_option('--debug', dest='debug', help='Generate debug versions', action='store_const', const=True, default=False)
		parser.add_option('--minified', help='Generate minified versions', action='store_const', const=True, default=False)
		parser.add_option('--all', dest='all', help='Build all MOD3.js', action='store_true')

		args, remainder = parser.parse_args()

	# If no arguments have been passed, show the help message and exit
	if len(sys.argv) == 1:
		parser.print_help()
		sys.exit(1)

	return args


def main(argv=None):

	args = parse_args()
	debug = args.debug
	minified = args.minified

	config = [
	['MOD3', 'build', COMMON_FILES, args.all],
	]

	for fname_lib, fname_inc, files, enabled in config:
		if enabled or args.all:
			buildLib(files, debug, minified, fname_lib)
			#if args.includes:
			#	buildIncludes(files, fname_inc)

if __name__ == "__main__":
	main()

