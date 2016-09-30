//Main controller
Engine.Controllers['Game'] = function(){
    return Game = {
        
        //Propertie of person
        Snake : {},

        //Interval render snake
        Interval : function(){},

        //Object with features of slice to snake eat
        ShortPiece : {
            //coordinates of slice
            piece : {
            },
            //Render a peace in a random coordinates
            RenderPiece : function(){
                if(this.piece.x == undefined){
                    piecesX = Engine.Context.Canvas.clientWidth / Game.Snake.config.size;
                    piecesY = Engine.Context.Canvas.clientHeight / Game.Snake.config.size;
                    //randPieceX = Math.floor((Math.random() * piecesX) + 1) * controller.snakeBody.config.size;
                    //randPieceY = Math.floor((Math.random() * piecesY) + 1) * controller.snakeBody.config.size;
                    randPieceX = Math.floor((Math.random() * 20) + 10) * Game.Snake.config.size;
                    randPieceY = Math.floor((Math.random() * 20) + 10) * Game.Snake.config.size;

                    var newPiece = new Engine.Shapes.Square(
                        {
                            x : randPieceX - Game.Snake.config.size, 
                            y : randPieceY - Game.Snake.config.size, 
                            width : Game.Snake.config.size, 
                            height : Game.Snake.config.size, 
                            bgColor : "#f00", 
                            lnColor : "#fff", 
                            lnWidth : 2
                        });
                    
                    Engine.AddObjectRender('piece', newPiece);
                    this.piece    = newPiece;
                }
            }
        },

        //Starter method
        Main : function(){
            try{            
                this.ScreenStart();
                this.AddEvents();
            }
            catch(ex)
            {
                console.log(ex);
            }
        },

        //Rules to box colision
        RulesGame : function(){
            
            if(Game.Snake.pieces.length > 0){

                w = Engine.Context.Canvas.clientWidth;
                h = Engine.Context.Canvas.clientHeight;
                // If colision with a wall
                if( Game.Snake.pieces[0].x < 0 || Game.Snake.pieces[0].y < 0 ||  Game.Snake.pieces[0].x > w - Game.Snake.config.size ||  Game.Snake.pieces[0].y > h - Game.Snake.config.size)
                {
                    //show alert button
                    Engine.ShowObjectRender('Alert');  
                    //remove piece of list render
                    Engine.RemoveObjectRender('piece');
                    Engine.Render();

                    //reset snake
                    Game.ShortPiece.piece = {};
                    Game.Snake.Reset();
                    //Stop animation
                    clearInterval(Game.Interval);
                }
            }
            
            //Render 
            Game.ShortPiece.RenderPiece();
    		
            //Eat the peace and increase one piece on snake
    		if(Game.Snake.pieces.length != 0){
    			if( Game.Snake.pieces[0].x == Game.ShortPiece.piece.x && Game.Snake.pieces[0].y == Game.ShortPiece.piece.y ){
    				//Remove object of list render
                    Engine.RemoveObjectRender('piece');

                    // reset coordenates of peace
                    Game.ShortPiece.piece = {};  
                    // Render new peace                  
    				Game.ShortPiece.RenderPiece();
                    //add a new pieace on snake
                    Game.Snake.AddPiece();
    			}
    		}
            
        },

        //Insert events output and input
        AddEvents : function(){
            
            //event keydown
            Engine.Events.AddEvent(
                null, 
                'keydown', 
                Engine.Canvas.Context, 
                function(keyPress)
                    {
                        //Key Pressed
                        console.log(keyPress.key);
                        switch(keyPress.key){
                            case'Enter':
                                
                                //if no exists a snake
                                if(Game.Snake.pieces.length == 0){

                                    //hide all buttons
                                    Engine.HideObjectRender('Button');
                                    Engine.HideObjectRender('Alert');

                                    //start the entity snake
                                    Game.Snake.init();

                                    //initilize animation dash of snake
                                    Game.Interval = setInterval(function(){                                        

                                        //set coordinates to each piece of snake
                                        Game.Snake.RenderSnake();
                                        //render all elements
                                        Engine.Render();
                                        //verify rules in this interval
                                        Game.RulesGame();

                                    }, Game.Snake.config.speed);
                                    
                                }

                            break;
                            case'ArrowUp':
                                Game.Snake.MoveUp();
                            break;
                            case'ArrowDown':
                                Game.Snake.MoveDown();
                            break;
                            case'ArrowLeft':
                                Game.Snake.MoveLeft();
                            break;
                            case'ArrowRight':
                                Game.Snake.MoveRight();
                            break;
                            case'Control':
                                clearInterval(Game.Interval);
                            break;
                        }

                    }
            );
        },


        //Screen start, animation slide down button
        ScreenStart : function(){
            try
            {   
                // size of canvas
                w = Engine.Context.Canvas.clientWidth;
                h = Engine.Context.Canvas.clientHeight;

                // declare all elements
                var stage = new Engine.Shapes.Square({x:0, y:0, width:w, height:h, bgColor:"rgba(100, 100, 100, 1)", lnColor:"#fff", lnWidth:0});
                var button = new Engine.Shapes.Text({x:(w/2 - 30), y:0, bgColor:"rgba(255, 255, 255, 0)", font:"20px Arial", text:"Enter"});
                var alert = new Engine.Shapes.Text({x:(w / 2 - 100), y:(h / 2), bgColor:"#fff", font:"20px Arial", text:"Fail - Enter to continue"});

                //Add elements in order of renderization
                Engine.AddObjectRender('Stage', stage);
                Engine.AddObjectRender('Button', button);
                Engine.AddObjectRender('Alert', alert);

                //hide a element
                Engine.HideObjectRender('Alert');

                //Load a entity Snake
                Engine.LoadEntities("SnakeBody", function(retorno){
                    Game.Snake = retorno;
                });

                //Animation of button start
                f = new Engine.Shapes.Animation({shape : button, x : button.x, y : (h/2), time:1000, toColor:"rgba(255, 255, 255, 1)"},
                    function(){
                        Game.AddEvents();
                    });
                f.start();
            }
            catch(ex)
            {
                console.log(ex);
            }
        }
        
    }

}
