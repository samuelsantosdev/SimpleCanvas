
var EntityHandle = function(){

  this.canvas = new CanvasHandle();

  this.elementRect = new this.canvas.RectObj();
  this.elementArc = new this.canvas.ArcObj();
  this.elementText = new this.canvas.TextObj();

  this.getElementRect = function(){
  	return this.eleRect;
  }

  this.getElementrc = function(){
  	return this.eleArc;
  }

  this.getElementText = function(){
  	return this.eleText;
  }

  this.setElementRect = function(){
  	return this.eleRect;
  }

  this.setElementArc = function(){
  	return this.eleArc;
  }

  this.setElementText = function(){
  	return this.eleText;
  }

};