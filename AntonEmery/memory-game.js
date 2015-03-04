//Questions
//cards from a previous turn count as matches
//after a match all other cards give this error Uncaught TypeError: Cannot read property '1' of undefined


var MemoryGame = (function() {

	function Ctor(cardset) {
		var slots, //values of shuffled cards;
				//sparse array: will have elements deleted as cards are removed
			length,//total slots, including gaps
			there; //position of face-up card if any, or false

		// Helper functions which need access to closure vars;
		//  some fns will be made public as instance methods:
		var reset = function() {
			slots = cardset.values(); //returns new array iterator object that contains values for each index in the array
			length = slots.length;
			there = false;
			shuffle(slots);
		}
		reset();// reset now as part of init'ing

		var remainsAt = function(where) {//--> boolean returns slots with cards in them
			return slots[where]!==undefined;
		}
		var valueAt = function(where) {//--> card val at indicated array location
			return slots[where];
		}
		var removeAt = function(where) { //deletes slots at array location
			delete slots[where];
		}
		var faceupValue = function() {//--> returns face up card val
			return valueAt(there);
		}
		var faceupWhere = function() {//--> integer, position of face up card
			return there;
		}
		var remaining = function() {//--> array of integers
			return Object.keys(slots).map(Number);
		}

		
		// New methods:
		var _gui = null; //private variable

		
		//	game.gui(gui); // link game to gui  ??? calling a method which is a setter method. method of game instance
		var gui = function(useGui) {
			if (useGui === undefined){ //no parameter; act as getter:
				return _gui;
			} else {// else act as setter:
				_gui = useGui;
			}
		}

		var size = function() {  // getter function returns total number of cards in current game
		return slots.length;
		}  

		

		var lift = function(here) {//--> display string  id of card
			if (!isValid(here,length)) return false;  //id of card, total cards, including gaps
			if (!remainsAt(here)) return false; //if there is not a card at the current location
			if (there===here) return false; //if faceup card is equal to current hard
			// must be a face-down card here; proceed...
			_gui.show(here, valueAt(here)); //id of card, animal name, numerical value
			
			var valHere = valueAt(here); //current card [name, num]
			//console.log(valHere);
			if (there === false) {  //card is not face up
				// no current face-up
				there = here; //turn here face-up
			} else {
				// check match with face-up
				if (cardset.match(valHere, valueAt(there))) { //if current card value matches other face up card

					$('ul').after('<p>' + 'Match!' + '</p>');

					// match; remove both:
					removeAt(here);
					removeAt(there);

					

					//remove class from DOM
					_gui.removeSoon([here, there]);

					//optional: report match
					console.log("Match!");

					there = false;

				} else {
					//either way, turn face-up to face-down:
					//there = false;  //only second card is going face down
					_gui.hideSoon([here, there]);
					
					there = false;

				}
			}
			return cardset.display(valHere); 
		}

		// Make some functions public as instance methods:
		this.reset = reset;
		this.lift = lift;
		this.faceupValue = faceupValue;
		this.faceupWhere = faceupWhere;
		this.remaining = remaining;
		this.gui = gui;
		this.size = size;
		this.valueAt = valueAt;

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


