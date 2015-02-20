window.onload = function()
{
	var GAME_WIDTH = 400, GAME_HEIGHT = 600;
	var NUM_LANES = 5, LANE_MARGIN = 5;
	var LANE_WIDTH = GAME_WIDTH / NUM_LANES;
	
	var PLAYER_SIZE = 64;
	var ENEMY_SIZE_SMALL = LANE_WIDTH - (2 * LANE_MARGIN);
	var ENEMY_SIZE_LARGE = (2 * LANE_WIDTH) - (2 * LANE_MARGIN);
	
	var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, "",
		{preload: preload, create: create, update: update});
	
	var player, enemies;
	var gameSpeed = 1, maxSpeed = 10;
	
	/*
	 * Spawns the enemy of the given name in the given lane. The first lane is
	 * numbered one; however, large enemies can be spawned in lane zero, placing
	 * them halfway off the left edge of the screen.
	 */
	function spawnEnemy(name, lane)
	{
		var x = LANE_MARGIN + ((lane - 1) * LANE_WIDTH);
		game.add.sprite(x, -(ENEMY_SIZE_LARGE), name);
	}
	
	function preload()
	{
		game.load.image("smallEnemy", "assets/Temp_Small.png");
		game.load.image("largeEnemy", "assets/Temp_Large.png");
	}
	
	function create()
	{
		game.add.sprite(LANE_MARGIN, 0, "smallEnemy");
		game.add.sprite((3 * LANE_MARGIN) + 70, 0, "largeEnemy");
	}
	
	function update()
	{
		
	}
}
