document.body.onload = main();

/* This functin creates the page and adds all the elements to the page */

function main() {

	var orderedDeck = buildDeck();
	var Deck = shuffleDeck(orderedDeck);

	var player = new Player("player-hand", Deck.shift(), Deck.shift());
	var dealer = new Player("dealer-hand", Deck.shift(), Deck.shift());

	if ( first ) {
		buildPage();
		displayAccount();
		betButtons();
	}
	if ( bet != 0 ) {

		startGame();
		displayCards(player, dealer);
		addButtons("player-hand", "hit-stand", "hit", "stand");

		var winner = checkForTwentyOne(player, dealer, bet);
		if ( winner == 'player' || winner == 'dealer' || winner == 'tie') {
			document.getElementById("hit").remove();
			document.getElementById("stand").remove();
		}

		createHitEvent("hit", "stand", player, dealer, Deck);
		createStandEvent("hit", "stand", player, dealer, Deck);
			
	}
	createWagerEvents();

}