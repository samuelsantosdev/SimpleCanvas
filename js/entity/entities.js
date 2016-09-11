//Objects entity
var Stage = function(width, height, color){

    this.width   = width;
    this.height  = height;
    this.color   = color;   

    this.renderStage = function(ctx){
      var stage = this.canvas.elements.RectObj;
      stagex          =0;
      stage.y          =0;
      stage.width      =this.width;
      stage.height     =this.height;
      stage.bgColor    =this.color;
      stage.lnWidth    =2;
      stage.lnColor    ="#fff";
      this.canvas.render(ctx, stage);
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
