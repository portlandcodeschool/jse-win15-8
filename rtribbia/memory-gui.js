var MemoryGUI = (function () {


	function GuiCtor(container,game) {
		var cont;
		

		if (container instanceof HTMLElement) {
			cont = container.id;
		} else if ((typeof container) == "string") {
			cont = container;
		} else { return {}};



		var mView = Backbone.View.extend({
			initialize: function() {
				this.gridview = new gView({id: '#board'});
				//this.el.appendChild(this.gridview.el);
				this.$el.append(this.gridview.$el);
				this.gridview.allCards_reset();
			},
			reset: function() {
				this.gridview.allCards_reset();
			}
		});

		var gView = Backbone.View.extend({
			initialize: function() {
				this.cardviews = [];
				for (var i = 0; i < game.size(); i++) {
					var card = new cView({id: '#' + i});
					this.cardviews.push(card);
					this.$el.append(card.$el);
				}
			}, 
			allCards_reset: function() {
				this.cardviews.forEach(function (x){
					x.reset();
				});
			}
		});

		var cView = Backbone.View.extend({
			initialize: function() {
				this.$el.addClass('cell');
			},
			show: function() {
				this.$el.removeClass('invisible');
				this.$el.empty();
				this.$el.append(renderCard_front(this.id));
			},
			hide: function() {
				this.$el.empty();
				this.$el.append(renderCard_back());
			},
			remove: function() {
				this.$el.addClass('invisible');
			},
			reset: function() {
				this.$el.removeClass('invisible');
				this.$el.empty();
				this.$el.append(renderCard_back);
			},
			events: {
				'click': lift
			}
		});


		// public instance methods:
		function show(where) {
			mainview.gridview.cardviews[where].show();
		}

		function reset() {
			//...	
			game.reset(); //reset game state
			alert('board has been reset!');
		}
		function renderCard_front(id) { //only need one parameter because board[id] and td =id  are the same in the way I ended up implementing it
			//...
	
			var img = document.createElement('img');
	        src = 'images/SVG-cards-1.3/' + game.getImg(id.replace('#','')) + '.svg';
	        img.src = src;
	        img.setAttribute('width',65);
	        return img;
		}

		function removeSoon(whereArr) {
			//...
			window.setTimeout(function() {
				whereArr.forEach(function(x){
					//document.getElementById(x).classList.toggle('invisible');
					mainview.gridview.cardviews[x].remove();
				});
			}, 1000);
		}
		function hideSoon(whereArr) {
			//...
			window.setTimeout(function() {
				whereArr.forEach(function(x){
					mainview.gridview.cardviews[x].hide();
				});
			}, 1000);			
		}
		function lift(evt) {
			game.lift(this.id.replace('#','')); 
		}

    	
    	function renderCard_back() {
    		var img = document.createElement('img');
    		src = 'images/SVG-cards-1.3/facedown.jpg'
    		img.src = src;
    		img.setAttribute('width',65);
    		return img;
    	}



		var mainview = new mView({el: '#' + container});
		//this.renderBoard = renderBoard;
		this.renderCard_back = renderCard_back;
		this.renderCard_front = renderCard_front;
		this.show = show;
		this.reset = reset;
		this.removeSoon = removeSoon;
		this.hideSoon = hideSoon;
		this.mainview = mainview;

		document.getElementById('reset').onclick = reset;

	}


	return GuiCtor;
})();
