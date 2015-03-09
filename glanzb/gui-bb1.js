
var MemoryGUI = (function() { // begin IIFE

var CardView = Backbone.View.extend({
    tagName: 'li', //use this tag to make a new el
    events: {
        'click': 'lift'
    },
    className: 'memorycell face-down',
    
    initialize: function(opts) {
        // Each subview view will have a reference to game:
        this.game = opts.game;  //receive custom option
        this.where= opts.where;
        // opts should also contain an id...
    },
    // Each view should respond to a click with this method:
    lift: function() {
        this.game.lift(this.where);
        this.$el.removeClass('face-down');
    },
    // Each view should know how to re-render its own card
    // in these four ways:
    show: function(what) { //turn face-up with value _what_
        this.$el.addClass('face-up');
                this.$el.append('<img src="img/' + what + '-star.jpeg" class="face-up">');
    },

    remove: function() { //remove as matched
        this.$el.addClass('matched');
    },
    hide: function() { //turn face-down
        this.$el.removeClass('face-up');
        this.$el.addClass('face-down');
        this.$el.html('');
    },
    reset: function() { //return to starting state
        this.$el.addClass('face-down')
                .removeClass('face-up')
                .removeClass('matched');
                this.$el.html('');
    }
});

var  GridView = Backbone.View.extend({
    tagName: 'ul', //use this tag to make a new div
    className:'memorygrid',
        initialize: function(opts) {
        this.game = opts.game;//
        this.cardviews = []; // grid's subviews
        var len = this.game.size(),
            cols = Math.ceil(Math.sqrt(len));
        for (var i=0; i<len; ++i) {
            // generate each subview:
            var card = new CardView({
                //pass some options downward:
                game: opts.game,
                where: i
            });
            this.cardviews.push(card);
            // connect card's element to DOM;
            // i.e. attach card.el to this.el
            this.$el.append(card.el);
        }
    },

    reset: function() {
        this.cardviews.forEach(function(view){
            view.reset();
        })
    }
    
});

var MainView = Backbone.View.extend({
    events: {
        // define click on reset button
        'click .resetBtn': 'resetAll'
    },
    //...
    initialize: function(opts) {
        //opts should include el and game
        this.game = opts.game;
        this.gridview = new GridView({
            //pass some options downward:
            game:opts.game,
            //...
        });
        // attach gridview.el below this.el
       this.$el.append(this.gridview.$el);

        // create and attach a reset button:
        $('<button>').html('Reset')
                    .addClass('resetBtn')
                    .appendTo('#memorygame');
    },
    
    resetAll: function() {
        this.game.reset();
        this.gridview.reset();
    }
});

// Ctor for master gui object:
function GUI(container,game) {
    game.gui(this);
    // ensure that a string container begins with '#'
        if (typeof container === 'string')
            if (container[0] !== '#')
                container = '#' + container;    // jq container id

    // Generate all views:
     var mainview = new MainView({
        el:container,
        // Pass a reference to game downward to all views:
        game:game
    });
     function findCardView(where) {
        return mainview.gridview.cardviews[where];
    }
    function hideAt(where) {
        findCardView(where).hide();
    }
    function removeAt(where) {
        findCardView(where).remove();
    }
    // These methods will be called by game;
    // figure out how they should delegate any
    // re-rendering to various subviews
    this.show = function(where,what) {
        findCardView(where).show(what);
    }
    this.hideSoon = function(locs) {
        window.setTimeout(function() {
            locs.forEach(hideAt);
        }, 1000);
    }
    this.removeSoon = function(locs) {
        window.setTimeout(function() {
            locs.forEach(removeAt);
        }, 1000);
    }
}

return GUI;


})(); //end GUI IIFE
