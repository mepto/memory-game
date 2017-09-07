'use strict';

(function () {

    //array of icons to randomly choose from
    let cards = ['anchor', 'balance-scale', 'bath', 'battery-2', 'bed', 'beer', 'bell', 'bicycle', 'binoculars', 'birthday-cake', 'bomb', 'book', 'briefcase', 'bug', 'bus', 'cab', 'camera', 'camera-retro', 'car', 'cloud', 'codepen', 'coffee', 'cogs', 'compass', 'credit-card', 'cubes', 'cutlery', 'diamond', 'dribbble', 'eye', 'film', 'fire', 'fire-extinguisher', 'flask', 'gamepad', 'gift', 'github', 'glass', 'hand-spock-o', 'heart', 'key', 'leaf', 'legal', 'life-buoy', 'lightbulb-o', 'linode', 'magic', 'map-signs', 'medkit', 'microchip', 'microphone', 'modx', 'moon-o', 'mortar-board', 'motorcycle', 'music', 'pagelines', 'paint-brush', 'paw', 'pied-piper-alt', 'plane', 'plug', 'puzzle-piece', 'rocket', 'scissors', 'user-secret', 'ship', 'shower', 'snowflake-o', 'subway', 'suitcase', 'superpowers', 'thermometer-three-quarters', 'ticket', 'trash', 'train', 'tree', 'trophy', 'truck', 'tv', 'umbrella', 'university', 'venus-double', 'video-camera', 'wrench'];

    /**
     *   the scoreboard holds the rating, timer and moves for each game
     *   the class also holds the upadting and reset mechanisms
     */
    let ScoreBoard = function () {
        //rating management
        this.rating = 3;
        this.resetRating = function () {
            this.rating = 3;
            this.updateRating();
        };
        this.updateRating = function () {
            document.getElementById('rating').innerHTML = '';
            for (let i = 1; i <= 3; i++) {
                if (this.rating >= i) {
                    document.getElementById('rating').innerHTML += '<i class="fa fa-star">';
                } else {
                    document.getElementById('rating').innerHTML += '<i class="fa fa-star-o">';
                }
            }
        };
        //timer management
        this.timer = 0;
        this.resetTimer = function () {
            //            clearInterval(this.updateTimer);
            clearInterval(this.delay);
            this.timer = 0;
        };
        this.updateTimer = function () {
            let secs = 0;
            let mins = 0;
            this.delay = setInterval(function () {
                secs++;
                if (secs == 60) {
                    secs = 0;
                    mins++;
                }
                scoreBoard.timer = mins + ':' + ("0" + secs).slice(-2);
                document.getElementById('timer').innerHTML = scoreBoard.timer;
            }, 1000);
        };
        //moves management
        this.moves = 0;
        this.updateMoves = function () {
            this.moves += 1;
            document.getElementById('moves').innerHTML = this.moves;
            if (this.moves < cardSet.length * 2) {
                this.rating = 3;
            } else if (this.moves < cardSet.length * 3) {
                this.rating = 2;
            } else {
                this.rating = 1;
            }
            this.updateRating();
        };
        this.resetMoves = function () {
            this.moves = 0;
            document.getElementById('moves').innerHTML = this.moves;
        };
    };

    /**
     *   the card set holds the initial user choice, the card set randomly
     *   selected accordingly in the gloabl card variable
     *   the two cards that were turned in one user attempt
     */

    const CardSet = function () {
        this.length = 8;
        this.cards = [];
        this.cardsToMatch = [];
        this.resetCardSet = function () {
            this.cards = [];
            this.cardsToMatch = [];
        };
    };

    //instantiate new cardset and scoreboard
    let cardSet;
    let scoreBoard;

    //start the listener!
    listenButton();

    //the listener is attached to the body as the success modal
    //will be added later on to the dom and also contains a button
    function listenButton() {
        document.body.addEventListener('click', function (event) {
            if (event.target.classList.contains('startGame')) {
                event.preventDefault();
                if (document.body.children[0].classList.contains('blurred')) {
                    document.getElementById('modal').remove();
                    blurredBackground();
                }
                clearBoard();
            }
        });
    }

    //listener for the set of cards clicked by the player per turn
    function listenCards() {
        for (let i = 0; i < cardSet.cards.length; i++) {
            document.getElementsByClassName('card')[i].addEventListener("click", function (e) {
                flipCard(this);
            });
        }
    }

    //reset the board on click on "play!" or "play again!" buttons
    function clearBoard() {
        document.getElementById('deck').innerHTML = '';
        if (scoreBoard instanceof ScoreBoard) {
            scoreBoard.resetTimer();
            scoreBoard.resetMoves();
            scoreBoard.resetRating();
            cardSet.resetCardSet();
        }
        // set new cards and scoreboard
        cardSet = new CardSet();
        scoreBoard = new ScoreBoard();
        //get to it
        prepareGame();
    }

    function prepareGame() {
        scoreBoard.updateRating();
        scoreBoard.updateTimer();
        //retrieve level selection (==nb of pairs to play with)
        var select = document.getElementById('nbPairs');
        //put the user choice in the card set
        cardSet.length = select.options[select.selectedIndex].value;
        //get a random start number and shuffle the cards array
        let randomNb = Math.floor(Math.random() * ((cards.length - cardSet.length) + 1));
        shuffle(cards);
        //start populating the cardset array
        for (let i = 0; i < cardSet.length; i++) {
            cardSet.cards.push(cards[randomNb]);
            cardSet.cards.push(cards[randomNb]);
            randomNb++;
        }
        //shuffle selected cards
        shuffle(cardSet.cards);
        displayCards();
    }

    //https://bost.ocks.org/mike/shuffle/compare.html
    function shuffle(allCards) {
        let currentCard = allCards.length,
            swap, remainingCard;
        // While there remain elements to shuffle…
        while (currentCard) {
            // Pick a remaining card
            remainingCard = Math.floor(Math.random() * currentCard--);
            // And swap it with the current card
            swap = allCards[currentCard];
            allCards[currentCard] = allCards[remainingCard];
            allCards[remainingCard] = swap;
        }
        return allCards;
    }

    //add cards on the board
    function displayCards() {
        var deck = document.getElementById('deck');
        for (let i = 0; i < cardSet.cards.length; i++) {
            //create and append each card to the board
            let currentCard = document.createElement('div');
            currentCard.className = 'card';
            document.getElementById('deck').appendChild(currentCard);
            document.getElementsByClassName('card')[i].innerHTML = '\
                    <div class="card-back"></div>\
                    <div class="card-front"><i class="fa fa-' + cardSet.cards[i] + '"></i></div>';
        }
        //launch listener once cards are on the board
        listenCards();
    }

    //card turner
    function flipCard(elem) {
        //clcked element should not already be turned
        if (!(elem.classList.contains("turned"))) {
            //there shouldn't be already 2 cards to compare
            if (cardSet.cardsToMatch.length < 2) {
                elem.classList.add("turned");
                //retrieve icon on card-front
                const currentCard = elem.childNodes[3].childNodes[0];
                //add to comparator array
                cardSet.cardsToMatch.push(currentCard);
                // if comparator array is full, check the match
                if (cardSet.cardsToMatch.length == 2) {
                    setTimeout(function () {
                        checkMatch();
                    }, 600);
                }
            }
        }
    }

    //compare the card-front contents
    function checkMatch() {
        //make array with card parent element
        const turnedCards = [];
        for (let i = 0; i < cardSet.cardsToMatch.length; i++) {
            turnedCards.push(cardSet.cardsToMatch[i].parentNode.parentNode);
        }
        if (cardSet.cardsToMatch[0].outerHTML === cardSet.cardsToMatch[1].outerHTML) {
            //if it matches, add class and check if game is over
            //timeouts leave time for animations to complete
            for (let i = 0; i < turnedCards.length; i++) {
                turnedCards[i].classList.add('matched-card');
            }
            setTimeout(function () {
                checkEndGame();
            }, 600);
        } else {
            //if wrong, add class, then turn cards around again
            for (let i = 0; i < turnedCards.length; i++) {
                turnedCards[i].classList.add('wrong-card');
            }
            setTimeout(function () {
                for (let i = 0; i < turnedCards.length; i++) {
                    turnedCards[i].classList.remove('wrong-card');
                }
                for (let i = 0; i < turnedCards.length; i++) {
                    turnedCards[i].classList.add('flip-back');
                }
                setTimeout(function () {
                    for (let i = 0; i < turnedCards.length; i++) {
                        turnedCards[i].classList.remove('flip-back', 'turned');
                    }
                }, 800);
            }, 1000);
        }
        //Reset comparator
        cardSet.cardsToMatch = [];
        //Update nb of moves
        scoreBoard.updateMoves();
    }

    //check game status after last successful match
    function checkEndGame() {
        //check the amount of cards for the nb of times the matched-card class is in the deck on the board
        const deck = document.getElementsByClassName('matched-card');
        if (deck.length === (cardSet.length * 2)) {
            //stop the timer
            clearInterval(scoreBoard.delay);
            //add the end of game modal
            createModal();
        }
    }

    //display end of game modal
    function createModal() {
        blurredBackground();
        //content of the modal, including moves,
        //timer, rating and play button
        const modalContent = '<h2>CONGRATULATIONS!</h2><p>You cleared the board in ' + scoreBoard.moves + ' moves and got a rating of ' + scoreBoard.rating + ' stars. Your time was ' + scoreBoard.timer + '.</p> <button class="startGame button-default"><i class="fa fa-refresh"></i> Play again!</button>'
        //create a new element, give it an id
        const modal = document.createElement('div');
        modal.id = 'modal';
        //then append it and give it its content
        document.getElementsByTagName('body')[0].appendChild(modal);
        document.getElementById('modal').innerHTML = modalContent;
    }

    //toggles the class that blurs the background
    // of the end of game modal
    function blurredBackground() {
        document.getElementsByTagName('header')[0].classList.toggle('blurred');
        document.getElementsByTagName('section')[0].classList.toggle('blurred');
        document.getElementsByTagName('main')[0].classList.toggle('blurred');
    }

})();
