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
 * @Version: 1.0
 * @Release: 2016-09-22
 */
HTMLElement.prototype.SimpleCanvas = function () {
    return SimpleCanvas = {
    	
    	Canvas : this,
    	Engine : {},
    	AutoLoad : {},
    	ElementScript : {},

    	//Configs default
		Config : {
			PathJs : window.location.href + 'js/'
		},

		//Start import Js files and Controller main
		Initialize : function(ConfigCustom, CallbackFunction){

			try{

				//Verify if this element Html is a canvas
				if(this.Canvas.nodeName.toLowerCase() != 'canvas')
					throw "This element is not a canvas";

				//Merge of default configurations and custom configuration
				this.Config 	= this.Extends(this.Config, ConfigCustom);
				//All methos to this variable
				var context 	= this;

				console.log("Importing js");

				//Load params in content of json, autoload.json and system.json
				this.LoadFiles(function(filesLoad){

					if(filesLoad == false)
						return;

					//load by http protocol, autoload files and system files
					context.ImportJs(filesLoad, function(js){

						//insert on tag head the JS loaded
						context.ApplyJs(js, "SimpleCanvasJS");

						//Load Engine of framework
						console.log("Loading engine");
						context.Engine = Engine;
						context.Engine.init(context);
						
						//Start controller main [first controller in key "Controller" on autoload.json]
						console.log("Engine loaded");
						context.Engine.Start();
							
					});
				}, this);
				console.log("Imported");
			}
			catch(ex)
			{
				console.log(ex);
			}
		},


		//Request files by protocol http
		LoadFile : function(FilesArray, Callback, context){

			var ObjLoads = {};
			var nMaxFiles = FilesArray.length - 1;
			var currentIdx = 0;
			var filesLoad = [];
			var path = context.Config['PathJs'];

			var httpRequest = function (url){
				currentIdx++;
				var xobj = new XMLHttpRequest();
			    
				xobj.open('GET', url, true); 
				xobj.onreadystatechange = function () {
				    if (xobj.readyState == 4 && xobj.status == "200"){
				    	
				    	ObjLoads = JSON.parse(xobj.responseText);
				    	for(var loads in ObjLoads){

							if(typeof context.AutoLoad[loads] == 'undefined')
								context.AutoLoad[loads] = ObjLoads[loads];
							else
								context.AutoLoad[loads] = context.AutoLoad[loads].concat(ObjLoads[loads]);
							
							for(var files in ObjLoads[loads]){
								filesLoad.push( path + loads.toLowerCase() + '/' + ObjLoads[loads][files] + '.js');
							}
						}
						if(currentIdx <= nMaxFiles)
							httpRequest(FilesArray[currentIdx]);
						else
							Callback(filesLoad) ;

				    }else{
				      	Callback(false);
				    }
				}
				xobj.send(null);
				
			}
			httpRequest(FilesArray[currentIdx]);
		},


		//Merge of configurations
		Extends : function (ConfigDefault, ConfigCustom){
		    var config = {};
		    for (var attrname in ConfigDefault) { config[attrname] = ConfigDefault[attrname]; }
		    for (var attrname in ConfigCustom) { config[attrname] = ConfigCustom[attrname]; }
		    return config;
		},

		//Request files of autoload and system
		LoadFiles : function(callback, context){
			var path = context.Config.PathJs;
			var loadFile = context.LoadFile;
			var filesLoad = [];
			loadFile([path + 'core/system.json', path + 'config/autoload.json'], function(arrayFiles){
				callback(arrayFiles);
			}, context);

		},

		//Minify javascript code
		JsMinify : function(js){
		    	lines = js.replace(/(\/\/+.+)/g, '').replace(/[\t]/g, '');
		    	lines = lines.split("\n");
		    	txt = ";";
		    	for(k = 0; k < lines.length; k++){
		    		if(lines[k].trim() != "")
		    		txt += lines[k].trim().replace(/[\t]/g, " ") +"\n";
		    	}
		    	return txt + ";";
		},


		//Insert Js to a tag script, with a specific id
		ApplyJs : function(js, name, callback){
			this.ElementScript[name] 		= document.createElement('script');
	  		this.ElementScript[name].type 	= 'text/javascript';
	  		this.ElementScript[name].id 	= name;
			this.ElementScript[name].innerHTML += js;
	  		document.head.appendChild(this.ElementScript[name]);
	  		if(callback != undefined)
	  			callback();
			
		},


		//Request Js files on protocol Http
		ImportJs : function(path, callback){
			try{
				var self = this;
	      		switch(typeof path){
	        		case "string":

	        			var xobj = new XMLHttpRequest();
						xobj.open('GET', path, true);
						xobj.onreadystatechange = function () {
						    if (xobj.readyState == 4 && xobj.status == "200"){
						    	Js = self.JsMinify(xobj.responseText);
						    	callback(Js) ;
						    }
						}
						xobj.send(null);

	        		break;

			        case "object":
			        case "array":
			        	var Js = "";
			        	getHttp = function (url){
			        		var xobj = new XMLHttpRequest();
					    	xobj.open('GET', url, true);
							xobj.onreadystatechange = function () {
							    if (xobj.readyState == 4 && xobj.status == "200"){
							    	Js += self.JsMinify(xobj.responseText);
							    	init++;
							    	if(init <= max)
							    		getHttp(path[init]);
							    	else
							    		callback(Js);
							    }
							    
							}
							xobj.send(null);
			        	}
			        	var init = 0, max = path.length - 1;
			        	getHttp(path[init]);

			        break;
			        default:
						throw "SimplesCanvas.importJs: Type " + (typeof path) + " is not importable";
			      }
		    } catch(ex) {
		      console.log(String(ex));
		    }
	  	}
  	}
}