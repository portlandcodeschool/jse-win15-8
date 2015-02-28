var MemoryGUI = (function() { // begin IIFE

var CardView = Backbone.View.extend({
    tagName: 'div', //use this tag to make a new el
    events: {
        'click': 'lift'
    },
    
    initialize: function(opts) {
        // Each subview view will have a reference to game:
        this.game = opts.game;  //receive custom option
        // opts should also contain an id...
        this.id =  opts.id;
        console.log('here is opts.id');
        console.log(opts.id);
        this.el.setAttribute('class', 'face-down');     

    },
    // Each view should respond to a click with this method:
    lift: function() {
        this.game.lift(this.id);

    },
    // Each view should know how to re-render its own card
    // in these four ways:
    show: function(what) { //turn face-up with value _what_
            this.classList.toggle('face-down', false);
            this.classList.toggle('face-up', true);
            this.innerHTML = what;
    },
    remove: function() { //remove as matched
    },
    hide: function() { //turn face-down
        this.classList.toggle('face-down', true);
        this.classList.toggle('face-up', false);
        this.innerHTML ='';
    },
    reset: function() { //return to starting state
        this.classList.toggle('face-down', true);
        this.classList.toggle('face-up', false);
        this.innerHTML = '';
    }
});

var  GridView = Backbone.View.extend({
    tagName: 'div', //use this tag to make a new div

    initialize: function(opts) {
        //this.el = this.el;
        this.game = opts.game;//
        this.cardviews = []; // grid's subviews
        //$(this.el).css('background-color', 'red');
        this.el.setAttribute('class', 'grid');

        for (cell = 0; cell<this.game.size(); ++cell){
            // generate each subview:
            var card = new CardView({
                //pass some options downward:
                game: opts.game,
                //...
                //el: '<div>',
                id: cell,


            });
            $(card.el).addClass("face-down");
            //$('tr').append(card.el);
            //$('.rows0').append(card.el);
            $(this.el).append(card.el);
            this.cardviews.push(card);
        };
            console.log(this.cardviews);
            // connect card's element to DOM;
            // i.e. attach card.el to this.element
            // ...
        //}
    },

    reset: function() {
        for (resetting = 0; resetting<this.cardviews.length; resetting++){
            console.log(this.cardviews[resetting]);
            this.cardviews[resetting].classList.add('face-up', 'face-down', 'hidden');
        }
        //loop over all card views to reset them
        //...
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
        //this.el = opts.el;
        this.gridview = new GridView({
            //pass some options downward:
            game:opts.game,
            //...
            //el: '<table>',

        });


        // attach gridview.el below this.el
        //...
        $(this.el).append(this.gridview.el);

        // create and attach a reset button:
        //...
    },
    
    resetAll: function() {
        this.game.reset();
        this.gridview.reset();
    }
});

// Ctor for master gui object:
function GUI(container,game) {

    // Generate all views:
    this.mainview = new MainView({
        el:container,
        // Pass a reference to game downward to all views:
        game:game
    });

    // These methods will be called by game;
    // figure out how they should delegate any
    // re-rendering to various subviews
    this.show = function(where,what) {
    //...
        var showIt = document.getElementById(where);
        showIt.classList.toggle('face-down', false)
        showIt.classList.toggle('face-up', true);
        showIt.innerHTML = what;
    }
    this.hideSoon = function(locs) {
    //...
        window.setTimeout(function(){
            for (var card in locs){
            document.getElementById(locs[card]).classList.toggle('face-down', true);
            document.getElementById(locs[card]).classList.toggle('face-up', false);
            document.getElementById(locs[card]).innerHTML = ''}
            }, 1000);
    }
    this.removeSoon = function(locs) {
        window.setTimeout(function(){
            for (var card in locs){
                document.getElementById(locs[card]).innerHTML = '';
                document.getElementById(locs[card]).classList.toggle('face-up', false);
                document.getElementById(locs[card]).classList.toggle('hidden', true);
            };
            }, 1000);
    //...
    }
}

return GUI;

})(); //end GUI IIFE

function doStuff(){
    g1u = new MemoryGUI('#memorygame', game1);
    game1.gui(g1u);
}

window.onload = doStuff;
