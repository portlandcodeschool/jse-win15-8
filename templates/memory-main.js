var cards,game,gui; //global vars make debugging easier
function go() {
	// set global vars:
	cards = new MemoryCards(18);//<--maybe add argument for some card sets
	game  = new MemoryGame(cards);
	gui   = new MemoryGUI('memorygame',game);
	//game.gui(gui); // moved within MemoryGUI
}

window.addEventListener("load",go);
// Or with JQ:
//$(go);