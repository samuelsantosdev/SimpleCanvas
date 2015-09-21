var Engine = function(){
	
	this.loadEntities = function(entities){
		try{
      		switch(typeof entities){
				case 'function':
				entities.prototype = new EntityHandle();
				break;

				case 'object':
				for(idx in entities)
					entities[idx].prototype = new EntityHandle();
				break;

				case 'undefined':
				for(idx in entitiesLoad)
					entitiesLoad[idx].prototype = new EntityHandle();
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
				break;

				case 'object':
				for(idx in maps)
					maps[idx].prototype = new MapHandle();
				break;

				case 'undefined':
				for(idx in mapsLoad)
					mapsLoad[idx].prototype = new MapHandle();
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
				break;

				case 'object':
				for(idx in controllers)
					controllers[idx].prototype = new ControllerHandle();
				break;

				case 'undefined':
				for(idx in controllersLoad)
					controllersLoad[idx].prototype = new ControllerHandle();
				break;
				
				default:
					throw "Engine.loadControllers: Type " + (typeof controllers) + " is not loadable";
			}
		} catch(ex) {
	      	console.log(ex);
	    }
	};

}