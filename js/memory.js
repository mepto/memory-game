'use strict';

(function () {

    //but why can shuffle modify it when it's defined as const?
    const cards = ['anchor', 'balance-scale', 'bath', 'battery-2', 'bed', 'beer', 'bell', 'bicycle', 'binoculars', 'birthday-cake', 'bomb', 'book', 'briefcase', 'bug', 'bus', 'cab', 'camera', 'camera-retro', 'car', 'cloud', 'codepen', 'coffee', 'cogs', 'compass', 'credit-card', 'cubes', 'cutlery', 'diamond', 'dribble', 'eye', 'film', 'fire', 'fire-extinguisher', 'flask', 'gamepad', 'gears', 'gift', 'github', 'glass', 'hand-spock-o', 'heart', 'key', 'leaf', 'legal', 'life-buoy', 'lightbulb-o', 'linode', 'magic', 'map-signs', 'medkit', 'microchip', 'microphone', 'modx', 'moon', 'mortar-board', 'motorcycle', 'music', 'pagelines', 'paint-brush', 'paw', 'pied-piper-alt', 'plane', 'plug', 'puzzle-piece', 'rocket', 'scissors', 'ser-secret', 'ship', 'shower', 'snowflake-o', 'subway', 'suitcase', 'superpowers', 'thermometer-3', 'ticket', 'trash', 'train', 'tree', 'trophy', 'truck', 'tv', 'umbrella', 'university', 'venus-double', 'video-camera', 'wrench'];


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
        this.moves = 0;
        this.found = 0;
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

    function clearBoard() {

        document.getElementById('deck').innerHTML = '';
        if (scoreBoard instanceof ScoreBoard) {
            scoreBoard.resetTimer();
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
        shuffle(cardSet.cards);
//        console.log(cardSet.cards);
        displayCards();
    }

    //https://bost.ocks.org/mike/shuffle/compare.html
    function shuffle(allCards) {
        var currentCard = allCards.length,
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
        const deck = document.getElementById('deck');
        for (let i = 0; i < cardSet.cards.length; i++) {
            let currentCard = document.createElement('div');
            currentCard.className = 'card';
            document.getElementById('deck').appendChild(currentCard);
            document.getElementsByClassName('card')[i].innerHTML = '\
                    <div class="card-back"></div>\
                    <div class="card-front"><i class="fa fa-' + cardSet.cards[i] + '"></i></div>';
        }

    }


    function flipCard(elem) {

    }

    function checkMatch() {

    }

    function updateRating() {

    }

    //add stuff to local storage?


})();
