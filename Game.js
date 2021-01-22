class Game{
    constructor(){

    }

    getState(){
        var gameStateref = database.ref('gameState');
        gameStateref.on("value", function(data){
            gameState = data.val();
        })
    }
    update(state){
        database.ref('/').update({gameState:state});

    }
    async start(){
        if(gameState === 0 ){
            player = new Player();
            var playerCountref = await database.ref('playerCount').once("value");
            if (playerCountref.exists()){
                playerCount = playerCountref.val();
                player.getCount();
            }
            
            form = new Form();
            form.display();
        }

        c1 = createSprite(100, 200);
        c2 = createSprite(300, 200);
        c3 = createSprite(500, 200); 
        c4 = createSprite(700, 200);

        cars = [c1, c2, c3, c4];
    }

    play(){
        form.hide();
        textSize (30);
        text("Game Starts", 120,100);
        Player.getPlayerInfo();
        if(allPlayers!==undefined){
           // var displayPosition = 130;
           var index = 0;
           var x = 0;
           var y;
           
            for(var plr in allPlayers){
                index = index + 1;
                x = x + 200;
                y = displayHeight - allPlayers[plr].distance;
                cars[index - 1].x = x;
                cars[index - 1].y = y;
                /*
                if (plr === "player" + player.index)
                fill("red");
                else
                fill("black");
                displayPosition = displayPosition + 20 ;
                textSize(20);
                text(allPlayers[plr].name+":"+allPlayers[plr].distance, 120, displayPosition)
                */
               if(index === player.index){
                   cars [index - 1].shapeColor = "red";

                   camera.position.x = displayWidth/2;
                   camera.position.y = cars[index-1].y;
               }

            }

            drawSprites();


        }
        if (keyIsDown (UP_ARROW) && player.index!== null){
            player.distance+=50;
            player.update();

        }
    }

    

}