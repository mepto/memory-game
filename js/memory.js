'use strict';
listenButton();

function listenButton() {
    document.getElementById('startGame').addEventListener("click", function(e){
        e.preventDefault();
        displayCards();
    })
}

var cards = ['anchor', 'balance-scale', 'bath', 'battery-2', 'bed', 'beer', 'bell', 'bicycle', 'binoculars', 'birthday-cake', 'bomb', 'book', 'briefcase', 'bug', 'bus', 'cab', 'camera', 'camera-retro', 'car', 'cloud', 'codepen', 'coffee', 'cogs', 'compass', 'credit-card', 'cubes', 'cutlery', 'diamond', 'dribble', 'eye', 'film', 'fire', 'fire-extinguisher', 'flask', 'gamepad', 'gears', 'gift', 'github', 'glass', 'hand-spock-o', 'heart', 'key', 'leaf', 'legal', 'life-buoy', 'lightbulb-o', 'linode', 'magic', 'map-signs', 'medkit', 'microchip', 'microphone', 'modx', 'moon', 'mortar-board', 'motorcycle', 'music', 'pagelines', 'paint-brush', 'paw', 'pied-piper-alt', 'plane', 'plug', 'puzzle-piece', 'rocket', 'scissors', 'ser-secret', 'ship', 'shower', 'snowflake-o', 'subway', 'suitcase', 'superpowers', 'thermometer-3', 'ticket', 'trash', 'train', 'tree', 'trophy', 'truck', 'tv', 'umbrella', 'university', 'venus-double', 'video-camera', 'wrench'];

function displayCards() {
    clearBoard();
    var select = document.getElementById('nbPairs');
    var nbPairs = select.options[select.selectedIndex].value;
   console.log(nbPairs);
   // console.log(shuffle(cards));
}

function clearBOard() {

}

let CardSet = function() {
    this.length = 8;
};

//https://bost.ocks.org/mike/shuffle/compare.html
function shuffle(allCards) {
  var currentElement = allCards.length, swap, remainingElement;

  // While there remain elements to shuffle…
  while (currentElement) {

    // Pick a remaining element…
    remainingElement = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    swap = allCards[currentElement];
    allCards[currentElement] = allCards[remainingElement];
    allCards[remainingElement] = swap;
  }

  return allCards;
}


function flipCard(elem) {

}

function checkMatch() {

}

////https://bost.ocks.org/mike/shuffle/compare.html
//function shuffle(arr) {
//    const m = arr.length,
//        t, i;
//    while (m) {
//        i = Math.floor(Math.random() * m--);
//        t = arr[m];
//        arr[m] = arr[i];
//        arr[i] = t;
//    }
//}
