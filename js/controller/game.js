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
                var hc = Object.create(this.engine.libraries.canvas);
                this.snakeBody.addPiece(hc);
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
                                mainController.snakeBody.init(hc, mainController.engine.ctx.canvas);
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
        newTurn : {
            x:0,
            y:0,
            moveX:0,
            moveY:0
        },
        reset : function(){
            this.pieces = [];
            this.coordinatesChange = [{x:0, y:0}];
            this.directionSnake = {x:0, y:0};
        },
        addPiece : function(canvas){
            snakePiece = Object.create(canvas.elements.RectObj);
            last = this.pieces.length -1;
            lastX = this.pieces.length == 0 ? 0 : this.pieces[last].x -= this.pieces[last].turn[0].moveX;
            lastY = this.pieces.length == 0 ? 0 : this.pieces[last].y -= this.pieces[last].turn[0].moveY;
            
            turnArr = [];
            console.log(last);
            if(last > -1){
                idxTurn = this.pieces[last].turn.length;
                if(idxTurn > 0)
                    turnArr = this.pieces[last].turn;

                console.log(turnArr);
            }
            snakePiece.width      =this.config.size;
            snakePiece.height     =this.config.size;
            snakePiece.bgColor    ="#fff";
            snakePiece.lnWidth    =2;
            snakePiece.lnColor    ="#000";
            snakePiece.x          = lastX;
            snakePiece.y          = lastY;
			snakePiece.turn       = turnArr;
            
            this.pieces.push(snakePiece);
        },        
        renderSnake : function(ctx, hc){
                
            for(var i = 0; i < this.pieces.length; i++){
                
                if(this.pieces[i].turn.length == 0)
                    continue;

                this.pieces[i].x -= this.pieces[i].turn[0].moveX;
                this.pieces[i].y -= this.pieces[i].turn[0].moveY;

				if(this.pieces[i].x == this.pieces[i].turn[0].x &&
					this.pieces[i].y == this.pieces[i].turn[0].y){
					filtercoord = this.pieces[i].turn.slice(1, this.pieces[i].turn.length - 1);
					this.pieces[i].turn = filtercoord;
				}
                hc.render(ctx, this.pieces[i]);
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
            lastIdx = this.pieces.length > 1 ? this.pieces.length - 2 : 0;
            this.newTurn = {
						x:this.pieces[lastIdx].x,
						y:this.pieces[lastIdx].y,
						moveX:this.config.size,
						moveY:0
					};
			this.filterCoordenates();
        },
        moveRight : function(){
            lastIdx = this.pieces.length > 1 ? this.pieces.length - 2 : 0;
            this.newTurn = {
						x:this.pieces[lastIdx].x,
						y:this.pieces[lastIdx].y,
						moveX:-this.config.size,
						moveY:0
					};
			this.filterCoordenates();
        },
        moveUp : function(){
            lastIdx = this.pieces.length > 1 ? this.pieces.length - 2 : 0;
            this.newTurn = {
						x:this.pieces[lastIdx].x,
						y:this.pieces[lastIdx].y,
						moveX:0,
						moveY:this.config.size
					};
			this.filterCoordenates();
        },
        moveDown : function(){
            lastIdx = this.pieces.length > 1 ? this.pieces.length - 2 : 0;
            this.newTurn = {
						x:this.pieces[lastIdx].x,
						y:this.pieces[lastIdx].y,
						moveX:0,
						moveY:-this.config.size
					};
			this.filterCoordenates();
        },
		filterCoordenates : function(){
            if(this.pieces[0].turn.length > 0){
    			this.pieces[0].turn[0].moveX = this.newTurn.moveX;
                this.pieces[0].turn[0].moveY = this.newTurn.moveY;
            }
            else{
                this.pieces[0].turn.push(this.newTurn);
            }
			for(var k = 1; k < this.pieces.length; k++){
                this.pieces[k].turn.push(this.newTurn);
			}
		},
        init : function(hc, canvas){
            this.pieces = [];
            this.addPiece(hc);
            this.pieces[0].x = canvas.clientWidth / 2;
            this.pieces[0].y = canvas.clientHeight / 2;                
            this.moveLeft();
        }


    }

};