var Game = function(engine){

    this.engine = engine;

    this.main = function(){

        this.painelRender();        

    };

    this.painelRender = function(){
        try{
            var p = this.engine.entities.painel;

            p.canvas.RectObj.x          =0;
            p.canvas.RectObj.y          =470;
            p.canvas.RectObj.width      =500;
            p.canvas.RectObj.height     =30;
            p.canvas.RectObj.bgColor    ="#fff";
            p.canvas.RectObj.lnWidth    =2;
            p.canvas.RectObj.lnColor    ="#fff";
            p.canvas.renderRect(this.engine.ctx, p.canvas.RectObj);

            var t1 = Object.create(p.canvas.TextObj);
            var t2 = Object.create(p.canvas.TextObj);
            var t3 = Object.create(p.canvas.TextObj);
            var arrText = [];

            t1.x          = p.canvas.RectObj.x + 10;
            t1.y          = p.canvas.RectObj.y + 20;
            t1.bgColor    = "#000";
            t1.font       = "15px Arial";
            t1.text       = "Score: " + p.scoreGame;
            arrText.push(t1);

            t2.x          = p.canvas.RectObj.x + 200;
            t2.y          = p.canvas.RectObj.y + 20;
            t2.bgColor    = "#000";
            t2.font       = "15px Arial";
            t2.text       = "Snake: " + p.sizeSnake;
            arrText.push(t2);

            t3.x          = p.canvas.RectObj.x + 400;
            t3.y          = p.canvas.RectObj.y + 20;
            t3.bgColor    = "#000";
            t3.font       = "15px Arial";
            t3.text       = "Speed: " + p.speedSnake;
            arrText.push(t3);

            p.canvas.renderText(this.engine.ctx, arrText);

        } catch (ex) {
            console.log(ex);
        }
    }

};