/*
	This file contains all properties 
	with main resources to manipulate 
	shapes and events in a element canvas
*/

Engine = {
		
		//All Maos loaded
		Maps : {},

		//All entitites loaded
		Entities : {},

		//All controllers loaded
		Controllers : {},

		//All libraries loaded
		Libraries : {},
		
		//Main content of file simplecanvas.js, variable and methods
		Context : {},
		
		//Library to manipulate shapes
		Canvas : {},
		
		//Library with shapes default
		Shapes : {},

		//Library to Events input and output
		Events : {},

		//Array of objects to render
		ObjectsRender : {},

		//default FPS
		FPS : 60,

		//Initialize main content
		init : function(context){

			this.Context = context;
			this.Canvas = new Engine.Libraries['CanvasHandle']();
			this.Events = new Engine.Libraries['EventElementHandle']();

			this.Canvas.init(this.Context.Canvas.getContext("2d"));
			this.Shapes = this.Canvas.Shapes;			

		},

		//Render all shapes in correct sequence
		Render : function(){

			for(shape in this.ObjectsRender){
				if(Engine.ObjectsRender[shape].Display){
					Engine.ObjectsRender[shape].bgColor = Engine.Helper.ToRgba(Engine.ObjectsRender[shape].bgColor);
					Engine.Shapes.Render(Engine.ObjectsRender[shape]);
				}
			}
		},

		//Add shape to end of array, all elements renderized are here
		AddObjectRender : function(id, shape){
			if(shape.Order == 0){
				Engine.ObjectsRender[id] = shape;
				Engine.ObjectsRender[id].Order = Object.keys(Engine.ObjectsRender).length + 1;
				Engine.ObjectsRender[id].Id = id;
			}
		},

		RemoveObjectRender : function(id){
			delete Engine.ObjectsRender[id];
		},

		HideObjectRender : function(id){
			Engine.ObjectsRender[id].Display = false;
			Engine.Render();
		},

		ShowObjectRender : function(id){
			Engine.ObjectsRender[id].Display = true;
			Engine.Render();
		},

		//Load entity in runtime
		LoadEntities : function(entity, callback){
			try{
				switch(typeof entity){
					
					case 'string' :
						
						Engine.Context.ImportJs(Engine.Context.Config.PathJs + "entity/" + entity + ".js", function(Js){
							Engine.Context.ApplyJs(Js, entity, function(){
								Engine.Entities[entity] = new Engine.Entities[entity]();								
								if(callback != undefined)
									callback(Engine.Entities[entity]);
							});
						});
						
					break;

					default:
						throw "Engine.loadEntities: Type " + (typeof entities) + " is not loadable";
				} 

			} catch(ex) {
		      	console.log(ex);
		    }
		},


		//Load map in runtime
		LoadMaps : function(map){
			try{
	      		switch(typeof map){
					
					case 'string' :
						
						Engine.Context.ImportJs(Engine.Context.Config.PathJs + "map/" + map + ".js", function(Js){
							Engine.Context.ApplyJs(Js, map, function(){
								Engine.Maps[map] = new Engine.Maps[map]();
							});
						});
						
					break;
					
					default:
						throw "Engine.loadMaps: Type " + (typeof maps) + " is not loadable";
				}
			} catch(ex) {
		      	console.log(ex);
		    }
		},


		//Load controller in runtime
		LoadControllers : function(controller){
			try{
	      		switch(typeof controller){
					
					case 'string' :
						
						Engine.Context.ImportJs(Engine.Context.Config.PathJs + "controller/" + controller + ".js", function(Js){
							Engine.Context.ApplyJs(Js, controller, function(){
								Engine.Controllers[controller] = new Engine.Controllers[controller]();
							});
						});
						
					break;
					
					default:
						throw "Engine.loadControllers: Type " + (typeof controllers) + " is not loadable";
				}
			} catch(ex) {
		      	console.log(ex);
		    }
		}, 

		//Load library in runtime
		LoadLibraries : function(library){
			try{
	      		switch(typeof library){
					
					case 'string' :
						
						Engine.Context.ImportJs(Engine.Context.Config.PathJs + "library/" + library + ".js", function(Js){
							Engine.Context.ApplyJs(Js, library, function(){
								Engine.Libraries[library] = new Engine.Libraries[library]();
							});
						});
						
					break;
					
					default:
						throw "Engine.loadLibraries: Type " + (typeof libraries) + " is not loadable";
				}
			} catch(ex) {
		      	console.log(ex);
		    }
		},


		//Object helper default, this methods are essentials to animations work correctly
		Helper : {

			//Remove all decimal numbers and over values in channels of RGBA
			CorrectRGB(colorRGB){
				colorArray = String(colorRGB).replace(/[^0-9,.]/g, '').split(',');
				R = colorArray[0] > 255 ? 255 : colorArray[0];
				G = colorArray[1] > 255 ? 255 : colorArray[1];
				B = colorArray[2] > 255 ? 255 : colorArray[2];
				A = colorArray[3] > 255 ? 255 : colorArray[3];
				return "rgba("+Math.ceil(R)+", "+Math.ceil(G)+", "+Math.ceil(B)+","+A+")";
			},

			//Merge on two objects
			Extends : function (){
				this.Merge = function(ConfigDefault, ConfigCustom){
				    var config = {};
				    for (var attrname in ConfigDefault) { config[attrname] = ConfigDefault[attrname]; }
				    for (var attrname in ConfigCustom) { config[attrname] = ConfigCustom[attrname]; }
				    return config;
				}
			},

			//Return the next color of pallet, of a animation with color change
			MoveColor : function(variationR, variationG, variationB, variationA){				
				
				this.NewColor = function(color){
					color = Engine.Helper.ToRgba(color);
					colorArray = String(color).replace(/[^0-9,.]/g, '').split(',');
					R = colorArray[0] - variationR;
					G = colorArray[1] - variationG;
					B = colorArray[2] - variationB;
					A = colorArray[3] - variationA;

					return "rgba("+R+", "+G+", "+B+","+A+")";
				}
			},

			//Convert codes hexa and rgb to RGBA
			ToRgba : function(color){
				if(color == undefined)
					return color;
				
				if(color.search("rgba") != -1)
					return color;

				function hexToA(h) {
					channelA = parseInt((cutHex(h)).substring(0,2),16);	
					alphaInt = (channelA / 255);
					console.log(alphaInt);
					return alphaInt;
				}
	            function hexToR(h) {return parseInt((cutHex(h)).substring(2,4),16)}
	            function hexToG(h) {return parseInt((cutHex(h)).substring(4,6),16)}
	            function hexToB(h) {return parseInt((cutHex(h)).substring(6,8),16)}
	            function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,9):h}

				if(color.search("rgb") == -1){
					color = String(color).replace(/[^0-9a-f]/gi, '');
					if (color.length < 6) {
						color = "FF"+color[0]+color[0]+color[1]+color[1]+color[2]+color[2];
					}
					else if( color.length == 6 ){
						color = "FF"+color;
					}
		            return "rgba("+hexToR(color)+","+hexToG(color)+","+hexToB(color)+","+hexToA(color)+")";
            	}
            	else
            	{
            		color = String(color).replace(/([0-9])\w+/gi, '');
            		return "rgba("+color[0]+","+color[1]+","+color[2]+", 1)";
            	}
          }
		},

		//Start method 'Main' of main controller
		Start : function(){
			try{
				name = this.Context.AutoLoad["Controller"][0];
				Engine.Controllers[name] = new Engine.Controllers[name]();
				Engine.Controllers[name].Main();
			} catch(ex) {
				console.log(ex);
			}
		}
	
}