var Game = function(){


    this.render = function(ctx){

        var eleObj = this.getEleRect();
        this.utilCnv.renderRect(ctx, eleObj);

    };

    this.updateContent = function(ctx){
        this.render(ctx);
        var eleObj = this.getEleRect();
        ctx.fillStyle="#000";
        ctx.font="20px Arial";
        ctx.fillText("Score: " + this.scoreGame , eleObj.x + 10, eleObj.y + 30);
        ctx.fillText("Size: " + this.sizeSnake , (eleObj.width / 2) - 50, eleObj.y + 30);
        ctx.fillText("Speed: " + this.speedSnake , eleObj.width - 130, eleObj.y + 30);
      }
};