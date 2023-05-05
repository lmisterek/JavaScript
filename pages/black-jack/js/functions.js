/* purpose:  builds a pair of buttons for hit and stand
** arg:  the id of the div to which the buttons are added, the id of the div created,
**       and the ids of the buttons
** return: void
*/
function addButtons(row_id, div_id, button1_id, button2_id) {

	newDiv = document.createElement('div');
	newDiv.classList.add("d-grid", "gap-2", "d-md-block");
	newDiv.id = div_id;

	var label1 = button1_id[0].toUpperCase() + button1_id.substring(1);
	var label2 = button2_id[0].toUpperCase() + button2_id.substring(1);
	var button1 = createButton(button1_id, "btn-dark", label1);
	var button2 = createButton(button2_id, "btn-danger", label2);

	newDiv.appendChild(button1);
	newDiv.appendChild(button2);
	document.getElementById(row_id).appendChild(newDiv);

}

/* purpose:  creates the header for the player and the dealer card area
** arg:  the id of the row for which the title is added
** return: void
*/
function addHeader(id, title, new_id) {

	var newHeader = document.createElement("h3");
	newHeader.innerHTML = title;
	newHeader.id = new_id;
	document.getElementById(id).appendChild(newHeader);

}

function addMoreButtonEvents(button1_id, button2_id) {

	var getButton = document.getElementById(button1_id);
	getButton.addEventListener('click', function() { reset();});

	var getButton = document.getElementById(button2_id);
	getButton.addEventListener('click', function() { endGame();});

}

/* purpose:  creates and appends rows to the body
** arg:  the id where the row is added and the id of the new row
** return: void
*/
function addRow(parent_id, child_id) {

	var nextDiv = document.createElement("div");
	nextDiv.classList.add("row");
	nextDiv.id = child_id;
	document.getElementById(parent_id).appendChild(nextDiv);

}

/* purpose:  appends a list of buttons to the page for wagers
** arg:  void
** return: void
*/
function betButtons() {

	var newSpan = document.createElement('span');
	newSpan.id = 'top-buttons';
	buttonSpan= createButtonSpan(newSpan.id);
	newSpan.appendChild(buttonSpan);	
	document.getElementById('main-container').appendChild(newSpan);

}

/* purpose:  creates 11 columns to where the cards will be added
** arg:  the id of the row and the row number to which the columns will be added
** return: void
*/
function buildColumns(id, n) {

	for ( i = 0; i < 11; i++ ) {

	var newDiv = document.createElement('div');
	newDiv.classList.add("col");
	newDiv.id = "row" + n + "-col" + i; 

	document.getElementById(id).appendChild(newDiv);
	
	}

}

