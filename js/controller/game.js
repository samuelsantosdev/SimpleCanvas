var Game = function(engine){

    this.engine = engine;

    this.main = function(){
        try{
            
            this.introPainelDecrease();            
            this.screenStart();

        }
        catch(ex)
        {
            console.log(ex);
        }
    };

    this.introPainelDecrease = function(){
        var currentController = this, n=10;
        var painel = currentController.painelRender();
        
        console.log('testing render');
        var testing = function(){
            if(n >= 0){
                currentController.painelScore(n);
                currentController.painelSpeed(n);
                currentController.painelSnake(n);

                currentController.painelRender();
                n--;
            }
            else
            {
                clearInterval(tim);
                console.log('stopped');
            }
        }
        var tim = setInterval(testing, 100);
    }

    this.screenStart = function(){
        try{
            var h = this.engine.ctx.canvas.clientHeight;
            var w = this.engine.ctx.canvas.clientWidth;

            var s = Object.create(this.engine.entities.stage);
            s.width = w;
            s.height = h - 30;
            s.color = "#333";
            s.renderStage(this.engine.ctx);
            
            this.engine.libraries.event.addEvent(s, 'keydown', this.engine.ctx.canvas, function(mouse){console.log(mouse)});
            
            var button = Object.create(this.engine.libraries.canvas.TextObj);
            button.x          = w / 2;
            button.y          = h / 2;
            button.bgColor    = "#fff";
            button.font       = "20px Arial";
            button.text       = "Start";
            this.engine.libraries.canvas.renderText(this.engine.ctx, [button]);

        }
        catch(ex)
        {
            console.log(ex);
        }
    }

    this.painelScore = function(value){
        this.engine.entities.painel.scoreGame = (typeof value == 'undefined') ? +1 : value;
    }
    this.painelSpeed = function(value){
        this.engine.entities.painel.speedSnake = (typeof value == 'undefined') ? +1 : value;
    }
    this.painelSnake = function(value){
        this.engine.entities.painel.sizeSnake = (typeof value == 'undefined') ? +1 : value;
    }

    this.painelRender = function(){
        try{
            var c = Object.create(this.engine.libraries.canvas);
            var p = this.engine.entities.painel;

            c.RectObj.x          =0;
            c.RectObj.y          =470;
            c.RectObj.width      =500;
            c.RectObj.height     =30;
            c.RectObj.bgColor    ="#fff";
            c.RectObj.lnWidth    =2;
            c.RectObj.lnColor    ="#fff";
            c.renderRect(this.engine.ctx, c.RectObj);
            
            var t1 = Object.create(c.TextObj);
            var t2 = Object.create(c.TextObj);
            var t3 = Object.create(c.TextObj);
            var arrText = [];

            t1.x          = c.RectObj.x + 10;
            t1.y          = c.RectObj.y + 20;
            t1.bgColor    = "#000";
            t1.font       = "15px Arial";
            t1.text       = "Score: " + p.scoreGame;
            arrText.push(t1);

            t2.x          = c.RectObj.x + 200;
            t2.y          = c.RectObj.y + 20;
            t2.bgColor    = "#000";
            t2.font       = "15px Arial";
            t2.text       = "Snake: " + p.sizeSnake;
            arrText.push(t2);

            t3.x          = c.RectObj.x + 400;
            t3.y          = c.RectObj.y + 20;
            t3.bgColor    = "#000";
            t3.font       = "15px Arial";
            t3.text       = "Speed: " + p.speedSnake;
            arrText.push(t3);

            c.renderText(this.engine.ctx, arrText);
            
            return c.RectObj;
            
        } catch (ex) {
            console.log(ex);
        }
    }

};