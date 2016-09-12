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
        
        if( this.snakeBody.pieces[0].x < 0 || 
            this.snakeBody.pieces[0].y < 0 || 
            this.snakeBody.pieces[0].x > this.engine.ctx.canvas.clientWidth - this.snakeBody.config.size || 
            this.snakeBody.pieces[0].y > this.engine.ctx.canvas.clientHeight - this.snakeBody.config.size)
        {
            clearInterval(this.time);
            var alert = this.engine.libraries.canvas.elements.TextObj;
            alert.x          = this.engine.ctx.canvas.clientWidth / 2 - 100;
            alert.y          = this.engine.ctx.canvas.clientHeight / 2;
            alert.bgColor    = "#fff";
            alert.font       = "20px Arial";
            alert.text       = "Fail - Enter to continue";
            this.canvas.render(this.engine.ctx, alert);
            this.snakeBody.reset();
        }
        
        this.shortPiece.renderPiece(this);
		
		if(this.snakeBody.pieces.length != 0){
			if( this.snakeBody.pieces[0].x == this.shortPiece.piece.x 
				&& this.snakeBody.pieces[0].y == this.shortPiece.piece.y ){
				this.shortPiece.piece = {};
				this.shortPiece.renderPiece(this);                        
               // var hc = Object.create(this.engine.libraries.canvas);
                //this.snakeBody.addPiece(hc);
			}
		}
        
    }

    this.shortPiece = {
        piece : {
        },
        renderPiece : function(controller){
            if(this.piece.x == undefined){
                piecesX = controller.engine.ctx.canvas.clientWidth / controller.snakeBody.config.size;
                piecesY = controller.engine.ctx.canvas.clientHeight / controller.snakeBody.config.size;
                randPieceX = Math.floor((Math.random() * piecesX) + 1) * controller.snakeBody.config.size;
                randPieceY = Math.floor((Math.random() * piecesY) + 1) * controller.snakeBody.config.size;

                var newPiece       = Object.create(controller.engine.libraries.canvas.elements.RectObj);
                newPiece.width     = controller.snakeBody.config.size;
                newPiece.height    = controller.snakeBody.config.size;
                newPiece.bgColor    = "#f00";
                newPiece.lnWidth   = 2;
                newPiece.lnColor   = "#fff";
                newPiece.x         = randPieceX - controller.snakeBody.config.size;
                newPiece.y         = randPieceY - controller.snakeBody.config.size;
                this.piece    = newPiece;
            }
            controller.canvas.render(controller.engine.ctx, this.piece);
        }
    }

    this.addEvents = function(){
        var controller = this;
        
        this.engine.libraries.event.addEvent(
            controller.engine.entities.stage, 
            'keydown', 
            controller.engine.ctx.canvas, 
            function(keyPress)
                {
                    console.log(keyPress.key);
                    switch(keyPress.key){
                        case'Enter':
                            if(controller.snakeBody.pieces.length == 0){
                                
                                controller.engine.libraries.canvas.clearAll(controller.engine.ctx);
                                controller.snakeBody.init(controller.engine, controller.snakeBody.moveLeft());

                                controller.time = setInterval(function(){
                                    controller.engine.libraries.canvas.fadeAll(controller.engine, controller.snakeBody.config.speed);
                                    controller.snakeBody.renderSnake(controller.engine);
                                    controller.rulesGame();
                                }, controller.snakeBody.config.speed);

                            }
                        break;
                        case'ArrowUp':
                            controller.snakeBody.moveUp();
                        break;
                        case'ArrowDown':
                            controller.snakeBody.moveDown();
                        break;
                        case'ArrowLeft':
                            controller.snakeBody.moveLeft();
                        break;
                        case'ArrowRight':
                            controller.snakeBody.moveRight();
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
        config : {size : 10, speed : 100},
        pieces : [],
        newTurn : {
            x:0,
            y:0,
            moveX:0,
            moveY:0
        },
        centerX : 0,
        centerY : 0,
        reset : function(){
            this.pieces = [];
            this.coordinatesChange = [{x:0, y:0}];
            this.directionSnake = {x:0, y:0};
        },
        pieceMove : function(snakePiece){
            if(this.pieces.length == 0){
                snakePiece.x = this.centerX;
                snakePiece.y = this.centerY;
                snakePiece.moveX = this.currentMoveX;
                snakePiece.moveY = this.currentMoveY;
            }
            else
            {
                lastPiece = this.pieces.length - 1;
                snakePiece.x = this.pieces[lastPiece].x -= this.pieces[lastPiece].moveX;
                snakePiece.y = this.pieces[lastPiece].y -= this.pieces[lastPiece].moveY;
                snakePiece.moveX = this.pieces[lastPiece].moveX;
                snakePiece.moveY = this.pieces[lastPiece].moveY;
            }
            return snakePiece;
        },
        addPiece : function(engine){
            snakePiece = Object.create(engine.libraries.canvas.elements.RectObj);
            snakePiece.width      = this.config.size;
            snakePiece.height     = this.config.size;
            snakePiece.bgColor    = "#fff";
            snakePiece.lnWidth    = 2;
            snakePiece.lnColor    = "#000";
            snakePiece.x          = 0;
            snakePiece.y          = 0;
            snakePiece.moveX      = 0;
            snakePiece.moveY      = 0;
			snakePiece.turn       = [];
            
            snakePiece = this.pieceMove(snakePiece);

            this.pieces.push(snakePiece);
        },        
        renderSnake : function(engine){
                
            for(var i = 0; i < this.pieces.length; i++){
                
                this.pieces[i].x -= this.pieces[i].moveX;
                this.pieces[i].y -= this.pieces[i].moveY;

                engine.libraries.canvas.render(engine.ctx, this.pieces[i]);

                if(this.pieces[i].turn.length > 0){
    				if(this.pieces[i].x == this.pieces[i].turn[0].x &&
    					this.pieces[i].y == this.pieces[i].turn[0].y){

    					filtercoord = this.pieces[i].turn.slice(1, this.pieces[i].turn.length - 1);
    					this.pieces[i].turn = filtercoord;
                        this.pieces[i].moveX = this.pieces[i].turn[0].moveX;
                        this.pieces[i].moveY = this.pieces[i].turn[0].moveY;
    				}                
                }
            }
        },
		filterTurn : function(arrayTurns){
			return function(obj){
                    return obj.x 		!=	arrayTurns.x && 
					       obj.y 		!=	arrayTurns.y && 
					       obj.moveX 	!=	arrayTurns.moveX && 
					       obj.moveY 	!=	arrayTurns.moveY;
            }   
		},
        moveLeft : function(){
            this.currentMoveX = this.config.size;
            this.currentMoveY = 0;            
			this.filterCoordenates();
        },
        moveRight : function(){
            this.currentMoveX = -this.config.size;
            this.currentMoveY = 0;             
			this.filterCoordenates();
        },
        moveUp : function(){
            this.currentMoveX = 0;
            this.currentMoveY = this.config.size; 
			this.filterCoordenates();
        },
        moveDown : function(){
            this.currentMoveX = 0;
            this.currentMoveY = -this.config.size; 
			this.filterCoordenates();
        },
		filterCoordenates : function(){
            lastIdx = this.pieces.length - 1;
            if(lastIdx > 1){
                this.newTurn = {
                            x:this.pieces[lastIdx].x,
                            y:this.pieces[lastIdx].y,
                            moveX:this.currentMoveX,
                            moveY:this.currentMoveY
                        };
                
                this.pieces[0].turn.push(this.newTurn);
                for(var k = 1; k < this.pieces.length; k++){
                    this.pieces[k].turn.push(this.newTurn);
                }
            }

            if(lastIdx > -1){
                this.pieces[lastIdx].moveX = this.currentMoveX;
                this.pieces[lastIdx].moveY = this.currentMoveY;
            }
			
		},
        init : function(engine, move){
            this.pieces = [];
            this.centerX = engine.ctx.canvas.clientWidth / 2;
            this.centerY = engine.ctx.canvas.clientHeight / 2;
            move;
            this.addPiece(engine);
        }


    }

};