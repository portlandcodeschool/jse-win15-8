var MemoryGUI = (function() { // begin IIFE

  // Ctor for master gui object:
  function GUI(container,game) {
    game.gui(this);
    if (typeof container === 'string')
        if (container[0] !== '#')
            container = '#'+container;

    // Generate all views:
    // without mainview variable, Error: mainview is not defined
    var mainview = 
    this.mainview = new MainView({
        el:container,
        // Pass a reference to game downward to all views:
        game:game
    });

    function findCell(where) {
        return mainview.gridview.cardviews[where]; // var mainview
    }
    function hideAt(where) {
        findCell(where).hide();
    }
    function removeAt(where) {
        findCell(where).remove();
    }
    // These methods will be called by game;
    // delegate re-rendering to various subviews
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
    className: 'memoryboard',
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
          game:options.game
          //...
      });
      // attach gridview.el below this.el
      this.gridview.$el.appendTo(this.$el);

      $('<h1>').html('Wisdom of Westeros')
                .appendTo('#header');
      $('<h2>').html('Match <em>Game of Thrones</em> characters with their words!')
                .appendTo('#header');
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
              //id: 'cell'+i
          });
          this.cardviews.push(card);
          // connect card's element to DOM;
          this.$el.append(card.el);
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
    className: 'generic',
    events: {
        'click': 'lift'
    },
    initialize: function(options) {
      // Each subview view will have a reference to game:
      this.game = options.game;  //receive custom option
      this.where = options.where;
      this.id = options.id;
      this.$el.addClass('facedown');
    },
    // Each view should respond to a click with this method:
    lift: function() {
      this.game.lift(Number(this.id));
      this.game.lift(this.id);
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
              .removeClass('cardImage');
    },
    reset: function() { //return to starting state
      this.$el.removeClass('cardQuote')
            .html('')
            .removeClass('cardImage')
            .removeClass('matched')
            .addClass('facedown');
    }
  }); // end cardview

return GUI;

})(); //end GUI IIFE
