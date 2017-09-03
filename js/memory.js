'use strict';

(function () {

    //but why can shuffle modify it when it's defined as const?
    const cards = ['anchor', 'balance-scale', 'bath', 'battery-2', 'bed', 'beer', 'bell', 'bicycle', 'binoculars', 'birthday-cake', 'bomb', 'book', 'briefcase', 'bug', 'bus', 'cab', 'camera', 'camera-retro', 'car', 'cloud', 'codepen', 'coffee', 'cogs', 'compass', 'credit-card', 'cubes', 'cutlery', 'diamond', 'dribbble', 'eye', 'film', 'fire', 'fire-extinguisher', 'flask', 'gamepad', 'gears', 'gift', 'github', 'glass', 'hand-spock-o', 'heart', 'key', 'leaf', 'legal', 'life-buoy', 'lightbulb-o', 'linode', 'magic', 'map-signs', 'medkit', 'microchip', 'microphone', 'modx', 'moon-o', 'mortar-board', 'motorcycle', 'music', 'pagelines', 'paint-brush', 'paw', 'pied-piper-alt', 'plane', 'plug', 'puzzle-piece', 'rocket', 'scissors', 'user-secret', 'ship', 'shower', 'snowflake-o', 'subway', 'suitcase', 'superpowers', 'thermometer-three-quarters', 'ticket', 'trash', 'train', 'tree', 'trophy', 'truck', 'tv', 'umbrella', 'university', 'venus-double', 'video-camera', 'wrench'];


    let ScoreBoard = function () {
        this.rating = 0;
        this.timer = 0;
        this.resetTimer = function () {
            clearInterval(this.updateTimer);
            clearInterval(this.timer);
            this.timer = 0;
        };
        this.updateTimer = function () {
            let secs = 0;
            let mins = 0;
            this.timer = setInterval(function () {
                secs++;
                if (secs == 60) {
                    secs = 0;
                    mins++;
                }
                document.getElementById('timer').innerHTML = mins + ':' + ("0" + secs).slice(-2);;

            }, 1000);
        };
    };

    let CardSet = function () {
        this.length = 8;
        this.cards = [];
        this.cardsToMatch = [];
        this.moves = 0;
        this.updateMoves = function() {
            this.moves +=1;
            document.getElementById('moves').innerHTML = this.moves;
        };
        this.found = 0;
        this.resetCardSet = function () {
            this.cards = [];
            this.cardsToMatch = [];
            this.moves = 0;
            this.found = 0;
        }
    };

    //instantiate new cardset and scoreboard
    let cardSet;
    let scoreBoard;

    listenButton();

    function listenButton() {
        document.getElementById('startGame').addEventListener("click", function (e) {
            e.preventDefault();
            clearBoard();
        })
    }

    function listenCards() {
        for (let i = 0; i < cardSet.cards.length; i++) {
            document.getElementsByClassName('card')[i].addEventListener("click", function (e) {
                flipCard(this);
            });
        }
    }

    function clearBoard() {

        document.getElementById('deck').innerHTML = '';
        if (scoreBoard instanceof ScoreBoard) {
            scoreBoard.resetTimer();
            cardSet.resetCardSet();
        }
        // set new cards and scoreboard
        cardSet = new CardSet();
        scoreBoard = new ScoreBoard();
        prepareGame();
    }

    function prepareGame() {

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

    function displayCards() {
        var deck = document.getElementById('deck');
        for (let i = 0; i < cardSet.cards.length; i++) {
            let currentCard = document.createElement('div');
            currentCard.className = 'card';
            document.getElementById('deck').appendChild(currentCard);
            document.getElementsByClassName('card')[i].innerHTML = '\
                    <div class="card-back"></div>\
                    <div class="card-front"><i class="fa fa-' + cardSet.cards[i] + '"></i></div>';
        }
        listenCards();
    }


    function flipCard(elem) {

        if (!(elem.classList.contains("turned"))) {
            if (cardSet.cardsToMatch.length < 2) {
                elem.classList.add("turned");
                const currentCard = elem.childNodes[3].childNodes[0];
                cardSet.cardsToMatch.push(currentCard);
                if (cardSet.cardsToMatch.length == 2) {
                    checkMatch();
                }
            }
        }
    }

    function checkMatch() {
        let turnedCards = [];
        for (let i = 0; i < cardSet.cardsToMatch.length; i++) {
            turnedCards.push(cardSet.cardsToMatch[i].parentNode.parentNode);
        }
        if (cardSet.cardsToMatch[0] == cardSet.cardsToMatch[1]) {
            alert('bravo');
        } else {
            for (let i = 0; i < turnedCards.length; i++) {
                turnedCards[i].classList.add('wrong-card');
            }
            setTimeout(function () {
                for (let i = 0; i < turnedCards.length; i++) {
                    turnedCards[i].classList.remove('wrong-card', 'turned');
                }
            }, 1500);
        }
        cardSet.cardsToMatch = [];
        cardSet.updateMoves();
    }

    function updateRating() {

    }

    //add stuff to local storage?


})();
