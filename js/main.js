var game = new Phaser.Game(1000, 1000, Phaser.CANVAS, '', {preload: preload, create: create, update: update, render: render});

function preload()
{
	game.load.image('hp', 'assets/img/firstaid.png');
	game.load.spritesheet('player', 'assets/img/tPlayer.png', 100, 100);
	
	//game.load.tilemap('map', 'assets/tilemaps/base.csv');
	game.load.tilemap('map', 'assets/tilemaps/lvl1p1..json', null, Phaser.Tilemap.TILED_JSON);
	game.load.tilemap('mapQ2', 'assets/tilemaps/room1p2.csv')
	game.load.image('ground', 'assets/tilemaps/sGBlock.png');
}

var player;
var facing = 'left';
var jumpTimer = 0;
var cursors;
var jumpBotton;
var bg;
var map;
var map2
var layer;

function create()
{
	map = game.add.tilemap('map');
	
	map.addTilesetImage('small', 'ground');
	
	map.setCollisionBetween(0, 100);
	
	// map2 = game.add.tilemap('mapQ2', 100, 100);
	
	// map2.addTilesetImage('ground');
	
	// map2.setCollisionBetween(0, 100);
	
	layer = map.createLayer('map');
	
	
	layer.resizeWorld();
	
	//layer.debug = true;
	
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	//game.world.setBounds(0,0,750,750);
	game.add.sprite(500,500, 'hp');
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.gravity.y = 300;
	
	player = game.add.sprite(100, 100, 'player');
	game.physics.enable(player, Phaser.Physics.ARCADE);
	
	player.enableBody = true;
	
	player.body.collideWorldBounds =  true;
	//player.physicsBodyType = Phaser.Physics.ARCADE;
	cursors = game.input.keyboard.createCursorKeys();
	
	player.body.gravity.y = 300;
	player.body.maxVelocity.y = 500;
	player.body.setSize(20,32,5,16);

	player.body.setSize(100, 100, 0, 0);

	player.body.collideWorldBounds = true;
	//jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
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
		jumpTimer = game.time.now + 750;
	}
	//End player movement
	//*********************************************
}

function render()
{
	game.debug.body(player);
}