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
'util/XMath.js',
'util/Range.js',
'util/Phase.js',
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
'modifiers/Bloat.js',
'modifiers/Twist.js',
'modifiers/Skew.js',
'modifiers/Taper.js',
'modifiers/Wheel.js',
'modifiers/Break.js',
'modifiers/Noise.js',
'plugins/Three/LibraryThree.js',
'plugins/Three/VertexThree.js',
'plugins/Three/MeshThree.js',
'plugins/Pre3D/LibraryPre3D.js',
'plugins/Pre3D/VertexPre3D.js',
'plugins/Pre3D/MeshPre3D.js',
'plugins/J3D/LibraryJ3D.js',
'plugins/J3D/VertexJ3D.js',
'plugins/J3D/MeshJ3D.js',
]

def merge(files,enc):

	buffer = []

	for filename in files:
		if enc:
			with open(os.path.join('..', 'src', filename), 'r',encoding=enc) as f:
				buffer.append(f.read())
		else:
			with open(os.path.join('..', 'src', filename), 'r') as f:
				buffer.append(f.read())

	return "".join(buffer)


def output(text, filename, enc):

	if enc:
		with open(os.path.join('..', 'build', filename), 'w',encoding=enc) as f:
			f.write(text)
	else:
		with open(os.path.join('..', 'build', filename), 'w') as f:
			f.write(text)


def compress(text,enc):

	in_tuple = tempfile.mkstemp()
	if enc:
		with os.fdopen(in_tuple[0], 'w',encoding=enc) as handle:
			handle.write(text)
	else:
		with os.fdopen(in_tuple[0], 'w') as handle:
			handle.write(text)
	
	out_tuple = tempfile.mkstemp()

	os.system("java -jar compiler/compiler.jar --language_in=ECMASCRIPT5_STRICT --js %s --js_output_file %s" % (in_tuple[1], out_tuple[1]))

	if enc:
		with os.fdopen(out_tuple[0], 'r',encoding=enc) as handle:
			compressed = handle.read()
	else:
		with os.fdopen(out_tuple[0], 'r') as handle:
			compressed = handle.read()

	os.unlink(in_tuple[1])
	os.unlink(out_tuple[1])

	return compressed


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


def buildLib(files, minified, enc, filename):

	text = merge(files,enc)

	folder=''

	filename = filename + '.js'

	print ("=" * 40)
	print ("Compiling", filename)
	print ("=" * 40)

	if minified:
		text = compress(text,enc)

	output("/** http://github.com/foo123/MOD3\n**\n** AS3Mod port to javascript by Nikos M.\n** http://nikos-web-development-netai.net/\n**/\n"+text, folder + filename,enc)


def parse_args():

	if ap:
		parser = argparse.ArgumentParser(description='Build and compress MOD3.js')
		parser.add_argument('--minified', help='Generate minified versions', action='store_const', const=True, default=False)
		parser.add_argument('--all', help='Build all MOD3.js', action='store_true')
		parser.add_argument('-enc', help='set encoding', default=False)

		args = parser.parse_args()

	else:
		parser = optparse.OptionParser(description='Build and compress MOD3.js')
		parser.add_option('--minified', help='Generate minified versions', action='store_const', const=True, default=False)
		parser.add_option('--all', dest='all', help='Build all MOD3.js', action='store_true')
		parser.add_option('--enc', dest='enc', help='set encoding', default=False)

		args, remainder = parser.parse_args()

	# If no arguments have been passed, show the help message and exit
	if len(sys.argv) == 1:
		parser.print_help()
		sys.exit(1)

	return args


def main(argv=None):

	args = parse_args()
	minified = args.minified
	enc = args.enc

	config = [
	['MOD3', 'all', COMMON_FILES, args.all],
	]

	for fname_lib, fname_inc, files, enabled in config:
		if enabled or args.all:
			buildLib(files, minified, enc, fname_lib)

if __name__ == "__main__":
	main()

