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

GraphEditor = {
	anyChangesYet : false,
	
	initialized : (function() {
		window.onload = function() {
			GraphEditor.setupDOM();
		}
		
		return true;
	})(),
	
	setupDOM : function() {
		var textarea = document.getElementsByTagName('textarea')[0];
		var canvas = document.getElementsByTagName('canvas')[0];
		var context = canvas.getContext('2d');
		var errors = document.getElementsByTagName('pre')[0];
		var body = document.getElementsByTagName('body')[0];
		var select = document.getElementsByTagName('select')[0];
		
		textarea.value = "draw = function() {\n  \n};";
		errors.firstChild.nodeValue = 'Type someting in the field above to start.';
		
		context.width = canvas.width;
		context.height = canvas.height;
		
		textarea.onkeydown = function(event) {
			checkTab(event);
			return !event.defaultPrevented;
		}
		
		textarea.onkeyup = function(event) {
			GraphEditor.anyChangesYet = true;
			
			context.save();
			
			try {
				var code = (
					'var width = canvas.width, height = canvas.height;' + 
					textarea.value
				);
				
				GraphEditor.compileFor(code, context);
				
				errors.firstChild.nodeValue = "Compilation successful.";
			} catch (e) {
				errors.firstChild.nodeValue = e.toString();
			}
			
			context.restore();
		}
		
		select.onchange = function() {
			var code = GraphEditor.samples[select.selectedIndex];
			
			if (code) {
				textarea.value = code;
				textarea.onkeyup(null);
			}
			
			select.selectedIndex = 0;
		}
		
		window.onbeforeunload = function(e) {
			if (GraphEditor.anyChangesYet)
				return e.returnValue = 'Changes are not saved in this demonstration.';
		}
	},
	
	compileFor: function(code, scope) {
		var exports = eval(
			'(function() { ' + 
			'	var draw, setup; ' +
			'	with(scope) { ' +
					code +
			'	}' +
			'	return [ draw, setup ];' +
			'})();'
		);
		
		var draw = exports[0];
		var setup = exports[1];
		
		draw();
	}
}