
var cards,game,gui; //global vars make debugging easier
function go() {
	// set global vars:
	cards = new MemoryCards();//<--maybe add argument for some card sets
	game  = new MemoryGame(cards);
	gui   = new MemoryGUI('memorygame',game); // id="memorygame" in html, where the game goes
	game.gui(gui); // link game to gui
}

window.addEventListener("load",go);
