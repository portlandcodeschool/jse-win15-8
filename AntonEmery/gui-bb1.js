
var MemoryGUI = (function() { // begin IIFE

var CardView = Backbone.View.extend({
    tagName: 'div', //use this tag to make a new el
    className: 'card', //added this
    events: {
        'click': 'lift'
    },

    
    initialize: function(opts) {
        // Each subview view will have a reference to game:
        this.game = opts.game;  //receive custom option
        // opts should also contain an id...

        
    },



    // Each view should respond to a click with this method:
    lift: function() {
        this.game.lift(parseInt(this.id));
        //console.log('lift called');
    },
    // Each view should know how to re-render its own card
    // in these four ways:
    show: function(what) { //turn face-up with value _what_
        console.log(what[1]);
        //change card css to face up. where parameter equals card id 
        $('#' + this.id).toggleClass('face-up face-down');
        $('#' + this.id ).children('img').attr('src', 'img/' + what[1] + '.jpg');

    },
    
    remove: function() { //remove as matched
      var self = this;
      window.setTimeout(function() {
         //set class invisible         
        $('#' + self.id).attr('class', 'invisible');
        $('#' + self.id ).children('img').attr('src', 'img/backofcard.png');        
         }, 1000);
    },

    hide: function() { //turn face-down
      var self = this;
      window.setTimeout(function() {
         //set class invisible         
        $('#' + self.id).toggleClass('face-down face-up');
        $('#' + self.id ).children('img').attr('src', 'img/backofcard.png');        
         }, 1000);
    },

    reset: function() { //return to starting state
      //delete everything inside memorygame div
        console.log('reset called');
      //rerender
    }
});

var  GridView = Backbone.View.extend({
    tagName: 'div', //use this tag to make a new div
    className: 'gridview',

    initialize: function(opts) {
        this.game = opts.game;//
        this.cardviews = []; // grid's subviews

            for(var i = 0; i < this.game.size(); i++) {
            // generate each subview:
            var card = new CardView({game: opts.game, id: i});
            card.$el.attr('id', i);
            card.$el.addClass('face-down');
            card.$el.append('<img src="img/backofcard.png">');
            this.$el.append(card.$el);
            card.$el.onclick = this.lift;
            
            this.cardviews.push(card);
            // connect card's element to DOM;
            // i.e. attach card.el to this.el
        }
    },

    reset: function() {
        //loop over all card views to reset them
        this.card.reset();
    }
    
});

var MainView = Backbone.View.extend({
    el: '#memorygame',

    events: {
        // define click on reset button
        'click #resetBtn': 'resetAll'
    },
    //...
    initialize: function(opts) {
        //opts should include el and game
        this.game = opts.game;
        this.gridview = new GridView({
            //pass some options downward:
            game: opts.game,
            //...
        });
        // attach gridview.el below this.el
        this.$el.append(this.gridview.$el);


        // create and attach a reset button:
        var $button = $('<button class="pure-button" id="resetBtn">');
        $button.html('Reset');
        this.$el.append($button);
    },
    
    resetAll: function() {
        console.log('reset all called');
        this.game.reset();
        this.gridview.reset();
    }
});

// Ctor for master gui object:
function GUI(container,game) {

    // Generate all views:
    this.mainview = new MainView({
        el:'#' + container,
        // Pass a reference to game downward to all views:
        game:game
    });

    // These methods will be called by game;
    // figure out how they should delegate any
    // re-rendering to various subviews
    this.show = function(where, what) {  //where is the index of arr, what is [name, number] sub array
    //...
      this.mainview.gridview.cardviews[where].show(what);
    }

    this.hideSoon = function(locs) {
      var self = this;
      locs.forEach(function(x){
        self.mainview.gridview.cardviews[x].hide();
      })
    }

    this.removeSoon = function(locs) {  //locs are ids of card?
      var self = this;
      locs.forEach(function(x) {
        self.mainview.gridview.cardviews[x].remove();
      });
    }
  }
  


return GUI;

})(); //end GUI IIFE
