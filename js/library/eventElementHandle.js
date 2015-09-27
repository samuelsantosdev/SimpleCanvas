var eventElement = function(){

	this.addEvent = function(element, event, stageCanvas, callback){
        switch(event){
        	case 'mouseover':
	    	case 'mouseout':
	    	case 'mousedown':
	    	case 'mouseup':
	    		this.eventMouse(element, event, stageCanvas, callback);
        	break;
        	
	    	case 'keydown':
	    	case 'keyup':
	    		this.eventKey(element, event, stageCanvas, callback);
        	break;
        }
    };
	
    this.eventKey = function(element, event, stageCanvas, callback){
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
    }
    
    this.eventMouse = function(element, event, stageCanvas, callback){
    	 switch(event){
		    case 'mouseover':
		    case 'mouseout':
		    	var event = this;
		        stageCanvas.addEventListener('mousemove', function(e){
		        	lastTarget = e.target;
		        	if(event.inElement(stageCanvas, element, e)){
		        		callback({mouseover:e});
		            }else
		            {
		            	callback({mouseout:e});
		            }
		        });
		    break;
		    
		    case 'mousedown':
		    	var event = this;
		    	stageCanvas.addEventListener('mousedown', function(e){
		    		lastTarget = e.target;
		        	if(event.inElement(stageCanvas, element, e)){
		            	callback({mousedown:e});
		            }
		        });  
		    break;
		
		    case 'mouseup':
		    	var event = this;
		    	stageCanvas.addEventListener('mouseup', function(e){
		    		lastTarget = e.target;
		    		if(event.inElement(stageCanvas, element, e)){
		    			callback({mouseup:e});
		    		}
		    	});  
			break;
    	 }
    }
    
    this.coordinatesMouse = function(stageCanvas, e){
        var position = stageCanvas.getBoundingClientRect();
        return {
            x : e.clientX - position.left,
            y : e.clientY - position.top
        };
    };

    this.inElement = function(stageCanvas, element, e){
    	console.log(element);
        var coordinates = this.coordinatesMouse(stageCanvas, e);
                    
        var xIn = coordinates.x < (element.x + element.width) && coordinates.x > element.x;
        var yIn = coordinates.y > element.y && coordinates.y < (element.y + element.height);
        return (xIn && yIn);
    }
    


}