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
        currentController.painelRender();
        
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
            
            var button = this.engine.libraries.canvas.elements.TextObj;
            button.x          = w / 2;
            button.y          = h / 2;
            button.bgColor    = "#fff";
            button.font       = "20px Arial";
            button.text       = "Start";
            this.engine.libraries.canvas.render(this.engine.ctx, [button]);

        }
        catch(ex)
        {
            console.log(ex);
        }
    }

    this.painelRender = function(){
        try{
            var c = Object.create(this.engine.libraries.canvas);
            var b = c.elements.RectObj;
            var p = this.engine.entities.painel;

            b.x          =0;
            b.y          =470;
            b.width      =500;
            b.height     =30;
            b.bgColor    ="#fff";
            b.lnWidth    =2;
            b.lnColor    ="#fff";
            c.render(this.engine.ctx, b);
            
            return b;
            
        } catch (ex) {
            console.log(ex);
        }
    }

};