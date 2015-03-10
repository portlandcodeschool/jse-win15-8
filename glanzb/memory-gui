var MemoryGUI = (function () {

	//...

	function GuiCtor(container,game) {

		var game = game;
		
		if (typeof container === 'string') {
			container = document.getElementById('container');
		}
		this.el = function() {
			return container;
		}

		// public instance methods:
		
		this.reset = function() {		// reset method of the gui constructor, property
			  render(); 
			  game.reset();
		}
		this.show = function(where,what) {	// the gui recieves the where and what, trusts the sorce
			var currentCard = document.getElementById(where);	// gets the id from the memory game
			// alert(what);
			currentCard.classList.add('face-up');
			currentCard.classList.remove('face-down');
			currentCard.innerHTML = "<img src='img/" + what + "-star.jpeg' class='face-up'>";
			// game.lift value , lift knows the place and value

		}

		this.removeSoon = function(whereArr) {// gets the array from lift
			window.setTimeout(function() {
				var card01 = document.getElementById(whereArr[0]);
				var card02 = document.getElementById(whereArr[1]);
				console.log(whereArr);
				card01.classList.add('matched');
				card02.classList.add('matched');
			}, 1000);
		}
		this.hideSoon = function(whereArr) {
				window.setTimeout(function() {
				var card01 = document.getElementById(whereArr[0]);
				var card02 = document.getElementById(whereArr[1]);
				card01.classList.add('face-down');
				card02.classList.add('face-down');
				card01.innerHTML = ""
				card02.innerHTML = ""
			}, 1000);
		}
		function clicked(){
			console.log(this.id);
			game.lift(parseInt(this.id));
			// show(parseInt(this.id),game.valueAt(parseInt(this.id)));
			

		}


		var containerReset = this.reset;
		var listItem;
		// Do some initial setup and rendering...
		function render() {
			var container = document.getElementById('memorygame');
			container.innerHTML = ' ';

			var grid = document.createElement('ul');
			for (var i = 0; i < game.size(); ++i) {
				listItem = document.createElement('li');
				grid.appendChild(listItem);
				listItem.setAttribute('id',i)
				listItem.onclick = clicked;
				listItem.classList.add('face-down')

				
			}

			container.appendChild(grid);
				if (document.getElementById('footer') == undefined) {
					var footer = document.createElement('footer');
					container.appendChild(footer)
					// document.getElementById('footer');
					var button = document.createElement('button');
					var text = document.createTextNode("Reset");       
		            button.appendChild(text);                                
		            footer.appendChild(button);	
					} else {
						return;
					}
		
            button.onclick = containerReset;
		}
		render();
	}

	return GuiCtor;
})();
// has to be generic

