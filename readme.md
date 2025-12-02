# MOD3

**3D Modifier Library for JavaScript**

This is a port of the [AS3dMod Modifier Library for ActionScript 3](http://code.google.com/p/as3dmod/) to JavaScript.

**version: 1.0.0**

**supports: Three.js, CubicVR.js, OSG.js, J3D, Copperlicht, Pre3d**

[![MOD3.js](/flipbook2.png)](https://foo123.github.io/examples/flipbook3/)

It is an almost complete port. All Modifiers found in AS3DMod are scheduled to be ported.
Also the API architecture is setup for more modifiers to be added (even custom ones).


### Contents

* [Live Examples](#live-examples)
* [3D Engines Support](#support-for-3d-javascript-engines)
* [3D Modifiers Support](#modifiers-supported-up-to-present)
* [Source Code License](#source-code-license)
* [API Reference](/api-reference.md)
* [Todo](#todo)
* [How to debug](#how-to-debug)
* [ChangeLog](#changelog)


### Source Code License

[MIT Open Source License](http://opensource.org/licenses/mit-license.php) like the original [AS3dMod Modifier Library for ActionScript 3](http://code.google.com/p/as3dmod/).

### Live Examples

* [3D flipbook](https://foo123.github.io/examples/flipbook3/) (Three.js, MOD3.js and Tween.js)
* [Dancing Box](https://foo123.github.io/examples/dancing-box/)  (a simple blend of 3D manipulation and sound visualization)


### Support for 3D JavaScript engines

* [Three.js](https://github.com/mrdoob/three.js/) with examples (r78)
* [OSG.js](https://github.com/cedricpinson/osgjs) with examples (0.2.5)
* [CubicVR](https://github.com/cjcliffe/CubicVR.js/) with examples
* [J3D](https://github.com/drojdjou/J3D) with examples (Build 51)
* [Copperlicht](https://github.com/Sebmaster/copperlicht) with examples
* [Pre3d](https://github.com/deanm/pre3d) with examples (pre3d examples are a little blurry but you'll get the picture)



### Modifiers supported (up to present)
* Pivot (note: Pivot does not work with Pre3d)
* Bend
* Twist
* Taper
* Skew
* Noise
* Wheel
* Bloat
* Break
* Perlin
* DisplaceMap


### TODO
* possible generic way to use (at least some) 3D modifiers directly in GLSL for all supported engines (??)
* add custom modifiers except the defaults found in AS3dMod library
* optimize (math ops, caching, modifier chain calls etc..) [DONE partially]
* port the modifiers that use Perlin Noise (using instead the simpler and faster Simplex Noise routine for JavaScript, [noisejs](https://github.com/josephg/noisejs) , or [simplex-noise.js](https://github.com/jwagner/simplex-noise.js)) [DONE partially]
* keep up with JavaScript 3D Engines updates (will try)


### How to debug
1. If the problem is in one 3D engine, while the other engines work correctly for this example/modifier, then the problem is probably with that engine's proxy classes (plugins/3DENGINENAME/3DENGINENAME.js)
2. If the specific example/modifier does not work in any 3D engine, but other modifiers/examples do work, then the problem is probably with that modifier's code (modifiers/MODIFIERNAME.js)
3. If no example works for any engine, then the problem is probably in the core classes, or some class throws a js error which stops the whole execution


### Changelog
* 1.0.0 refactor, simplify and minify code, remove classy dependency
* 0.6.0  3d engine plugins have been removed from the final build to make packaged code lighter, include the appropriate 3D plugin **manualy in your application** after the main **mod3** script (see examples), modifiers are independent of the underlying modifiable mesh (it is a parameter), and this enables them to be shared (if the exact same modifier is needed) across multiple different modifierStacks for different underlying meshes, support for OSG.js, further refactoring and optimisations, some method changes
* 0.5.0  parallel processing through workers is dropped, add support for OSG.js (in progress), update support for Three.js r78, some refactoring and optimisations
* 0.4  support parallel modifiers with web workers transparently, code refactor, optimizations, examples updates
* 0.3.5  DisplaceMap modifier added, edits / optimizations
* 0.3.4  update classy.js, code refactor / optimizations, Perlin modifier added
* 0.3.2-0.3.3  update buildtools, api-reference, classy.js, Three.js revision (r66)
* 0.3.1  update buildtools, api-reference, use classy.js for OOP
* 0.3  code refactoring, extension framework, various optimizations, tidy up repo, new build scripts, project stopped
* added support for CubicVR.js 3D Engine, minor optimizations for all engines
* added support for Three.js revision (r58)
* added support for Three.js revision (r53)


**see also:**

* [Abacus](https://github.com/foo123/Abacus) Computer Algebra and Symbolic Computation System for Combinatorics and Algebraic Number Theory for JavaScript and Python
* [SciLite](https://github.com/foo123/SciLite) Scientific Computing Environment similar to Octave/Matlab in pure JavaScript
* [TensorView](https://github.com/foo123/TensorView) view array data as multidimensional tensors of various shapes efficiently
* [FILTER.js](https://github.com/foo123/FILTER.js) video and image processing and computer vision Library in pure JavaScript (browser and nodejs)
* [HAAR.js](https://github.com/foo123/HAAR.js) image feature detection based on Haar Cascades in JavaScript (Viola-Jones-Lienhart et al Algorithm)
* [HAARPHP](https://github.com/foo123/HAARPHP) image feature detection based on Haar Cascades in PHP (Viola-Jones-Lienhart et al Algorithm)
* [Fuzzion](https://github.com/foo123/Fuzzion) a library of fuzzy / approximate string metrics for PHP, JavaScript, Python
* [Matchy](https://github.com/foo123/Matchy) a library of string matching algorithms for PHP, JavaScript, Python
* [Regex Analyzer/Composer](https://github.com/foo123/RegexAnalyzer) Regular Expression Analyzer and Composer for PHP, JavaScript, Python
* [Xpresion](https://github.com/foo123/Xpresion) a simple and flexible eXpression parser engine (with custom functions and variables support), based on [GrammarTemplate](https://github.com/foo123/GrammarTemplate), for PHP, JavaScript, Python
* [GrammarTemplate](https://github.com/foo123/GrammarTemplate) grammar-based templating for PHP, JavaScript, Python
* [codemirror-grammar](https://github.com/foo123/codemirror-grammar) transform a formal grammar in JSON format into a syntax-highlight parser for CodeMirror editor
* [ace-grammar](https://github.com/foo123/ace-grammar) transform a formal grammar in JSON format into a syntax-highlight parser for ACE editor
* [prism-grammar](https://github.com/foo123/prism-grammar) transform a formal grammar in JSON format into a syntax-highlighter for Prism code highlighter
* [highlightjs-grammar](https://github.com/foo123/highlightjs-grammar) transform a formal grammar in JSON format into a syntax-highlight mode for Highlight.js code highlighter
* [syntaxhighlighter-grammar](https://github.com/foo123/syntaxhighlighter-grammar) transform a formal grammar in JSON format to a highlight brush for SyntaxHighlighter code highlighter
* [MOD3](https://github.com/foo123/MOD3) 3D Modifier Library in JavaScript
* [Geometrize](https://github.com/foo123/Geometrize) Computational Geometry and Rendering Library for JavaScript
* [Plot.js](https://github.com/foo123/Plot.js) simple and small library which can plot graphs of functions and various simple charts and can render to Canvas, SVG and plain HTML
* [CanvasLite](https://github.com/foo123/CanvasLite) an html canvas implementation in pure JavaScript
* [Rasterizer](https://github.com/foo123/Rasterizer) stroke and fill lines, rectangles, curves and paths, without canvas
* [Gradient](https://github.com/foo123/Gradient) create linear, radial, conic and elliptic gradients and image patterns without canvas
* [css-color](https://github.com/foo123/css-color) simple class to parse and manipulate colors in various formats
* [PatternMatchingAlgorithms](https://github.com/foo123/PatternMatchingAlgorithms) library of Pattern Matching Algorithms in JavaScript using [Matchy](https://github.com/foo123/Matchy)
* [SortingAlgorithms](https://github.com/foo123/SortingAlgorithms) library of Sorting Algorithms in JavaScript
