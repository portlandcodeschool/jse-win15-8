var MemoryCards = (function() {

	//card values (each card is a pair, array [name,num]) :
	var cards = [['Star Trek Original',1],['Spock',1],
					['Next Generation',2],['Data',2],
					['DS 9',3],['Quark',3],
					['Voyager',4],['Neelix',4],
					['Enterprise',5],['Archer',5],
					['Animated Series',6],['Cartoon guy',6] ];

	

	function Ctor() {		// compaire val of position 1, display val of position 0
		this.values = function() {
			return cards.slice();
		};
		this.match = function(pair1,pair2) { 
		if ((pair1[1] !==pair2[1])) {
			console.log("no match");
		}; //each pair is [name,num] 
			return (pair1[1]===pair2[1]); // check if num matches
		};
		this.display = function(val) { //val is pair [name,num]
			return val[1];  //display just the animal name
		};
		
	}

	return Ctor;

})();
