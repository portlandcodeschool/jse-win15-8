var MemoryGame = (function() {
	function Ctor(cardset) {
		//...

		//var cardset = new MemoryCards(cardset);

		var board = []; 
		var faceup = null;
		var gui = {};

		for (var i = 0; i < cardset.len(); i++) {
			board.push([i,0,0]); //[cardset.index, faceup, removed] = states are ONLY tracked here in entire game.
		}

		this.size = function() {
			return board.length;
		}

		this.values = function() {
			return board.slice();
		}

		this.gui = function(useGui) {
			if (useGui === undefined) {
				return gui;
			}
			else if (typeof useGui === "object") {
				gui = useGui;
			}
		}

		this.reset = function() {
			board.forEach(function (x){ x[1] = x[2] = 0;});
			faceup = null;
			shuffle();
		}

		this.faceupWhere = function() {
			// var r = false;
			// for (var i = 0; i < board.length; i++) {
			// 	if (board[i][1]) { r = i; break; }
			// }
			return (faceup == null)?false:faceup;

		}
		this.faceupValue = function() {
			var loc = this.faceupWhere();
			if (loc) { return cardset.display(board[loc][0]); }
		}
		this.remaining = function() {
			var arr = [];
			board.forEach(function (x,i) {
				if (!(x[2])) { arr.push(i) };
			});
			return arr;
		}

		this.getImg = function(index) {
			var current_card = cardset.values()[board[index][0]].cardName().toLowerCase();
			var card_name = current_card.replace('one','1').replace('two','2').replace('three','3').replace('four','4').replace('five','5').replace('six','6').replace('seven','7').replace('eight','8').replace('nine','9').replace('ten','10').replace(/ /g,'_');
			return card_name;
		}

		this.lift = function(where) {
			if ((board[where][1] == 0) && (board[where][2] == 0)) {
				if (faceup == null) {
					faceup = where;
					board[where][1] = 1;
					return [cardset.display(board[where][0]),where,null];
				} else {
					var match = cardset.match(board[where][0],board[faceup][0]);
					if (match) {
						board[faceup][1] = 0;
						board[where][1] = 0;
						board[faceup][2] = 1;
						board[where][2] = 1;
						var result = ['match',where,faceup];
						faceup = null;
						return result; //match
					} else {
						board[where][1] = 0;
						board[faceup][1] = 0;
						var result = ['no match',where,faceup];
						faceup = null;
						return  result; //no match
					}

				}
			} else {
				return false;
			}	
		}

		this.showCards = function () {
			board.forEach(function (x,i) {
				console.log(i + ': (f:' + x[1] + ') (r:' + x[2] + ') - ' + cardset.values()[x[0]].cardName() + ' - cardset[' + x[0] +']');

			});

		}

		function shuffle() {
			var m = board.length, t, i;
			// While there remain elements to shuffle…
			while (m) {

				// Pick a remaining element…
				i = Math.floor(Math.random() * m--);

				// And swap it with the current element.
				t = board[m];
				board[m] = board[i];
				board[i] = t;
			}
		}

	}
	//...

	return Ctor;
})();

//var game = new MemoryGame(Card.fullSet());