// See cardset-example.js for examples

var MemoryCards = (function() {

	// card values (each card is a pair, array [name,num]) :
	var animals = [	['dog',1],['puppy',1],
					['cat',2],['kitten',2],
					['frog',3],['tadpole',3],
					['bird',4],['chick',4],
					['pig',5],['piglet',5],
					['deer',6],['fawn',6],
					['bear',7],['cub',7] ];

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