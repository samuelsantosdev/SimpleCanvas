//Objects elements
var positionAbsolute = {
    top        :undefined,
    bottom     :undefined, 
    left       :undefined, 
    right      :undefined 
  };
var Elements = {

  RectObj : {
    name       :"RectObj", 
    x          :0,
    y          :0,
    width      :0,
    height     :0,
    bgColor    :"#fff",    
    lnColor    :"#fff",
    lnWidth    :1,
    position   :positionAbsolute
  },
  ArcObj : {
    name       :"ArcObj",
    x          :0,
    y          :0,
    radial     :0,
    beginAngle :0,
    endAngle   :(Math.PI)*2,
    bgColor    :"#fff",
    lnColor    :"#fff",
    lnWidth    :1,
    position   : positionAbsolute,

    width      :function(){return radial * 2},
    height     :function(){return radial * 2}
  },
  TextObj : {
    name       :"TextObj",
    x          :0,
    y          :0,
    bgColor    :"#fff",
    font       :"#fff",
    text       :"",
    position   : positionAbsolute,

    width      :function(){return radial * 2},
    height     :function(){return radial * 2}
  }
}

//Object handle context 2d
var CanvasHandle = function(){

  this.elements = Elements;
  //Methods render
  this.render = function(ctx, obj){

    try{

      console.log(obj);

      switch(obj.name){
        case 'RectObj':
            ctx.beginPath();
            ctx.fillStyle   = obj.bgColor;
            ctx.lineStyle   = obj.lnColor;
            ctx.lineWidth   = obj.lnWidth;
            ctx.rect(obj.x,obj.y,obj.width,obj.height);
            ctx.fill();
            ctx.stroke();
          break;

        case 'ArcObj':
            ctx.beginPath();
            ctx.fillStyle   = obj.bgColor;
            ctx.lineStyle   = obj.lnColor;
            ctx.lineWidth   = obj.lnWidth;
            ctx.arc(obj.x,obj.y, obj.radia, obj.beginAngle, obj.endAngle);
            ctx.fill();
            ctx.stroke();
          break;

        case 'TextObj':
            ctx.beginPath();            
            ctx.fillStyle   =obj.bgColor;
            ctx.font        =obj.font;
            ctx.fillText(obj.text , obj.x, obj.y);
            
          break;

        default:

      }

    }
    catch(ex){
      console.log(ex);
    }
  }

  this.update = function(ctx, obj){
    this.render(ctx, obj);
  }

  this.destroy = function(ctx, obj){
    ctx.clearRect(obj.x , obj.y, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
  }

  this.clearAll = function(ctx){
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
  }

}