/* purpose:  creates a deck of cards with the order spades, hearts, diamonds, 
** 			 clubs (ace - king)
** arg:  none
** return: an array of card objects
*/
function buildDeck() {

	var Deck = [];
	var Suits = ["spades", "diamonds", "hearts", "clubs"];
	var Positions = [ "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

	for ( suit in Suits ) {

		for ( i in Positions ) {

			var newCard = new Card(Suits[suit], Positions[i]);
			Deck.push(newCard);
		}
	}

	return Deck;

}

/* purpose:  builds all the html elements for the page when the cards are first dealt
** arg:  none
** return: none
*/
function buildPage() {

	var newDiv = document.createElement('div');
	newDiv.classList.add("container");
	newDiv.id = "main-container";
	document.getElementById('placemat').appendChild(newDiv);

	first = false;

}

/* purpose: checks the high sum for 21 on first deal
** arg:  player and dealer object
** return: string stating 'player', 'dealer', 'tie' or null if no win
*/
function checkForTwentyOne(player, dealer, bet) {

	if ( player.highSum() == BJ && dealer.highSum() == BJ ) {
		showHiddenCard(dealer);
		endRound("tie");
		updateAccount(account + bet);
		return "tie";
	}
	else if ( dealer.highSum() == BJ ) {
		showHiddenCard(dealer);
		endRound("dealer");
		return "dealer";
	}
	else if ( player.highSum() == BJ ) {
		showHiddenCard(dealer);
		endRound("player");
		updateAccount(account + 2.5*bet);
		return "player";
	}

	return null;

}

/* purpose: determine if the first two cars are the same
** arg:  player object
** return: boolean true for split and false otherwise
*/
function checkForSplit(player) {

	if ( player.first.position == player.second.position ) return true;
	else return false;

}

/* purpose:  this will call the clearRow methods
** arg:  none
** return: void
*/
function clearCards() {

	clearRow(0);
	clearRow(1);

}


/* purpose:  this will clear the headers and the cards
** arg:  none
** return: void
*/
function clearCardDivs() {

	var html1 = document.getElementById("player-hand");
	var html2 = document.getElementById("dealer-hand");

	html1.innerHTML = "";
	html2.innerHTML = "";

}

function clearEverything() {

	clearCards();
	clearCardDivs();
	document.getElementById('top-buttons').remove();

}

/* purpose:  this will clear each column (card) for the given row
** arg:  an integer, n
** return: void
*/
function clearRow(n) {

	for ( i = 0; i < 11; i++ ) {

		column_id = "row" + n + "-col" + i; 
		column = document.getElementById(column_id);

		if ( column ) column.innerHTML = "";
	
	}

}

/* purpose: creates the html of a button
** arg:  the id of the button, a class definition ("btn-danger"), the html label
** return: the button object
*/
function createButton(id, classtype, html) {

	var button = document.createElement('button');
	button.id = id;
	button.classList.add("btn", classtype);
	button.setAttribute("type", "button");
	button.innerHTML = html;
	return button;
	
}

/* purpose:  this creates a button span with buttons for each wage amount
** arg:  none
** return: the buttonspan object
*/
function createButtonSpan(parent_id) {

	buttonSpan = document.createElement('span');
	buttonSpan.id = 'bets';

	for ( i = 0; i < WAGERS.length; i++ ) {

		if ( account >= WAGERS[i] ) {

			var html = "$" + WAGERS[i];
			var newButton = createButton(WAGERS[i], "btn-danger", html);
			buttonSpan.appendChild(newButton);

		}
		
	}
	
	return buttonSpan;

}

/* purpose:  this method analyzes the final total for the player and winner and returns the winner
** arg:  player and dealer object
** return: string "player" if player wins, string "dealer" if dealer wins, null for tie
*/
function determineWinner(player, dealer) {

	var winner = null;

	if ( player.highSum()<= BJ ) var playerTotal = player.highSum();
	else playerTotal = player.lowSum();

	if ( dealer.highSum() <= BJ ) var dealerTotal = dealer.highSum();
	else dealerTotal = dealer.lowSum();

	if ( playerTotal > dealerTotal ) winner = "player";
	else if ( playerTotal < dealerTotal && dealerTotal > BJ ) winner = "player";
	else if ( playerTotal == dealerTotal ){ updateAccount(account + bet); return null;}
	else winner = "dealer";

	if ( winner == "player") updateAccount(account + 2*bet);

	return winner;

}

/* purpose:  displays the amount in the accout
** arg:  void
** return: void
*/
function displayAccount() {

	var newParagraph = document.createElement('p');
	newParagraph.id = 'account';
	newParagraph.innerHTML = "Account: $" + account;
	document.getElementById('main-container').appendChild(newParagraph);

}

/* purpose:  shows the hidden and visible cards to the screen
** arg:  the id of the row where the card is added, the suit and the position of 
**       the card
** return: void
*/
function displayCard(id, suit, position) {

	var nextDiv = document.createElement('div');
	nextDiv.classList.add("card");
	document.getElementById(id).appendChild(nextDiv);
	var img = document.createElement('img');
	img.classList.add("card-img-top");
	img.setAttribute("src", "images/" + suit + ".svg");
	nextDiv.appendChild(img);
	document.getElementById(id).appendChild(nextDiv);

	var lastDiv = document.createElement('div');
	lastDiv.classList.add("card-body");
	lastDiv.innerHTML = position;
	nextDiv.appendChild(lastDiv);
	document.getElementById(id).appendChild(nextDiv);

}
	

/* purpose:  shows the hidden and visible cards to the screen
** arg:  the player and dealer object
** return: void
*/
function displayCards(player, dealer) {

	displayCard("row0-col0", player.first.suit, player.first.position);
	displayCard("row0-col1", player.second.suit, player.second.position);
	hiddenCard("row1-col0");
	displayCard("row1-col1", dealer.second.suit, dealer.second.position);
	
}

/* purpose:  calls methods to clear the page and print message to the screen
** arg:  none
** return: void
*/
function endGame() {

	const timeout = setTimeout(clearCards, 4000);
	const timeout2 = setTimeout(clearCardDivs, 4000);
	const timeout3 = setTimeout(gameOverMsg, 4100);
	removeById('buttons');
	removeById('top-buttons');
	removeById('account');

}

/* purpose:  calls various methods to print results, determine if the round is over
** arg:  a string - "player", "dealer", "tie", or "bust" - "player" means the player won
** return: void
*/
function endRound(result) {

	const timeout = setTimeout(printResult(result), 5000);
	moreButtons("top-buttons");
	addMoreButtonEvents("play-again", "end-game");

}

/* purpose:  prints a game over message to the screen
** arg:  none
** return: void
*/
function gameOverMsg() {

	var span = document.createElement('span');
	span.innerHTML = "Game over!  Your final account is $" + account + ".  Refresh the page to "
	                 +"play a new game.";
	document.getElementById('body').appendChild(span);
}

/* purpose:  shows the hidden cards to the screen
** arg:  the id of the row where the card is added
** return: void
*/
function hiddenCard(id) {

	var nextDiv = document.createElement('div');
	nextDiv.classList.add("card");
	document.getElementById(id).appendChild(nextDiv);

	var lastDiv = document.createElement('div');
	lastDiv.classList.add("card-body");
	lastDiv.id = "hidden-card";
	lastDiv.innerHTML = "?";
	nextDiv.appendChild(lastDiv);
	document.getElementById(id).appendChild(nextDiv);

}

function moreButtons(parent_id) {

	var button1 = createButton("play-again", "btn-danger", "Play Again");
	var button2 = createButton("end-game", "btn-dark", "Quit");

	document.getElementById(parent_id).appendChild(button1);
	document.getElementById(parent_id).appendChild(button2);

}

function processSplit(player, dealer, Deck) {

	if ( checkForSplit(player) ) {

		document.getElementById("hit-stand").remove();
		addButtons("player-hand", "split-nosplit", "split", "no split");
		createSplitEvent(player, dealer, Deck);
		createNoSplitEvent(player, dealer, Deck);

	}

}

function printResult(result) {

	var account = document.getElementById('account');
	var newDiv = document.createElement('div');
	newDiv.id = "result";

	var result = result[0].toUpperCase() + result.substring(1);

	if ( result == "Player" || result == "Dealer") newDiv.innerHTML  = result + " wins!";
	else newDiv.innerHTML  = result;

	account.appendChild(newDiv);

}	

/* purpose: clear the cards and deal a new hand
** arg:  void
** return: void
*/
function reset() {

	const timeout = setTimeout(clearEverything, 2000);

	if ( account > 0 ) {

		const timeout2 = setTimeout(main, 2200);
		const timeout3 = setTimeout(betButtons, 2000);
		bet = 0;
	}
	else endGame();

}

/* purpose: show dealer's hidden card to the screen 
** arg:  the dealer object
** return: void
*/
function showHiddenCard(dealer) {

	document.getElementById("row1-col0").innerHTML = "";
	displayCard("row1-col0", dealer.first.suit, dealer.first.position);

}

/* purpose:  re-orders all the card objects in the deck array
** arg:  an array of card objects
** return: a new array of card objects with a randomly generated order
*/
function shuffleDeck(Deck) {

	var numbers = [];
	var shuffled_numbers = [];
	var shuffledDeck = [];

	for ( i = 0; i < 52; i++ ) {

		numbers.push(i);

	}

	for ( j = 52; j > 0; j-- ) {

		var index = Math.floor(Math.random()*j)
		shuffled_numbers.push(numbers[index]);
		numbers.splice(index, 1);
		
	}

	for ( i = 0; i < shuffled_numbers.length; i++ ) {

		shuffledDeck.push(Deck[shuffled_numbers[i]]);
	}

	return shuffledDeck;
}

/* purpose:  builds rows, headers, and columns onto the page for two hands
** arg:  void
** return: void
*/
function startGame() {

	addRow('placemat', 'player-hand');
	addRow('placemat', 'dealer-hand');

	addHeader("player-hand", "Player's Hand", "player-header");
	addHeader("dealer-hand", "Dealer's Hand", "player-header");

	buildColumns("player-hand", 0);
	buildColumns("dealer-hand", 1);

}

/* purpose:  updates the amount of the account to the page
** arg:  void
** return: void
*/
function updateAccount(acct) {

	var node = document.getElementById("account");
	node.innerHTML = "Account: $" + acct;
	account = acct;

}