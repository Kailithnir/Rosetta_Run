window.onload = function()
{
	// Game area dimensions; lane properties
	var GAME_WIDTH = 400, GAME_HEIGHT = 600;
	var NUM_LANES = 5, LANE_MARGIN = 5;
	var LANE_WIDTH = GAME_WIDTH / NUM_LANES;
	
	// Player and enemy dimensions
	var PLAYER_SIZE = 64;
	var ENEMY_SIZE_SMALL = LANE_WIDTH - (2 * LANE_MARGIN);
	var ENEMY_SIZE_LARGE = (2 * LANE_WIDTH) - (2 * LANE_MARGIN);
	
	// Game instance
	var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, "",
		{preload: preload, create: create, update: update});
	
	// Player and enemy references; enemy and sample sprite names
	var player, enemies;
	var enemySprites = ["smallEnemy", "largeEnemy"];
	var largeEnemies = ["largeEnemy"];
	var sampleSprites = [];
	
	// Current and maximum game speeds
	var gameSpeed = 10, maxSpeed = 50;
	
	/*
	 * Spawns the enemy of the given name in the given lane. The first lane is
	 * numbered one; however, large enemies can be spawned in lane zero, placing
	 * them halfway off the left edge of the screen. Similarly, spawning them in
	 * the last lane will place them halfway off the right edge. Returns a
	 * reference to the enemy spawned.
	 */
	function initEnemy(name, lane)
	{
		var enemy = game.add.sprite(LANE_MARGIN + ((lane - 1) * LANE_WIDTH), -2 * LANE_WIDTH, name);
		game.physics.arcade.enable(enemy);
		enemy.body.gravity.y = gameSpeed + (Math.random() - 0.5);
		return enemy;
	}
	
	/*
	 * Preloads all assets.
	 */
	function preload()
	{
		game.load.image("player", "assets/Temp_Player.png");
		game.load.image("smallEnemy", "assets/Temp_Small.png");
		game.load.image("largeEnemy", "assets/Temp_Large.png");
	}
	
	function create()
	{
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		player = game.add.sprite((game.width / 2) - (PLAYER_SIZE / 2), game.height - (2 * PLAYER_SIZE),
			"player");
		enemies = [];
		
		enemies.push(initEnemy("largeEnemy", 0));
		enemies.push(initEnemy("smallEnemy", 2));
	}
	
	function update()
	{
		if(gameSpeed < maxSpeed) gameSpeed += 0.001;
		
		for(var i = 0; i < enemies.length; i++)
		{
			if(enemies[i].y > game.height)
			{
				enemies[i].destroy();
				console.log(gameSpeed);
				
				var name = enemySprites[Math.floor(Math.random() * enemySprites.length)];
				var lane = (largeEnemies.indexOf(name) >= 0) ?
					Math.floor(Math.random() * (NUM_LANES + 1)) : Math.floor(Math.random() * NUM_LANES);
				enemies[i] = initEnemy(name, lane);
			}
		}
	}
}
