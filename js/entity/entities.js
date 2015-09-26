//Objects entity
var Stage = function(width, height, color){

    this.width   = width;
    this.height  = height;
    this.color   = color;   

    this.renderStage = function(ctx){
      this.canvas.RectObj.x          =0;
      this.canvas.RectObj.y          =0;
      this.canvas.RectObj.width      =this.width;
      this.canvas.RectObj.height     =this.height;
      this.canvas.RectObj.bgColor    =this.color;
      this.canvas.RectObj.lnWidth    =2;
      this.canvas.RectObj.lnColor    ="#fff";
      this.canvas.renderRect(ctx, this.canvas.RectObj);
    }
};



var Map = function(speed, background){
  this.speed      = speed;
  this.background = background;
};



var Painel = function(score, size, speed){

  this.scoreGame = (typeof score == 'undefined') ? 0 : score;
  this.sizeSnake  = (typeof size == 'undefined') ? 0 : size;
  this.speedSnake = (typeof speed == 'undefined') ? 0 : speed;
};



var Snake = function(size, color, actions){
  this.size    = size;
  this.color   = color;
  this.actions = actions;
};



var Actions = function(){
  this.dash = function(){};
  this.eat  = function(){};
};
