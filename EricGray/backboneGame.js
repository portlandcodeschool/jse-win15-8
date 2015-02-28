var MemoryGUI = (function() { // begin IIFE

var CardView = Backbone.View.extend({
    tagName: 'td', //use this tag to make a new el
    events: {
        'click': 'lift'
    },
    
    initialize: function(opts) {
        // Each subview view will have a reference to game:
        this.game = opts.game;  //receive custom option
        // opts should also contain an id...
        this.id = opts.id;
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
    tagName: 'table id=playmat' , //use this tag to make a new div

    initialize: function(opts) {
        this.game = opts.game;//
        this.cardviews = []; // grid's subviews
        this.el.setAttribute('class', 'grid');
            var row1 = $('<tr id=row1 class=rows>');
            $(this.el).append(row1);
            var row2 = $('<tr id=row2 class=rows>');
            $(this.el).append(row2);
        for (cell = 0; cell<this.game.size(); cell++){
            // generate each subview:
            var card = new CardView({
                //pass some options downward:
                game: opts.game,
                id: cell.toString(),


            });
            this.cardviews.push(card);
            $(card.el).addClass("face-down");
          //  $(this.el).append(card.el);
            if(cell%2==0){
                $(row1).append(card.el);
            } else {$(row2).append(card.el);
            };
        };
            // connect card's element to DOM;
            // i.e. attach card.el to this.element
            // ...
        //}
    },

    reset: function() {
        console.log(this.cardviews);
        for (resetting = 0; resetting<this.cardviews.length; resetting++){
            $('#' + resetting).toggleClass('face-down', true);
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
        this.gridview = new GridView({
            //pass some options downward:
            game:opts.game,
            //...

        });


        // attach gridview.el below this.el
        //...
        $(this.el).append(this.gridview.el);

        // create and attach a reset button:
        //...
        var newButton = $('<button id=resetBtn class=resetButton >RESET</button>');
        $(this.el).append(newButton);
    },
    
    resetAll: function() {
        this.game.reset();
        this.gridview.reset();
        $('#gameover').remove();
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

    this.gameOver = function(clicks){
        console.log('im to gameOver in gui');
        var finish = $('<div id=gameover>Congratulations, you won!' +'<br />' + '<br />'+
        'You completed the game in ' +clicks+ ' clicks!' +'<br />' + '<br />'+
        'Click RESET to play again. </div>');
        $(finish).toggleClass('exit', false);
        $(finish).toggleClass('welcome', true);
        $(container).append(finish);
       // window.setTimeout(function(){$(finish).toggleClass('exit', true), 5000000});
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
