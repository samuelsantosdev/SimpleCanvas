//Objects entity
var Stage = function(width, height, color, mapList){

    this.width   = width;
    this.height  = height;
    this.color   = color;
    this.mapList = mapList;    

};



var Map = function(speed, background){
  this.speed      = speed;
  this.background = background;
};



var Painel = function(score, size, speed){

  this.scoreGame = score;
  this.sizeSnake  = size;
  this.speedSnake = speed;

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
