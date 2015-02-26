
// ----Example set 1:----

var FoodCards = (function() {
	// card values:
	var food = ['apple','artichoke','banana','blueberry','carrot','cranberry'];

	function Ctor() {
		this.values = function() {
			return food.slice(); //return copy of values
		};
		this.match = function(str1,str2) {
			return str1[0]===str2[0]; //match if same initial letter
		};
		this.display = function(val) {
			return val; //display value is just card val
		};
	}

	return Ctor;

})();


// ----Example set 2:----

var AnimalCards = (function() {

	// card values (each card is a pair, array [name,num]) :
	var animals = [	['dog',1],['puppy',1],
					['cat',2],['kitten',2],
					['frog',3],['tadpole',3],
					['bird',4],['chick',4] ];

	function Ctor() {
		this.values = function() {
			return animals.slice();
		};
		this.match = function(pair1,pair2) {  //each pair is [name,num] 
			return (pair1[1]===pair2[1]); // check if num matches
		};
		this.display = function(val) { //val is pair [name,num]
			return val[0];  //display just the animal name
		};
	}

	return Ctor;

})();

// ----Example set 3:----

var AlphabetCards = (function() {
	// produces pairs 'a'=='A','b'=='B',...
	var alphabet = ' abcdefghijklmnopqrstuvwxyz';

	function Ctor(numPairs) { //numPairs is optional; defaults to 26
		if (numPairs < 1) numPairs = 1;
		if (!numPairs || (numPairs > 26)) numPairs = 26;

		// Generate subset of alphabet in pairs:
		var _values = []; //private array
		while (numPairs) {
			_values.push(alphabet[numPairs]); //'a'...
			_values.push(alphabet[numPairs].toUpperCase());//'A'...
			--numPairs;
		}

		// Instance methods:
		this.values = function() {
			return _values.slice();
		}
		this.match = function(a,b) {
			return a.toUpperCase() == b.toUpperCase();
		}
		this.display = function(val) {
			return val;
		}
	}

	return Ctor;

})();

var Card = (function(){

	// Ctor:
	function Card(id) {
		this.id = function () {
			return id;
		}
	}

	function isInt(n) { return ((n%1 === 0) && (typeof n === 'number')); }
    function inRange(n,a,z) { return ((n >= a) && (n <= z));}
    
	// Instance methods (attach these to Card's prototype):

    Card.prototype.rank = function() {
        return Math.floor(this.id() / 4) + 1;
    }

    Card.prototype.suit = function() {
        return (this.id() % 4) + 1;
    }

    Card.prototype.color = function() { // -->"red,"black",NaN
        var b = Math.floor(((this.id() / 2) % 2));
        return b?'black':'red';
    }

    Card.prototype.cardName = function() { //--> string, NaN
        return this.constructor.rankNames()[this.rank() - 1] + ' of ' + this.constructor.suitNames()[this.suit() - 1];
    }

    Card.prototype.isValid = function () {

    	return ((inRange(this.id(),0,(this.constructor.numCards() - 1))) && (isInt(this.id())));
    }



	// Private data:
	var rankNames = ["Ace","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Jack","Queen","King"];
	var suitNames = ["Hearts", "Diamonds", "Spades", "Clubs"];


	var fullSet = [];
	for (var i = 0; i < 52; i++) { fullSet.push(new Card(i)); }
	// loop to fill fullSet with 52 instances...


	// Class methods:

	Card.isCard = function(thing) {// return Boolean
		return ((thing instanceof Card) && thing.isValid());
		//...
	}

	Card.fullSet = function() {//return copy of private array
		return fullSet.slice(); 
	}

	Card.rankNames = function() {
		return rankNames.slice(); 
	}

	Card.suitNames = function() {
		return suitNames.slice();
	}

	Card.numCards = function() {
		return 52;
	}


	// Return constructor:
	return Card;

})(); //end superclass IIFE