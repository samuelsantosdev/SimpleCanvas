//library to element handle
Engine.Libraries['EventElementHandle'] = function(){
	
	return EventElementHandle = {

		//context canvas
		Context : {},

		//initialize context canvas
		init : function(ctx){
			this.Context = ctx;
		},

		//add anyone event, by this method
		AddEvent : function(element, event, stageCanvas, callback){
	        switch(event){
	        	//if mouse event 
	        	case 'mouseover':
		    	case 'mouseout':
		    	case 'mousedown':
		    	case 'mouseup':
		    		EventElementHandle.EventMouse(element, event, stageCanvas, callback);
	        	break;
	        	//if keyborad event 
		    	case 'keydown':
		    	case 'keyup':
		    		EventElementHandle.EventKey(element, event, stageCanvas, callback);
	        	break;
	        }
	    },

	    //event keyboard
	    EventKey : function(element, event, stageCanvas, callback){
	    	//set a addEventListener
	    	switch(event){
		    	case 'keydown':
		    		document.addEventListener('keydown', function(e){
		    			callback(e);
			        });
		        break;
		        case 'keyup':
		        	document.addEventListener('keyup', function(e){
		    			callback(e);
			        });
		        break;
	    	}
	    },

	    //event mouse
	    EventMouse : function(element, event, stageCanvas, callback){
	    	//set a addEventListener to mouse
	    	switch(event){
			    case 'mouseover':
			    case 'mouseout':
			    	var event = EventElementHandle;
			        stageCanvas.addEventListener('mousemove', function(e){
			        	lastTarget = e.target;
			        	if(event.InElement(stageCanvas, element, e)){
			        		callback({mouseover:e});
			            }else
			            {
			            	callback({mouseout:e});
			            }
			        });
			    break;
			    
			    case 'mousedown':
			    	var event = EventElementHandle;
			    	stageCanvas.addEventListener('mousedown', function(e){
			    		lastTarget = e.target;
			        	if(event.InElement(stageCanvas, element, e)){
			            	callback({mousedown:e});
			            }
			        });  
			    break;
			
			    case 'mouseup':
			    	var event = EventElementHandle;
			    	stageCanvas.addEventListener('mouseup', function(e){
			    		lastTarget = e.target;
			    		if(event.InElement(stageCanvas, element, e)){
			    			callback({mouseup:e});
			    		}
			    	});  
				break;
	    	 }
	    },

	    //get a coordinates of mouse in canvas element
	    CoordinatesMouse : function(stageCanvas, e){
	        var position = stageCanvas.getBoundingClientRect();
	        return {
	            x : e.clientX - position.left,
	            y : e.clientY - position.top
	        };
	    },

	    // return true if mouse is inside canvas or false if outside canvas, 
	    InElement : function(stageCanvas, element, e){
	    	var coordinates = EventElementHandle.CoordinatesMouse(stageCanvas, e);                    
	        var xIn = coordinates.x < (element.x + element.width) && coordinates.x > element.x;
	        var yIn = coordinates.y > element.y && coordinates.y < (element.y + element.height);
	        return (xIn && yIn);
	    }
	}
}
