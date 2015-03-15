var MemoryCards = (function() {

	// card values (each card is a pair, array [name,num]) :
	function Ctor() {
	
	var cards = [	['card01',1],['card02',1],
					['card03',2],['card04',2],
					['card05',3],['card06',3],
					['card07',4],['card08',4],
					['card09',5],['card10',5],
					['card11',6],['card12',6],
					['card13',7],['card14',7],
					['card15',8],['card16',8],
					['card17',9],['card18',9] ];

	
		this.values = function() {
			return cards.slice();
		};
		this.match = function(pair1,pair2) {  //each pair is [name,num] 
			return (pair1[1]===pair2[1]); // check if num matches
			console.log("match has been called");
		};
		this.display = function(val) { //val is pair [name,num]
			return val[0];  //display just the animal name
		};
		//this.showArray = function() { // shows cards array
			//console.log(cards); // shows cards array
		//};
		
		//this.arraySize = function() { // shows cards array
			//return cards.length;
		//};
	}

	return Ctor;

})();