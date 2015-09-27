var Engine = {};

Engine.context = function(ctx){
	
	this.maps = {};
	this.entities = {};
	this.controllers = {};
	this.libraries = {};
	this.ctx = ctx;

	getCtx = function(){
		return this.ctx;
	}

	this.loadEntities = function(entities){
		try{
      		switch(typeof entities){
				case 'function':
					entities.prototype = new EntityHandle();
					name = Object.keys(entities)[0];
					this.entities[name] = new entities;
				break;

				case 'object':
				for(idx in entities){
					entities[idx].prototype = new EntityHandle();
					this.entities[idx] = new entitiesLoad[idx];
				}
				break;

				case 'undefined':
				for(idx in entitiesLoad){
					entitiesLoad[idx].prototype = new EntityHandle();
					this.entities[idx] = new entitiesLoad[idx];
				}
				break;

				default:
					throw "Engine.loadEntities: Type " + (typeof entities) + " is not loadable";
			}

		} catch(ex) {
	      	console.log(ex);
	    }
	};

	this.loadMaps = function(maps){
		try{
      		switch(typeof maps){
				case'function':
					maps.prototype = new MapHandle();
					name = Object.keys(maps)[0];
					this.maps[name] = new maps;
				break;

				case 'object':
				for(idx in maps){
					maps[idx].prototype = new MapHandle();
					this.maps[idx] = new maps[idx];
				}
				break;

				case 'undefined':
				for(idx in mapsLoad){
					mapsLoad[idx].prototype = new MapHandle();
					this.maps[idx] = new mapsLoad[idx];
				}
				break;
				
				default:
					throw "Engine.loadMaps: Type " + (typeof maps) + " is not loadable";
			}
		} catch(ex) {
	      	console.log(ex);
	    }
	};

	this.loadControllers = function(controllers){
		try{
      		switch(typeof controllers){
				case'function':
					controllers.prototype = new ControllerHandle();
					name = Object.keys(controllers)[0];
					this.controllers[name] = new controllers;
				break;

				case 'object':
				for(idx in controllers){
					controllers[idx].prototype = new ControllerHandle();
					this.controllers[idx] = new controllers[idx];
				}
				break;

				case 'undefined':
				for(idx in controllersLoad){
					controllersLoad[idx].prototype = new ControllerHandle();
					this.controllers[idx] = new controllersLoad[idx];
				}
				break;
				
				default:
					throw "Engine.loadControllers: Type " + (typeof controllers) + " is not loadable";
			}
		} catch(ex) {
	      	console.log(ex);
	    }
	};

	this.loadLibraries = function(libraries){
		try{
      		switch(typeof libraries){
				case'function':
					libraries.prototype = new CanvasHandle();
					name = Object.keys(libraries)[0];
					this.libraries[name] = new libraries;
				break;

				case 'object':
				for(idx in libraries){
					libraries[idx].prototype = new CanvasHandle();
					this.libraries[idx] = new libraries[idx];
				}
				break;

				case 'undefined':
				for(idx in librariesLoad){
					librariesLoad[idx].prototype = new CanvasHandle();
					this.libraries[idx] = new librariesLoad[idx];
				}
				break;
				
				default:
					throw "Engine.loadLibraries: Type " + (typeof libraries) + " is not loadable";
			}
		} catch(ex) {
	      	console.log(ex);
	    }
	};


	this.start = function(){
		try{
			name = Object.keys(mainController)[0];
			this.controllers[name].engine = this;
			this.controllers[name].main();
		} catch(ex) {
			console.log(ex);
		}
	};

}