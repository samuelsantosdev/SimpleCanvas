var Game = function(engine){

    this.engine = engine;
    this.time = setTimeout(function(){});

    this.main = function(){
        try{            
            this.screenStart();
            this.addEvents();
        }
        catch(ex)
        {
            console.log(ex);
        }
    };

    this.rulesGame = function(){
        var mainController = this;
        if( mainController.snakeBody.pieces[0].x < 0 || 
            mainController.snakeBody.pieces[0].y < 0 || 
            mainController.snakeBody.pieces[0].x > this.engine.ctx.canvas.clientWidth - mainController.snakeBody.config.size || 
            mainController.snakeBody.pieces[0].y > this.engine.ctx.canvas.clientHeight - mainController.snakeBody.config.size)
        {
            clearInterval(this.time);
            var alert = this.engine.libraries.canvas.elements.TextObj;
            alert.x          = this.engine.ctx.canvas.clientWidth / 2 - 100;
            alert.y          = this.engine.ctx.canvas.clientHeight / 2;
            alert.bgColor    = "#fff";
            alert.font       = "20px Arial";
            alert.text       = "Fail - Enter to continue";
            this.canvas.render(this.engine.ctx, alert);  
            mainController.snakeBody.reset();
        }
    }

    this.addEvents = function(){
        var mainController = this;
        var ctx = this.engine.ctx;
        var canvas = this.canvas;
        var s = Object.create(this.engine.entities.stage);
        var hc = Object.create(this.engine.libraries.canvas);
        this.engine.libraries.event.addEvent(
            s, 
            'keydown', 
            this.engine.ctx.canvas, 
            function(keyPress)
                {
                    console.log(keyPress.key);
                    switch(keyPress.key){
                        case'Enter':
                            if(mainController.snakeBody.pieces.length == 0){
                                canvas.clearAll(ctx);
                                mainController.snakeBody.init(hc);
                                mainController.time = setInterval(function(){
                                    canvas.fadeAll(ctx, mainController.snakeBody.config.speed);
                                    mainController.snakeBody.renderSnake(ctx, hc);
                                    mainController.rulesGame();
                                }, mainController.snakeBody.config.speed);
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
            
            var button = this.engine.libraries.canvas.elements.TextObj;
            button.x          = w / 2 - 20;
            button.y          = h / 2;
            button.bgColor    = "#fff";
            button.font       = "20px Arial";
            button.text       = "Enter";
            this.canvas.render(this.engine.ctx, button);           

        }
        catch(ex)
        {
            console.log(ex);
        }
    }   

    this.snakeBody = {
        config : {size : 10, speed : 200},
        pieces : [],
        coordinatesChange : [{x:0, y:0}],
        directionSnake : {x:0, y:0},
        reset : function(){
            this.pieces = [];
            this.coordinatesChange = [{x:0, y:0}];
            this.directionSnake = {x:0, y:0};
        },
        addPiece : function(canvas){
            snakePiece = canvas.elements.RectObj;

            snakePiece.width      =this.config.size;
            snakePiece.height     =this.config.size;
            snakePiece.bgColor    ="#fff";
            snakePiece.lnWidth    =2;
            snakePiece.lnColor    ="#000";
            snakePiece.x = 0;
            snakePiece.y = 0;
            
            this.pieces.push(snakePiece);
        },        
        renderSnake : function(ctx, hc){
           
            if(this.pieces[0].x == 0 && this.pieces[0].y == 0){
                this.pieces[0].x = ctx.canvas.clientWidth / 2; 
                this.pieces[0].y = ctx.canvas.clientHeight / 2;
            }

            for(var i = 0; i < this.pieces.length; i++){
                
                this.pieces[i].x = this.pieces[i].x - this.coordinatesChange[0].x;
                this.pieces[i].y = this.pieces[i].y - this.coordinatesChange[0].y;
                
                hc.render(ctx, this.pieces[i]);
            }
        },
        moveLeft : function(){
            this.coordinatesChange[0].x = this.config.size;
            this.coordinatesChange[0].y = 0;
        },
        moveRight : function(){
            this.coordinatesChange[0].x = -this.config.size;
            this.coordinatesChange[0].y = 0;
        },
        moveUp : function(){
            this.coordinatesChange[0].x = 0;
            this.coordinatesChange[0].y = this.config.size;
        },
        moveDown : function(){
            this.coordinatesChange[0].x = 0;
            this.coordinatesChange[0].y = -this.config.size;
        },
        init : function(hc){
            this.pieces = [];
            this.addPiece(hc);
            this.moveLeft();
        }


    }

};