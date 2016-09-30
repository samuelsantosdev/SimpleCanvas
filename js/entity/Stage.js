Engine.Entities['Stage'] = function(width, height, color){
  return Stage = {
        width   : width,
        height  : height,
        color   : color,
        renderStage : function(ctx){
          var stage : this.canvas.elements.RectObj;
          stagex          =0;
          stage.y          =0;
          stage.width      =this.width;
          stage.height     =this.height;
          stage.bgColor    =this.color;
          stage.lnWidth    =2;
          stage.lnColor    ="#fff";
          this.canvas.render(ctx, stage);
        }
    }
}