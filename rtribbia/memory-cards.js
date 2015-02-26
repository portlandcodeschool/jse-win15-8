var MemoryCards = (function() {
	function Ctor(cards) {
		//...
		var array = cards;
		this.values = function() {
			return array.slice();

		}

		this.match = function(a,b) {
			var x = array[a].rank() + '' + array[a].color();
			var y = array[b].rank() + '' + array[b].color();
			//console.log(x + ': ' + array[a].cardName());
			//console.log(y + ': ' + array[b].cardName());
			return x === y;

		}

		this.display = function(val) {
			return array[val].cardName();
		}

		this.len = function() {
			return array.length;
		}
	}
	//...

	return Ctor;
})();

