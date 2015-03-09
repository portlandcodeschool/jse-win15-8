var MemoryGame = (function() {

	function Ctor(cardset) {
		var slots, //values of shuffled cards;
				//sparse array: will have elements deleted as cards are removed
			length,//total slots, including gaps
			there; //position of face-up card if any, or false

		// Helper functions which need access to closure vars;
		//  some fns will be made public as instance methods:
		var reset = function() {	// private methods
			slots = cardset.values();
			length = slots.length;
			there = false;
			shuffle(slots);
		}
		reset();// reset now as part of init'ing

		var size = function(){ 
			return slots.length;
		}
		var _gui = null; //private variable
		var gui = function(useGui) {
			if (useGui === undefined) //no parameter; act as getter:
			return _gui;
			// else act as setter:
			_gui = useGui;
		}

		var remainsAt = function(where) {//--> boolean
			return slots[where]!==undefined;
		}
		var valueAt = function(where) {//--> card val
			return slots[where];
		}
		var removeAt = function(where) {
			delete slots[where];		// removes the key of the array ie: delete a[b]
		}
		var faceupValue = function() {//--> card val
			return valueAt(there);
		}
		var faceupWhere = function() {//--> integer
			return there;
		}
		var remaining = function() {//--> array of integers
			return Object.keys(slots).map(Number);	// looks up the keys of the array, leaves the empty slots out, string. Number is a predefined function, with map(Number) the strings will be converted into numbers (the array keys). Number is being used as a callback for map.
		}

		var lift = function(here) {//--> display string, look up the value of card
			if (!isValid(here,length)) return false;	// can't lift at -7 
			if (!remainsAt(here)) return false;		// is there still a card at that position?
			if (there===here) return false;		// cant tur a card face up if it's already up. here and there are the 2 positions of the faceup

			// must be a face-down card here; proceed...
			
			var valHere = valueAt(here);		// look at the card we have just lifted
			var what = cardset.display(valHere);	
			if (there === false) {
				// no current face-up
				there = here; //turn here face-up
			} else {
				// check match with face-up
				if (cardset.match(valHere,valueAt(there))) {
					// match; remove both:
					removeAt(here);
					removeAt(there);
					if (_gui)
						_gui.removeSoon([here,there]);
					//optional: report match
					console.log("Match!")
				} else {
					if (_gui)
						_gui.hideSoon([here,there]);
				}
				//either way, turn face-up to face-down:
				there = false;
			}
			if (_gui)
				_gui.show(here,what);

			
			// _gui.show(here,what);
			return what; 
		}

		// Make some functions public as instance methods:
		this.reset = reset;
		this.lift = lift;
		this.faceupValue = faceupValue;
		this.faceupWhere = faceupWhere;
		this.valueAt = valueAt;
		this.remaining = remaining;
		this.gui = gui;
		this.size = size;
	}//end ctor

	// Private Functions shared by all boards:
	// these could be placed inside ctor,
	// but then they would be rebuilt for each instance
	function isValid(where,length) {
			return (typeof where === 'number')
				&& (where%1 === 0)
				&& (where>=0)
				&& (where<length)
		}

	function shuffle(array) {
	// Knuth-Fisher-Yates, modified from http://bost.ocks.org/mike/shuffle/
		var end = array.length, temp, i;
  			// While there remain elements to shuffle…
		while (end>1) {
   			// Pick a remaining element…
   			i = Math.floor(Math.random() * end--);
   			// And swap it with the current element.
   			temp = array[end];
   			array[end] = array[i];
		    array[i] = temp;
 		}
	}

	return Ctor;
})();



//PLAY
// game2.lift(2)
// game2.faceupValue()
// game2.faceupWhere()


// var MemoryGame = (function() {
// 	function Game(cardset) {
// 		//...array holding card values
// 		this.cards = cardset.values();

// 		this.cards.shuffle();
// 		this.facedowns = [];		// array to see if it's up or down
// 		for (var i=0; i<this.cards.length; i++){
// 			this.facedowns.push(1)	// 1 means card is there and it"s face down
// 		}
		
// 		// where = function(){

// 		// }

// 		remaining = function{
// 			var where = [];
// 			for (var i=0; i<this.cards.length; i++){
// 				if (this.facedowns[i] === 1){	// wherever the value is one, so it's face down
// 					where.push(i)		// new array, put the position in it.
// 				}						// this facedown is a property, not var, has to be prefixed with an object
// 			}
// 			return where;
// 		}




// 		this.reset = function() {

// 		}
// 		this.faceupWhere = function() {

// 		}
// 		this.faceupValue = function() {

// 		}
// 		this.remaining = function() {

// 		}
// 		this.lift = function() {

// 		}

// 	}
// 	//...

// 	return Ctor;
// })();

// var cardset = new MemoryCards(); // run the MemoryCards cunstructor in the other file to create the cardset
// var game = new MemoryGame(cardset)


