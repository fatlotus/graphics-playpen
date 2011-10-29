// 29 October 2011
//
// Copyright (c) 2011 Jeremy Arche
// 
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
// 
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
// CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
// SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

GraphEditor.samples = [
	null,
	"draw = function() {\n  clearRect(0, 0, width, height);\n  \n  strokeStyle = 'rgba(100, 100, 100, 0.2)';\n  \n  for (var prd = 0; prd <= 10; prd++) {\n    if (prd == 5) {\n      strokeStyle = '#c00;';\n    } else if (prd == 10) {\n      strokeStyle = '#39c';\n    } else{\n      var r = prd * 30\n      strokeStyle = 'rgba('+r+','+r+','+r+',0.2)';\n    }\n    \n    beginPath();\n    \n    for (var x = 0; x < 500; x += 2) {\n      lineTo(x, (1 + Math.sin(x / (5 + 2 * prd)) * 0.2) * height / 2);\n    }\n    \n    stroke();\n    closePath();\n  }\n};"
]