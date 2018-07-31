var game = new Phaser.Game(1000, 1000, Phaser.CANVAS, '', {preload: preload, create: create, update: update});

var mapPick;

function preload()
{
	mapPick = Math.floor(Math.random() * 9);
	game.load.spritesheet('player', 'assets/img/tPlayer.png', 100, 100);
	switch(mapPick)
	{
		case 0:
			game.load.tilemap('map', 'assets/tilemaps/base.csv');
			break;
		case 1:
			game.load.tilemap('map', 'assets/tilemaps/place1.csv');
			break;
		case 2:
			game.load.tilemap('map', 'assets/tilemaps/place3.csv');
			break;
		case 3:
			game.load.tilemap('map', 'assets/tilemaps/place4.csv');
			break;
		case 4:
			game.load.tilemap('map', 'assets/tilemaps/place5.csv');
			break;
		case 5:
			game.load.tilemap('map', 'assets/tilemaps/place6.csv');
			break;
		case 6:
			game.load.tilemap('map', 'assets/tilemaps/place7.csv');
			break;
		case 7:
			game.load.tilemap('map', 'assets/tilemaps/place8.csv');
	}
	game.load.image('ground', 'assets/tilemaps/ground block.png');
}

var player;
var facing = 'left';
var jumpTimer = 0;
var cursors;
var jumpBotton;
var map;
var layer;

function create()
{
	map = game.add.tilemap('map', 100, 100);
	
	map.addTilesetImage('ground');
	
	map.setCollisionBetween(0, 100);
	
	
	layer = map.createLayer(0);
	
	
	layer.resizeWorld();
	
	
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.gravity.y = 300;
	
	player = game.add.sprite(100, 100, 'player');
	game.physics.enable(player, Phaser.Physics.ARCADE);
	
	player.enableBody = true;
	
	cursors = game.input.keyboard.createCursorKeys();
	
	player.body.gravity.y = 300;
	player.body.maxVelocity.y = 500;
	player.body.setSize(20,32,5,16);

	player.body.setSize(100, 100, 0, 0);

	
	game.camera.follow(player);
}

function update()
{
	game.physics.arcade.collide(player, layer);
	
	//Player movement methods and if stmts
	//********************************************
	player.body.velocity.x = 0;
	if(player.body.x > 800)
	{
		player.body.velocity.x = 0;
	}
	
	if(cursors.left.isDown)
	{
		player.body.velocity.x = -450;
	}
	else if(cursors.right.isDown)
	{
		player.body.velocity.x = 450;
	}
	if(cursors.up.isDown && player.body.onFloor() && game.time.now > jumpTimer)
	{
		player.body.velocity.y = -6875;
		jumpTimer = game.time.now + 500;
	}
	//End player movement
	//*********************************************
}