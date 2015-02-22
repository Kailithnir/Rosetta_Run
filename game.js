window.onload = function()
{
	// Game area dimensions; lane properties
	var GAME_WIDTH = 400, GAME_HEIGHT = 600;
	var NUM_LANES = 5, LANE_MARGIN = 5;
	var LANE_WIDTH = GAME_WIDTH / NUM_LANES;
	
	// The maximum number of lanes allowed to be filled by a wave of enemies
	var MAX_LANE_FILL = 4;
	
	// Player and enemy dimensions
	var PLAYER_SIZE = 64;
	var ENEMY_SIZE_SMALL = LANE_WIDTH - (2 * LANE_MARGIN);
	var ENEMY_SIZE_LARGE = (2 * LANE_WIDTH) - (2 * LANE_MARGIN);
	
	var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, "",
		{preload: preload, create: create, update: update});
	
	var player, enemies;
	var lanes = [0, 0, 0, 0, 0, 0];
	var gameSpeed = 1, maxSpeed = 10;
	
	/*
	 * Returns whether the given sprite is large enough to occupy two lanes.
	 */
	function isLargeEnemy(spr)
	{
		return spr.width >= ENEMY_SIZE_LARGE;
	}
	
	/*
	 * Spawns the enemy of the given name in the given lane. The first lane is
	 * numbered one; however, large enemies can be spawned in lane zero, placing
	 * them halfway off the left edge of the screen. Similarly, spawning them in
	 * the last lane will place them halfway off the right edge.
	 */
	function spawnEnemy(name, lane)
	{
		var enemy = enemies.create(LANE_MARGIN + ((lane - 1) * LANE_WIDTH), -2 * LANE_WIDTH, name);
		game.physics.arcade.enable(enemy);
		enemy.body.gravity.y = gameSpeed + (Math.random() - 0.5);
		
		lanes[lane] = true;
		if(enemy.width >= ENEMY_SIZE_LARGE && lane < NUM_LANES - 1)
			lanes[lane + 1] = true;
	}
	
	function preload()
	{
		game.load.image("player", "assets/Temp_Player.png");
		game.load.image("smallEnemy", "assets/Temp_Small.png");
		game.load.image("largeEnemy", "assets/Temp_Large.png");
	}
	
	function create()
	{
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		player = game.add.sprite((game.width / 2) - (PLAYER_SIZE / 2), game.height - PLAYER_SIZE,
			"player");
		enemies = game.add.group();
		
		spawnEnemy("largeEnemy", 0);
		spawnEnemy("smallEnemy", 2);
	}
	
	function update()
	{
		for(var e in enemies)
		{
			if(e.y > game.height) e.kill();
		}
	}
}
