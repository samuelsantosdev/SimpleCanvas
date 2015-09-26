//Object handle context 2d
var CanvasHandle = function(){

  //Objects render
  this.RectObj = function(){
    this.x          =0;
    this.y          =0;
    this.width      =0;
    this.height     =0;
    this.bgColor    ="#fff";
    this.lnWidth    =1;
    this.lnColor    ="#fff";
  };

  this.ArcObj = function(){
    this.x          =0;
    this.y          =0;
    this.radial     =0;
    this.beginAngle =0;
    this.endAngle   =(Math.PI)*2;
    this.bgColor    ="#fff";
    this.lnColor    ="#fff";
    this.lnWidth    =1;
  };
  
  this.TextObj = function(){
    this.x          =0;
    this.y          =0;
    this.bgColor    ="#fff";
    this.font       ="#fff";
    this.text       ="";
  };


  //Methods render
  this.renderRect = function(ctx, RectObj){
    ctx.beginPath();
    ctx.fillStyle   = RectObj.bgColor;
    ctx.lineStyle   = RectObj.lnColor;
    ctx.lineWidth   = RectObj.lnWidth;
    ctx.rect(RectObj.x,RectObj.y,RectObj.width,RectObj.height);
    ctx.fill();
    ctx.stroke();
  };

  this.renderArc = function(ctx, ArcObj){
    ctx.beginPath();
    ctx.fillStyle   = ArcObj.bgColor;
    ctx.lineStyle   = ArcObj.lnColor;
    ctx.lineWidth   = ArcObj.lnWidth;
    ctx.arc(ArcObj.x,ArcObj.y, ArcObj.radia, ArcObj.beginAngle, ArcObj.endAngle);
    ctx.fill();
    ctx.stroke();
  };

  this.renderText = function(ctx, TextObj){
    if(typeof TextObj == 'string'){
      ctx.beginPath();
      ctx.fillStyle   =TextObj.bgColor;
      ctx.font        =TextObj.font;
      ctx.fillText(TextObj.text , TextObj.x, TextObj.y);
      return 0;
    }

    ctx.beginPath();
    for(idx in TextObj){
      ctx.fillStyle   =TextObj[idx].bgColor;
      ctx.font        =TextObj[idx].font;
      ctx.fillText(TextObj[idx].text , TextObj[idx].x, TextObj[idx].y);
    }

  };

};
