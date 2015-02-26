var MemoryCards = (function() {

	var comics = [{name: 'batman', role: 'hero', universe: 'dc'}, {name: 'superman', role:'hero', universe:'dc'}, 
	{name:'joker', role:'villain', universe:'dc'}, {name: 'lex luthor', role: 'villain', universe: 'dc'}, 
	{name: 'wolverine', role: 'hero', universe: 'marvel'}, {name: 'hulk', role: 'hero', universe: 'marvel'},
	{name: 'sabretooth', role: 'villain', universe: 'marvel'}, {name: 'general ross', role: 'villain', universe: 'marvel'}]

	function Ctor() {
		//...
		this.values = function() {
			return comics.slice();
		};

		this.match = function(a,b) {
			return ((a.role===b.role) && (a.universe===b.universe));

		};

		this.display = function(val) {
			return val.name;
			/*return this.values()[val].name;*/
			
		};

	};
		

	//...
	return Ctor;
})();


var heroesAndVillains = new MemoryCards();