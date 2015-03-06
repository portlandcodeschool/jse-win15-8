var MemoryGame = (function() {

	function GameCtor(cardset) {

		var slots, //values of shuffled cards;
				//sparse array: elements are deleted as cards are removed
			length, //total slots, including gaps
			picked, //position of face-up card if any, or false
			_gui = null;

		// Helper functions which need access to closure vars;
		//  some fns will be made public as instance methods:
		var reset = function() {
			slots = cardset.values();
			length = slots.length;
			picked = false;
			shuffle(slots);
		}
		reset(); // reset now as part of init'ing

		var gui = function() {// accessor fn
			if (arguments.length === 0) 
				return _gui; // getter
			_gui = arguments[0]; // setter
		}

		var size = function() {
			return length;
		};

		var remainsAt = function(where) {//--> boolean
			return slots[where]!==undefined;
		};
		var valueAt = function(where) {//--> card val
			return slots[where];
		};
		var removeAt = function(where) {
			delete slots[where]; // removes faceup card so lift doesn't call it again
		};
		var faceupValue = function() {//--> card val
			return valueAt(picked);
		};
		var faceupWhere = function() {//--> integer
			return picked;
		};
		var remaining = function() {//--> array of integers
			return Object.keys(slots).map(Number);
		};

		var lift = function(pick) {//--> display string
			if (!isValid(pick,length)) return false;
			if (!remainsAt(pick)) return false;
			if (picked===pick) return false;

			// must be a face-down card here; proceed...
			var valPick = valueAt(pick);
				displayPick = cardset.display(valPick);
			if (picked === false) {
				// no current face-up
				picked = pick; //turn pick face-up
			} else {
				// check match with face-up
				if (cardset.match(valPick,valueAt(picked))) {
					// match; remove both:
					removeAt(pick);
					removeAt(picked);
					if (_gui)
						_gui.removeSoon([pick,picked]);
				} else {
					if (_gui)
						_gui.hideSoon([pick,picked]);
				}
				//either way, turn face-up to face-down:
				picked = false;
			}
			if (_gui)
				_gui.show(pick,displayPick);
			return displayPick; 
		};

		// Make some functions public as instance methods:
		this.reset = reset;
		this.lift = lift;
		this.faceupValue = faceupValue;
		this.faceupWhere = faceupWhere;
		this.remaining = remaining;
		this.gui = gui;
		this.size = size;
	} // end constructor

	// Private Functions shared by all boards:
	// these could be placed inside ctor,
	// but then they would be rebuilt for each instance
	function isValid(where,length) {
			return (typeof where === 'number')
				&& (where%1 === 0)
				&& (where>=0)
				&& (where<length);
		}

	function shuffle(array) {
	// Knuth-Fisher-Yates, modified from http://bost.ocks.org/mike/shuffle/
		var end = array.length, temp, i;
  			// While picked remain elements to shuffle…
		while (end>1) {
   			// Pick a remaining element…
   			i = Math.floor(Math.random() * end--);
   			// And swap it with the current element.
   			temp = array[end];
   			array[end] = array[i];
		    array[i] = temp;
 		}
	}

	return GameCtor;
})();
