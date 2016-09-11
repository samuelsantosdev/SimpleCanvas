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
HTMLElement.prototype.SimpleCanvas = function(config, callback){

	this.elementCanvas 	= this;

	this.config = {
		pathJs : window.location.href + '/js/'
	}
	
	this.extends = function (configDefault, configCustom){
	    var config = {};
	    for (var attrname in configDefault) { config[attrname] = configDefault[attrname]; }
	    for (var attrname in configCustom) { config[attrname] = configCustom[attrname]; }
	    return config;
	}

	this.initalize = function(callback){
		try{
			this.config = this.extends(this.config, config);

			if(this.getElementCanvas().nodeName.toLowerCase() != 'canvas')
				throw "This element is not a canvas";
			this.getElementCanvas().style.cursor = "pointer";
			this.getElementCanvas().style.cursor = "hand";
			var ctx = this.getElementCanvas().getContext("2d");
			var metaObjects = [
				this.config.pathJs + "library/canvasHandle.js",
				this.config.pathJs + "library/entityHandle.js",
				this.config.pathJs + "library/mapHandle.js",
				this.config.pathJs + "library/controllerHandle.js",
				this.config.pathJs + "library/elementHandle.js",
				this.config.pathJs + "library/eventElementHandle.js",

				this.config.pathJs + "entity/entities.js",

				this.config.pathJs + "map/blue.js",
				this.config.pathJs + "map/dark.js",
				this.config.pathJs + "map/white.js",

				this.config.pathJs + "controller/game.js",

				this.config.pathJs + "config/autoload.js",
				this.config.pathJs + "engine.js",
			];

			console.log("Importing js");
			var n = 0, total = metaObjects.length;
			this.importJs(metaObjects, function(imp){
				n++;
				if(n == total){

					console.log("Loading engine");
					var eng = new Engine.context(ctx);
					
					console.log("Engine load entities");
					eng.loadEntities();
					
					console.log("Engine load maps");
					eng.loadMaps();
					
					console.log("Engine load controllers");
					eng.loadControllers();
					
					console.log("Engine load loadLibraries");
					eng.loadLibraries();
					
					console.log("Engine loaded");
					eng.start();
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