//Entity snake
Engine.Entities['SnakeBody'] = function(){

    return SnakeBody = {

        //Config params
        config : {size : 10, speed : 150},

        //pieces of body
        pieces : [],

        //coordinates center canvas
        centerX : 0,
        centerY : 0,

        //current way of snake
        currentMoveX : 0,
        currentMoveY : 0,

        //snake is rendering
        Rendering : false,

        //reset snake, destroy him
        Reset : function(){
            for(var n = 0; n < SnakeBody.pieces.length; n++){
                Engine.RemoveObjectRender(SnakeBody.pieces[n].Id);
            }
            SnakeBody.pieces = [];
            SnakeBody.coordinatesChange = [{x:0, y:0}];
            SnakeBody.directionSnake = {x:0, y:0};

        },

        //set coordinates to a new piece of snake
        PieceMove : function(snakePiece){
            
            lastPiece = SnakeBody.pieces.length - 1;

            if(SnakeBody.pieces.length == 0){
                snakePiece.x = SnakeBody.centerX;
                snakePiece.y = SnakeBody.centerY;
                snakePiece.moveX = SnakeBody.currentMoveX;
                snakePiece.moveY = SnakeBody.currentMoveY;
            }
            else
            {
                snakePiece.x = SnakeBody.pieces[lastPiece].x + SnakeBody.pieces[lastPiece].moveX;
                snakePiece.y = SnakeBody.pieces[lastPiece].y + SnakeBody.pieces[lastPiece].moveY;
                snakePiece.moveX = SnakeBody.pieces[lastPiece].moveX;
                snakePiece.moveY = SnakeBody.pieces[lastPiece].moveY;
            }

            return snakePiece;
        },

        //create a new peace to body of snake
        AddPiece : function(){
            var piecedata = {
                    x: 0, 
                    y: 0, 
                    width: SnakeBody.config.size, 
                    height: SnakeBody.config.size, 
                    bgColor: "rgba(255, 255, 255, 1)", 
                    lnColor: "#fff", 
                    lnWidth: 1
                };
            
            snakePiece = new Engine.Shapes.Square(piecedata);
            snakePiece.bgColor = "rgba(255, 255, 255, 0.5)";
            snakePiece.moveX = 0;
            snakePiece.moveY = 0;
            snakePiece = SnakeBody.PieceMove(snakePiece);

            Engine.AddObjectRender('snake'+SnakeBody.pieces.length, snakePiece);

            SnakeBody.pieces.map(function(obj){
                obj.bgColor="rgba(255, 255, 255, 1)";
                return obj;
            });

            SnakeBody.pieces.push(snakePiece);
            return SnakeBody.pieces[SnakeBody.pieces.length - 1];
        },  

        //set the next coordinates to all pieces of snake
        RenderSnake : function(callback){
            SnakeBody.Rendering = false;
            for(var invert = SnakeBody.pieces.length - 1; invert >= 0; invert--){
                if(invert == 0){
                    SnakeBody.pieces[invert].x -= SnakeBody.currentMoveX;
                    SnakeBody.pieces[invert].y -= SnakeBody.currentMoveY;
                    SnakeBody.pieces[invert].moveX = SnakeBody.currentMoveX;
                    SnakeBody.pieces[invert].moveY = SnakeBody.currentMoveY;
                }
                else{
                    SnakeBody.pieces[invert].x = SnakeBody.pieces[invert-1].x;
                    SnakeBody.pieces[invert].y = SnakeBody.pieces[invert-1].y;
                    SnakeBody.pieces[invert].moveX = SnakeBody.pieces[invert-1].moveX;
                    SnakeBody.pieces[invert].moveY = SnakeBody.pieces[invert-1].moveY ;
                }                
            }

            SnakeBody.Rendering = false;
            if(callback != undefined)
                callback();
        },

        //Move to left ...
        MoveLeft : function(){
            if(!SnakeBody.Rendering){
                SnakeBody.currentMoveX = SnakeBody.config.size;
                SnakeBody.currentMoveY = 0;            
            }
        },
        MoveRight : function(){
            if(!SnakeBody.Rendering){
                SnakeBody.currentMoveX = -SnakeBody.config.size;
                SnakeBody.currentMoveY = 0;             
            }
        },
        MoveUp : function(){
            if(!SnakeBody.Rendering){
                SnakeBody.currentMoveX = 0;
                SnakeBody.currentMoveY = SnakeBody.config.size; 
            }
        },
        MoveDown : function(){
            if(!SnakeBody.Rendering){
                SnakeBody.currentMoveX = 0;
                SnakeBody.currentMoveY = -SnakeBody.config.size; 
            }
        },

        //initialize entity, reset pieces of snake, set center canvas, set snake to move left, create the first piece a snake
        init : function(){
            SnakeBody.pieces = [];
            SnakeBody.centerX = Engine.Context.Canvas.clientWidth / 2;
            SnakeBody.centerY = Engine.Context.Canvas.clientWidth / 2;
            SnakeBody.MoveLeft();
            SnakeBody.AddPiece();
        }
    }
}