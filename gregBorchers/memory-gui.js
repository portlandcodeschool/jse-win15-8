var MemoryGUI = (function() { // begin IIFE

    var CardView = Backbone.View.extend({
        tagName: 'div', //use this tag to make a new el
        events: {
            'click': 'lift'
        },
        className: 'memoryCell',

        initialize: function(opts) {
            // Each subview view will have a reference to game:
            this.game = opts.game; //receive custom option
            // opts should also contain an id...
            if (opts.isFirstCol){
                this.$el.addClass('firstcol');
            }
       
        },
        // Each view should respond to a click with this method:
        lift: function() {
                   this.game.lift(Number(this.id));
        },
        // Each view should know how to re-render its own card
        // in these four ways:
    show: function(what) { //turn face-up with value _what_
        this.$el.addClass('faceup');
        this.$el.html(what);
    },
    remove: function() { //remove as matched
        this.$el.removeClass('faceup')
            .addClass('missing');
    },
    hide: function() { //turn face-down
        this.$el.removeClass('faceup')
            .removeClass('missing')
            .html('');
    },
    reset: function() { //return to starting state
        this.hide();
    }
});

    var GridView = Backbone.View.extend({
        tagName: 'div', //use this tag to make a new div

        className: 'memorygrid',
    initialize: function(opts) {
        this.game = opts.game;//
        this.cardviews = []; // grid's subviews

        var length = this.game.size();
        var numCols = Math.floor(Math.sqrt(length));
        for (var i=0; i<length; ++i ) {
            // generate each subview:
            var card = new CardView({
                //pass some options downward to the proto-annex
                game: opts.game,
                id: i,
                isFirstCol: (i%numCols===0)
            });
            this.cardviews.push(card);
            // connect card's element to DOM;
            // i.e. attach card.el to this.el
            card.$el.appendTo(this.$el);
        }
    },

        reset: function() {
        //loop over all card views to reset them
        // for (var i = 0; i < this.cardviews.length; i++) {
        //     this.cardviews[i].reset();
        // };

    }

    });

    var MainView = Backbone.View.extend({
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
            this.gridview.$el.appendTo(this.$el);

            // create and attach a reset button:
            //...
        },

        resetAll: function() {
            this.game.reset();
            this.gridview.reset();
        }
    });

    // Ctor for master gui object:
    function GUI(container, game) {
        game.gui(this);
            if ((typeof container === 'string') && 
                    (container[0] !== '#')) {
                    container = '#'+container;
                }

       
        // Generate all views:
        this.mainview = new MainView({
            el: container,
            // Pass a reference to game downward to all views:
            game: game
        });

        // These methods will be called by game;
        // figure out how they should delegate any
        // re-rendering to various subviews
        this.show = function(where, what) {
            console.log(where, what);
            this.mainview.gridview.cardviews[where]
                .show(what);
        };
        this.hideSoon = function(locs) {
            var me = this;
            window.setTimeout(function() {
                for (var i = 0; i < locs.length; ++i) {
                    var where = locs[i];
                    me.mainview.gridview
                        .cardviews[where].hide();
                }
            }, 1000);
        };
        this.removeSoon = function(locs) {
            var me = this;
            window.setTimeout(function() {
                for (var i = 0; i < locs.length; ++i) {
                    var where = locs[i];
                    me.mainview.gridview
                        .cardviews[where].remove();
                }
            }, 1000);
        };
    }

    return GUI;

})(); //end GUI IIFE