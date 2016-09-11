var Game = function(engine){

    this.engine = engine;

    this.main = function(){
        try{            
            this.screenStart();
        }
        catch(ex)
        {
            console.log(ex);
        }
    };

    this.screenStart = function(){
        try{

            var mainController = this;

            var h = this.engine.ctx.canvas.clientHeight;
            var w = this.engine.ctx.canvas.clientWidth;

            var s = Object.create(this.engine.entities.stage);
            s.width = w;
            s.height = h - 30;
            s.color = "#333";
            s.renderStage(this.engine.ctx);
            
            var hc = Object.create(this.engine.libraries.canvas);
            var button = this.engine.libraries.canvas.elements.TextObj;
            button.x          = w / 2 - 20;
            button.y          = h / 2;
            button.bgColor    = "#fff";
            button.font       = "20px Arial";
            button.text       = "Enter";
            this.canvas.render(this.engine.ctx, button);

            var ctx = this.engine.ctx;
            var canvas = this.canvas;
            this.engine.libraries.event.addEvent(
                s, 
                'keydown', 
                this.engine.ctx.canvas, 
                function(keyPress)
                    {
                        console.log(keyPress.key);
                        switch(keyPress.key){
                            case'Enter':
                                if(mainController.snakeBody.bodySnake.length == 0){
                                    canvas.clearAll(ctx);
                                    mainController.snakeBody.init(hc);
                                    setInterval(function(){
                                        canvas.clearAll(ctx);
                                        mainController.snakeBody.renderSnake(ctx, hc);
                                    }, 200);
                                }
                            break;
                            case'ArrowUp':
                                mainController.snakeBody.moveUp();
                            break;
                            case'ArrowDown':
                                mainController.snakeBody.moveDown();
                            break;
                            case'ArrowLeft':
                                mainController.snakeBody.moveLeft();
                            break;
                            case'ArrowRight':
                                mainController.snakeBody.moveRight();
                            break;
                        }

                    }
            );

        }
        catch(ex)
        {
            console.log(ex);
        }
    }   

    this.snakeBody = {
        bodySnake : [],
        coordinatesChange : {x:0, y:0},
        directionSnake : {x:0, y:0},
        
        addPiece : function(canvas){
            snakePiece = canvas.elements.RectObj;

            snakePiece.width      =10;
            snakePiece.height     =10;
            snakePiece.bgColor    ="#fff";
            snakePiece.lnWidth    =2;
            snakePiece.lnColor    ="#000";
            
            this.bodySnake.push(snakePiece);
        },        
        renderSnake : function(ctx, hc){
           
            if(this.bodySnake[0].x == 0 && this.bodySnake[0].y == 0){
                this.bodySnake[0].x = ctx.canvas.clientWidth / 2; 
                this.bodySnake[0].y = ctx.canvas.clientHeight / 2;
            }

            for(var i = 0; i < this.bodySnake.length; i++){
                
                this.bodySnake[i].x = this.bodySnake[i].x - this.coordinatesChange.x;
                this.bodySnake[i].y = this.bodySnake[i].y - this.coordinatesChange.y;
                
                hc.render(ctx, this.bodySnake[i]);
            }
        },
        moveLeft : function(){
            this.coordinatesChange.x = 10;
            this.coordinatesChange.y = 0;
        },
        moveRight : function(){
            this.coordinatesChange.x = -10;
            this.coordinatesChange.y = 0;
        },
        moveUp : function(){
            this.coordinatesChange.x = 0;
            this.coordinatesChange.y = 10;
        },
        moveDown : function(){
            this.coordinatesChange.x = 0;
            this.coordinatesChange.y = -10;
        },
        init : function(hc){
            this.bodySnake = [];
            this.addPiece(hc);
            this.moveLeft();
        }


    }

};