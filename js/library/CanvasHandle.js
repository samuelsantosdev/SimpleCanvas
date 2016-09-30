/*
  Library with resources to shapes and animations
*/
Engine.Libraries['CanvasHandle'] = function(){
  return CanvasHandle = {

    //Context canvas element, getContext('2d')
    Context : {},

    //Initilize the library
    init : function(ctx){
      this.Context = ctx;
    },

    //Object with shapes and resources to shape
    Shapes : {
      
      PositionAbsolute : {
        top        :undefined,
        bottom     :undefined, 
        left       :undefined, 
        right      :undefined 
      },

      //Shape square
      Square : function(shapeCfg){
        this.name       = "Square";
        this.x          = shapeCfg.x;
        this.y          = shapeCfg.y;
        this.width      = shapeCfg.width;
        this.height     = shapeCfg.height;
        this.bgColor    = shapeCfg.bgColor;
        this.lnColor    = shapeCfg.lnColor;
        this.lnWidth    = shapeCfg.lnWidth;
        this.position   = shapeCfg.position;
        
        //Insert deafult properties in object
        context = new CanvasHandle.Shapes.ContextShape();
        context = Object.assign(this, context);
        
      },

      //Shape circle
      Circle : function(shapeCfg){
        
        this.name       = "Circle";
        this.x          = shapeCfg.x;
        this.y          = shapeCfg.y;
        this.radial     = shapeCfg.radial;
        this.beginAngle = shapeCfg.beginAngle;
        this.endAngle   = shapeCfg.endAngle;
        this.bgColor    = Engine.Helper.ToRgba(shapeCfg.bgColor);
        this.lnColor    = shapeCfg.lnColor;
        this.lnWidth    = shapeCfg.lnWidth;
        this.position   = {};
        this.width      = function(){return radial * 2};
        this.height     = function(){return radial * 2};

        //Insert deafult properties in object
        context = new CanvasHandle.Shapes.ContextShape();
        context = Object.assign(this, context);
        //Add this object to array of object to render
        
      },

      
      Text : function(shapeCfg){
        
        this.name       = "Text";
        this.x          = shapeCfg.x;
        this.y          = shapeCfg.y;
        this.bgColor    = Engine.Helper.ToRgba(shapeCfg.bgColor);
        this.font       = shapeCfg.font;
        this.text       = shapeCfg.text;
        this.position   = {};
        
        //Insert deafult properties in object
        context = new CanvasHandle.Shapes.ContextShape();
        context = Object.assign(this, context);
        //Add this object to array of object to render
        
      },

      //Default properties to all shapes
      ContextShape : function(){
        this.Order   = 0;
        this.Display = true;
      },

      //Render any shape
      Render : function(shape){

          try{
            switch(shape.name){
              case 'Square':
                  CanvasHandle.Context.beginPath();
                  CanvasHandle.Context.fillStyle   = Engine.Helper.CorrectRGB(shape.bgColor);
                  CanvasHandle.Context.lineStyle   = shape.lnColor;
                  CanvasHandle.Context.lineWidth   = shape.lnWidth;
                  CanvasHandle.Context.rect(shape.x,shape.y,shape.width,shape.height);
                  CanvasHandle.Context.fill();
                  CanvasHandle.Context.stroke();
                break;
              case 'Circle':
                  CanvasHandle.Context.beginPath();
                  CanvasHandle.Context.fillStyle   = Engine.Helper.CorrectRGB(shape.bgColor);
                  CanvasHandle.Context.lineStyle   = shape.lnColor;
                  CanvasHandle.Context.lineWidth   = shape.lnWidth;
                  CanvasHandle.Context.arc(shape.x,shape.y, shape.radial, shape.beginAngle, shape.endAngle);
                  CanvasHandle.Context.fill();
                  CanvasHandle.Context.stroke();
                break;
              case 'Text':
                  CanvasHandle.Context.beginPath();            
                  CanvasHandle.Context.fillStyle   = Engine.Helper.CorrectRGB(shape.bgColor);
                  CanvasHandle.Context.font        = shape.font;
                  CanvasHandle.Context.fillText(shape.text , shape.x, shape.y);            
                break;
            }

          }
          catch(ex){
            console.log(ex);
          }
      },


      //Animate a shape, method calculate all position transitions and color transitions
      Animation : function(animation, callback){

          //Calc the distance in pixels between current axis x,y to new axis x,y
          this.nextMoveX = animation.x - animation.shape.x;
          this.nextMoveY = animation.y - animation.shape.y;
          this.divisionTime = Engine.FPS/10;
          //Calc the size of movimentation in pixels
          this.movePixelX   = this.nextMoveX / (animation.time/this.divisionTime);
          this.movePixelY   = this.nextMoveY / (animation.time/this.divisionTime);

          //Convert color to rgba
          this.toColor      = Engine.Helper.ToRgba(animation.toColor);
          animation.shape.bgColor = Engine.Helper.ToRgba(animation.shape.bgColor);

          //Calc the transition for each channel color
          colorArray = String(animation.shape.bgColor).replace(/[^0-9,.]/g, '').split(',');
          toColorArray = String(this.toColor).replace(/[^0-9,.]/g, '').split(',');

          variationHexR = (parseInt(colorArray[0]) - parseInt(toColorArray[0])) / (animation.time/this.divisionTime);
          variationHexG = (parseInt(colorArray[1]) - parseInt(toColorArray[1])) / (animation.time/this.divisionTime);
          variationHexB = (parseInt(colorArray[2]) - parseInt(toColorArray[2])) / (animation.time/this.divisionTime);
          variationHexA = (colorArray[3] - toColorArray[3]) / (animation.time/this.divisionTime);
          
          //initialize a new instance of object to calc transition color
          var objColor = new Engine.Helper.MoveColor(variationHexR, variationHexG, variationHexB, variationHexA);
          this.NextColor = function(color){
            return objColor.NewColor(color);
          }
          
          //Start animation
          this.start = function(callback){
            
            //global current object
            var self = this;
            
            //Interval of render
            var inter = setInterval(function(){
                
                //Next move to axis x
                if(self.movePixelX < 0 && animation.shape.x > 0)
                  animation.shape.x = (animation.shape.x <= animation.x || animation.shape.x < 0) ? animation.x : animation.shape.x += self.movePixelX;
                else
                  animation.shape.x = (animation.shape.x >= animation.x || animation.shape.x < 0) ? animation.x : animation.shape.x += self.movePixelX;

                //Next move to axis y
                if(self.movePixelY < 0)
                  animation.shape.y = (animation.shape.y <= animation.y || animation.shape.y < 0) ? animation.y : animation.shape.y += self.movePixelY;
                else
                  animation.shape.y = (animation.shape.y >= animation.y || animation.shape.y < 0) ? animation.y : animation.shape.y += self.movePixelY;
                
                //Next color
                animation.shape.bgColor = self.NextColor(animation.shape.bgColor);

                //Render all objects in scope
                Engine.Render();
               
                //console.log(Math.floor(animation.shape.x) + " - " + animation.x + " = " + Math.floor(animation.shape.y) + " - " + animation.y);
                //If this shape arrive on your destiny
                if(Math.floor(animation.shape.x) == animation.x && Math.floor(animation.shape.y) == animation.y){
                    //stop the animation
                    clearInterval(inter);

                    if(typeof callback == 'function')
                      callback();
                }

            },this.divisionTime);
          }

      },


      //Animate a shape with multiple positions
      AnimationMultiple : function(animation, callback){

        //all destinies
        this.maxMove = animation.move.length;
        //current id of array 
        this.idx = 0;

        //start animations
        this.start = function(){

          //glonal variable for this object
          var self = this;
          
          //call animation
          var anim = new CanvasHandle.Shapes.Animation(
            {
              shape : animation.shape,
              x : animation.move[self.idx].x,
              y : animation.move[self.idx].y,
              time : animation.move[self.idx].time,
              toColor : (animation.move[self.idx].toColor == undefined ? animation.shape.bgColor : animation.move[self.idx].toColor)
            },
            function()
            {
              self.idx++;     

              //if exists more one animation       
              if(self.idx < self.maxMove)
                self.start(idx);
              else{
                if(typeof callback == 'function')
                  callback();
              }
            });     
          anim.start();   
        }
        
      },

      //Rotate the shape
      Rotate : function(angle, velocity, deceleration){

      },

      //Remove the shape of array renders
      Destroy : function(shape){
        Engine.Canvas.Context.clearRect(shape.x , shape.y, CanvasHandle.Context.canvas.clientWidth, CanvasHandle.Context.canvas.clientHeight);
      }
    },
    //Clear all stage
    ClearCanvas : function(){
      CanvasHandle.Context.beginPath();
      CanvasHandle.Context.clearRect(0, 0, CanvasHandle.Context.canvas.clientWidth, CanvasHandle.Context.canvas.clientHeight);
      CanvasHandle.Context.fill();
    },

    //Fade all stage
    FadeCanvas : function(time){
      var op = ( (time / 2 + 10 ) / time);    
      CanvasHandle.Context.fillStyle  = "rgba(0, 0, 0, " + op +")";
      CanvasHandle.Context.rect(0, 0, CanvasHandle.Context.canvas.clientWidth, CanvasHandle.Context.canvas.clientHeight);
      CanvasHandle.Context.fill();
    }
    
  }
}
