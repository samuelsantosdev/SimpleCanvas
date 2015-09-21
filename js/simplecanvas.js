/*
 * @Copyright (c) 2015 Samuel Santos (samuelsantosdev@gmail.com)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/*
 * @Version: 0.1
 * @Release: 2015-09-21
 */
HTMLElement.prototype.SimpleCanvas = function(config){

	this.elementCanvas 	= this;
	this.pathJs 		= config.pathJs;

	this.initalize = function(){
		try{
			if(this.getElementCanvas().nodeName.toLowerCase() != 'canvas')
				throw "This element is not a canvas";

			var ctx = this.getElementCanvas().getContext("2d");
			var metaObjects = [
				this.pathJs + "library/canvasHandle.js",
				this.pathJs + "library/entityHandle.js",
				this.pathJs + "library/mapHandle.js",
				this.pathJs + "library/controllerHandle.js",

				this.pathJs + "entity/entities.js",

				this.pathJs + "map/blue.js",
				this.pathJs + "map/dark.js",
				this.pathJs + "map/white.js",

				this.pathJs + "controller/game.js",

				this.pathJs + "config/autoload.js",
				this.pathJs + "engine.js",
			];

			console.log("Importing js");
			n = 0;
			total = metaObjects.length;
			this.importJs(metaObjects, function(imp){
				n++;
				if(n == total){
					console.log("Loading engine");
					var eng = new Engine();
					console.log("Engine load entities");
					eng.loadEntities();
					console.log("Engine load maps");
					eng.loadMaps();
					console.log("Engine load controllers");
					eng.loadControllers();
					console.log("Engine loaded");
				}
					
			});
			console.log("Imported");

		}
		catch(ex)
		{
			console.log(ex);
		}
	}

	this.getElementCanvas = function(){
		return this.elementCanvas;
	}

	this.importJs = function(path, callback){
    	try{
      		switch(typeof path){
        		case "string":
	          		imported = document.createElement('script');
	          		imported.src = path;
	          		imported.type = 'text/javascript';

	          		imported.onreadystatechange = callback;
	    			imported.onload = callback;

	          		document.head.appendChild(imported);
        		break;

		        case "object":
		          	for(var i = 0; i < path.length; ++i){
			            imported = document.createElement('script');
			            imported.src = path[i];
			            imported.type = 'text/javascript';

			            imported.onreadystatechange = callback;
	    				imported.onload = callback;

			            document.head.appendChild(imported);
		          	}
		        break;
		        default:
					throw "SimplesCanvas.importJs: Type " + (typeof path) + " is not importable";
		      }
	    } catch(ex) {
	      console.log(String(ex));
	    }

  	};

}