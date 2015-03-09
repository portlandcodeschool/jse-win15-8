// See cardset-example.js for examples

var MemoryCards = (function() {

	// card values (each card is a pair, array [name,num]) :
	var animals = [	['tueffel',1],['tueffel',1],
					['320',2],['320',2],
					['220A',3],['220A',3],
					['jem',4],['jem',4],
					['400',5],['400',5],
					['js100',6],['js100',6],
					['explorer',7],['explorer',7],
					['flyingv', 8],['flyingv', 8] ];

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