var config={
   type: Phaser.AUTO,
   width:800,
   height:600,
   scene:{

    preload:preload,// chargement des données 
    create:create,// affichage des données
    update:update,// durée de vie 
   },
   physics:{// ajout de la physique chtte libre
     default:"arcade",
     arcade:{
     debug:true,
     gravity:{y:500}	
     }

   }

}

var game =new Phaser.Game(config);
var cursor;
var player;
function preload()
{
  this.load.image( "joueur","image/stand-2.png");
  this.load.image("background","image/background-2.png");
  this.load.image("run1","image/player_03.png");
  this.load.image("run2","image/player_04.png");
  this.load.image("ground","image/ground-2.png");
  this.load.image("ground","image/ground-2.png");
  this.load.image("droite1run1","image/player_droite-2.png");
  this.load.image("droite2run2","image/player_droite-1.png");
} 

function create(){
 cursor=this.input.keyboard.createCursorKeys();// flèche directionnel
  this.anims.create({
  key:"player001",
  frames:[
    
    {key : "run1"},
    { key: "run2"},

  ],
  frameRate:5,
  repeat:-1// rpetition


})
  
   this.anims.create({
     key:"playerrundroite",
      frames:[
    
    {key : "droite1run1"},
    { key: "droite1run2"},

     ],
  frameRate:10,
  repeat:-1// rpetition

})
   
   var plateforme=this.physics.add.staticGroup() ;
   var backgroundImage= this.add.sprite(0,0,"background") ;
     player= this.physics.add.sprite(100,100,"joueur"); 
   backgroundImage.setOrigin(0,0);
   player.anims.play("player001");
   var sol1=this.add.sprite(200,500,"ground");
   var sol2=this.add.sprite(600,400,"ground");
    player.body.setSize(100,100);/// regler le carré  rose sur la tete du joueur
   plateforme.add(sol1);
   plateforme.add(sol2);
   this.physics.add.collider(plateforme,player)// peronnage tombe sur la plateforme
  //backgroundImage.setScale(0.8);
  //backgroundImage.setPosition(config.width/2,config.height/2);
}

 function update(time,delta)

 {
    if(cursor.left.isDown)// Utilisation du curseur à gauche
    {
     player.setVelocityX(-200);//  velocity deplacement du personnage vrs la gauche 
     player.anims.play("playerrundroite",true);
     player.setFlip(true,false);
    }
   
    if(cursor.right.isDown)// utilisation du curseur à droite//
    {
     player.setVelocityX(200);//  Velocity deplacement du personnage vrs la droite  
     player.anims.play("playerrundroite");
     player.setFlip(false,false);
     //player.setFlip(false,false);
    }
   if(cursor.left.isUp && cursor.right.isUp)  // Si on relahe le urseur le joueur arrete de courir
    {
      player.setVelocityX(0); // si on arrete de se deplacer velocity de x=0
      player.setTexture("droite1run1");
    }
 }


