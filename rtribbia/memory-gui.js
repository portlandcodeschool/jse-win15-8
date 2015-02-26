var MemoryGUI = (function () {


	function GuiCtor(container,game) {
		var cont;
		if (container instanceof HTMLElement) {
			cont = container;
		} else if ((typeof container) == "string") {
			cont = document.getElementById(container);
		} else { return {}};

		// public instance methods:
		function reset() {
			//...
			while (cont.firstChild) { //from stack overflow- clear DOM
    			cont.removeChild(cont.firstChild);
			}
			game.reset(); //reset game state
			renderBoard(); //re-render board
			alert('board has been reset!');
		}
		function show(id) { //only need one parameter because board[id] and td =id  are the same in the way I ended up implementing it
			//...
			var target = document.getElementById(id);
			target.innerHTML = "";
			var img = document.createElement('img');
	        src = 'images/SVG-cards-1.3/' + game.getImg(id) + '.svg';
	        img.src = src;
	        img.setAttribute('width',65);
	        target.innerHTML = ""
	        target.appendChild(img);
		}

		function removeSoon(whereArr) {
			//...
			window.setTimeout(function() {
				whereArr.forEach(function(x){
					document.getElementById(x).classList.toggle('invisible');
				});
			}, 1000);
		}
		function hideSoon(whereArr) {
			//...
			window.setTimeout(function() {
				whereArr.forEach(function(x){
					document.getElementById(x).innerHTML = "";
					document.getElementById(x).appendChild(renderCard_back());
				});
			}, 1000);			
		}
		function lift(evt) {
			var result = game.lift(this.id); //[match?, where, last faceup card (if any)]
			if (result[0] == 'match') {
				console.log('Match! - Making these invisible!\nnew:' + this.id + '\nold:' + result[2]);
				show(this.id);
				removeSoon([result[2],this.id]); //[old, new]
				if (game.remaining().length == 0) { //Check if this is last match
					alert('you won!!!!');
					reset();
				}
			} else if (result[0] == 'no match') {
				//console.log('No match! - Facing these cards down\nnew:' + this.id + '\nold:' + result[2]);
				console.log('No match! running this code: \n\n var hideThese = [' + this.id + ', ' + result[2] + ']\nhideSoon(hideThese);')
				show(this.id);
				hideSoon([result[2],this.id]); //[old, new]
			} else if (result !== false) {
				show(this.id);
			}
		}

    	
    	function renderCard_back() {
    		var img = document.createElement('img');
    		src = 'images/SVG-cards-1.3/facedown.jpg'
    		img.src = src;
    		img.setAttribute('width',65);
    		return img;
    	}

		function renderBoard() {
			
			//var table = document.createElement('table');
			var total = game.size();
			var numcols = Math.ceil(total/Math.floor(Math.sqrt(total)));
			var numrows = Math.ceil(total/numcols);

			var counter = 0;

			var table = document.createElement('table');

			for (var r = 0; r < numrows; r++) {
				var tr = document.createElement('tr');
				for (var c = 0; c < numcols; c++) {
					if (counter >= total) { c = numcols; break; }
					var td = document.createElement('td');
					var id = counter;
					td.setAttribute('id',id);
					td.classList.add('cell');
					td.appendChild(renderCard_back());
					td.onclick = lift;
					tr.appendChild(td);
					counter++;
				}
				table.appendChild(tr);
			}
			cont.appendChild(table);
		}
		// Do some initial setup and rendering...

		this.renderBoard = renderBoard;
		this.renderCard_back = renderCard_back;
		this.reset = reset;
		this.show = show;
		this.removeSoon = removeSoon;
		this.hideSoon = hideSoon;

		document.getElementById('reset').onclick = reset;
		renderBoard();
	}


	return GuiCtor;
})();
