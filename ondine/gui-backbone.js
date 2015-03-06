var MemoryGUI = (function() { // begin IIFE

  // Ctor for master gui object:
  function GUI(container,game) {
    game.gui(this);
    if (typeof container === 'string')
        if (container[0] !== '#')
            container = '#'+container;

    // Generate all views:
    //var mainview = 
    this.mainview = new MainView({
        el:container,
        // Pass a reference to game downward to all views:
        game:game
    });

    // function makeID(where) {// given a number, generate an id
    //     return 'cell'+where;
    //     // return 'board'+_guiID+'cell'+where; // for multiple boards
    // }

    function findCell(where) {
        return mainview.gridview.cardviews[where];
    }
    function hideAt(where) {
        findCell(where).hide();
    }
    function removeAt(where) {
        findCell(where).remove();
    }
    // These methods will be called by game;
    // figure out how they should delegate any
    // re-rendering to various subviews
    this.show = function(where,clicked) {
        findCell(where).show(clicked);
    };
    
    this.hideSoon = function(locs) {
        window.setTimeout(function() {
            locs.forEach(hideAt);
        }, 800);
    };
    this.removeSoon = function(locs) {
        window.setTimeout(function() {
            locs.forEach(removeAt);
        }, 800);
    };
  } // end gui constructor


  var MainView = Backbone.View.extend({
    events: {
      // define click on reset button
      'click button': 'resetAll'
    },
    //...
    initialize: function(options) {
      //options should include el and game
      this.game = options.game;
      this.gridview = new GridView({
          //pass some options downward:
          game:options.game,
          //...
      });
      // attach gridview.el below this.el
      this.gridview.$el.appendTo(this.$el);


      // create and attach a reset button:
      //...
      $('<button>').html('Play Again')
                  .prependTo('#footer');
    },
    
    resetAll: function() {
      this.game.reset();
      this.gridview.reset();
    }
  }); // end mainview


  var GridView = Backbone.View.extend({
    tagName: 'div',
    className: 'memoryboard',
    initialize: function(options) {
      this.game = options.game;//
      this.cardviews = []; // grid's subviews

      var length = this.game.size();
      for (var i=0; i<length; ++i ) {
          // generate each subview:
          var card = new CardView({
              //pass some options downward:
              game: options.game,
              id: i
          });
          this.cardviews.push(card);
          // connect card's element to DOM;
          // i.e. attach card.el to this.el
          card.$el.appendTo(this.$el);
      }
    },

    reset: function() {
      //loop over all card views to reset them
      this.cardviews.forEach(function(view){
          view.reset();
      });
    }   
  }); // end gridview


  var CardView = Backbone.View.extend({
    tagName: 'div', //use this tag to make a new el
    events: {
        'click': 'lift'
    },
    className: 'generic',
    initialize: function(options) {
      // Each subview view will have a reference to game:
      this.game = options.game;  //receive custom option
      // options should also contain an id...
    },
    // Each view should respond to a click with this method:
    lift: function() {
      this.game.lift(Number(this.id));
    },
    // Each view should know how to re-render its own card
    // in these four ways:
    show: function(clicked) {
      this.$el.removeClass('facedown');
        if (clicked.charAt(clicked.length-1) == '.') {
          this.$el.addClass('cardQuote')
               .html('<p class="quote">' + clicked + '</p>');
        } else {
          this.$el.html('<img src="images/' + clicked + '"/>')
              .addClass('cardImage');
        }   
    },
    remove: function() { //remove as matched
      this.$el.addClass('matched');
    },
    hide: function() { //turn face-down
      this.$el.removeClass('cardQuote')
              .html('')
              .addClass('facedown');
    },
    reset: function() { //return to starting state
      this.hide();
    }
  }); // end cardview

return GUI;

})(); //end GUI IIFE
