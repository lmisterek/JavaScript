/* purpose: this action (function) calculates the difference between the cards and
			returns the cards as ( low, high ) if the difference is between 
			one and six.  Otherwise, the cards are returned as ( high, low )
** arg:  	an array with two elements: two cards of the same suit
** return: 	an array with two elements:  the two cards of the same suit, ordered
*/
function arrangePair(pair) {
	/* if the position is a face card, then store the numerical value of the face
			card { A = 1, J = 11, Q = 12, K = 13 } */
	var first = toNumericalValue(pair[0].position);
	var second = toNumericalValue(pair[1].position);
	var difference = second-first;
	var condition1 = difference < 7 && difference >= 0;
	var condition2 = difference <= -7;
	if ( condition1 || condition2 ) return pair;
	else return [pair[1], pair[0]];
}

/* purpose: creates a deck of cards with the order spades, hearts, diamonds, 
** 			clubs (ace - king)
** arg:  	none
** return: 	an array of card objects
*/
function buildDeck() {

	var Deck = [];
	var Positions = [ACE];
	
	for ( i = 2; i < 11; i++ ) { Positions.push(i);}
	Positions.push(JACK);
	Positions.push(QUEEN);
	Positions.push(KING);

	for ( suit in SUITS ) {
		for ( i in Positions ) {
			var newCard = new Card(SUITS[suit], Positions[i]);
			Deck.push(newCard);
		}
	}
	return Deck;
}

/* purpose: Determines whether or not there is a pair of cards for each suit
** arg:  	an array of five cards and a suit written as ( 'spades', 'hearts', 
			'diamonds', 'clubs')
** return: 	true or false
*/
function checkSuit(five_cards, suit) {
	var suit_ct = 0;
	for ( i = 0; i < five_cards.length; i++ ) {
		if ( suit == five_cards[i].suit ) suit_ct++;
		if ( suit_ct >= 2 ) return true;
	}
	return false;
}

/* purpose: To find the two cards with the same suit in the set of five cards
** arg:  	Set of five cards, given suit
** return: 	an array with two members, each a Card object
*/
function createPair(five_cards, suit) {
	var pair = [];
	var num = 0;
	for ( i = 0; i < five_cards.length; i++ ) {
		if ( five_cards[i].suit == suit ) {
			pair.push(five_cards[i]); 
			num++;
		}
		if ( num == 2 ) return pair; 
	}
	return null;
}

/* purpose: to return an array of three cards that will be used for 2-4 cards
			in the solution
** arg:  	an array of five card objects, a pair of card objects
** return: 	an array of three card objects
*/
function createTriple(hand, pair) {
	var quartet = [];
	var pOne = hand.indexOf(pair[0]);
	var pTwo = hand.indexOf(pair[1]);
	var triple = removeCards(hand, pOne, pTwo);
	return triple;
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
	
	
	var lastDiv = document.createElement('div');
	lastDiv.classList.add("card-body");
	lastDiv.innerHTML = position;
	
	nextDiv.appendChild(lastDiv);
	document.getElementById(id).appendChild(nextDiv);
	nextDiv.appendChild(img);
	document.getElementById(id).appendChild(nextDiv);

}

/* purpose: to return the suit that has a pair of cards in the set of five cards
** arg:  	an array of five Cards from a deck
** return: 	the first suit with a pair
*/
function findSuit(hand) {

	if (checkSuit(hand, 'spades')) return 'spades';
	else if (checkSuit(hand,'hearts')) return 'hearts';
	else if (checkSuit(hand, 'diamonds')) return 'diamonds';
	else if (checkSuit(hand, 'clubs')) return 'clubs';
}

/* purpose: to setup for an initial round
** arg:  	
** return: 	a deck of 52 cards
*/
function init() {
	var orderedDeck = buildDeck();
	var Deck = shuffleDeck(orderedDeck);
	return Deck;
}

/* purpose:  to return three cards ordered numerically, and then by suit
** arg:  	an array of three cards
** return:  an array of three cards
*/
function orderTriple123(triple) {
	
	var one = toNumericalValue(triple[0].position);
	var two = toNumericalValue(triple[1].position);
	var three = toNumericalValue(triple[2].position);
	var values = [one, two, three];
	values.sort(function(a, b){return a - b});
	var ordered_triple = [];

	var new_triple = triple;
	for ( j = 0; j < 3; j++) {
		if ( values[0] == toNumericalValue(new_triple[j].position)) {
			ordered_triple.push(new_triple[j]);
			new_triple[j] = null;
			break;
		}
	}

	for ( j = 0; j < 3; j++ ) {
		if ( new_triple[j] && values[1] == toNumericalValue(new_triple[j].position)) {
			ordered_triple.push(new_triple[j]);
			new_triple[j] = null;
			break;
		}
	}

	for ( j = 0; j < 3; j++ ) {
		if ( new_triple[j] && values[2] == toNumericalValue(new_triple[j].position)) {
			ordered_triple.push(new_triple[j]);
			new_triple[j] = null;
			break;
		}
	}

	// order with suit after number
	one = toNumericalValue(ordered_triple[0].position);
	two = toNumericalValue(ordered_triple[1].position);
	three = toNumericalValue(ordered_triple[2].position);

	var triple = [];
	
	if ( one == two && two == three ) {
		for ( i = 0; i < 3; i++) {
			if ( ordered_triple[i].suit == 'clubs') triple.push(ordered_triple[i]);
		}
		for ( i = 0; i < 3; i++) {
			if ( ordered_triple[i].suit == 'diamonds') triple.push(ordered_triple[i]);
		}
		for ( i = 0; i < 3; i++) {
			if ( ordered_triple[i].suit == 'hearts') triple.push(ordered_triple[i]);
		}
		for ( i = 0; i < 3; i++) {
			if ( ordered_triple[i].suit == 'spades') triple.push(ordered_triple[i]);
		}
		return triple;
	}
	else if ( one == two ) {
		var exchange = false;
		if ( ordered_triple[0].suit == "spades") exchange = true;
		else if ( ordered_triple[0].suit == 'hearts' && ordered_triple[1].suit == 'diamonds') 
			{exchange = true}
		else if ( ordered_triple[0].suit == 'hearts' && ordered_triple[1].suit == 'clubs') 
			{exchange = true}
		else if ( ordered_triple[0].suit == 'diamonds' && ordered_triple[1].suit == 'clubs')
			{exchange = true}
		if ( exchange ) return [ordered_triple[1], ordered_triple[0], ordered_triple[2]];
		else return ordered_triple;
	}
	else if ( two == three ) {
		var exchange = false;
		if (ordered_triple[1].suit == 'spades') exchange = true;
		else if ( ordered_triple[1].suit == 'hearts' && ordered_triple[2].suit == 'diamonds') 
			{exchange = true;}
		else if ( ordered_triple[1].suit == 'hearts' && ordered_triple[2].suit == 'clubs')
			{exchange = true;}
		else if ( ordered_triple[1].suit == 'diamonds' && ordered_triple[2].suit == 'clubs')
			{exchange = true; }
		if ( exchange ) return [ordered_triple[0], ordered_triple[2], ordered_triple[1]];
		else return ordered_triple;
	}
	else return ordered_triple;
}

/* purpose: this function will return the permutation index corresponding to the difference
** arg:  	an array of two cards
** return: 	the permutation index for the ordered triple, a number 0 to 5
*/
function permIndex(pair) {
	var first = toNumericalValue(pair[0].position);
	var second = toNumericalValue(pair[1].position);
	var difference = second - first;
	if ( difference <= 6 && difference >= 0) {
		return difference-1;
	}
	else return difference+12;
}

/* purpose:  	this returns the triple arranged with a particular permutation 
**				of order three
** arg:			an array of size three cards, and an index from 0 to 5
** return:		the triple rearranged based on the permutation
*/
function permuteTriple(triple, index) {
	var permutationArray = PERMS[index];
	var arrangedTriple = [];
	for ( i = 0; i < triple.length; i++ ) {
		var card = triple[permutationArray[i]];
		arrangedTriple.push(card);
	}
	return arrangedTriple;
}

function placeFourCards(solution) {
	for ( i = 1; i <= SOL_INDEX; i++ ) {
		var id = 'sol-' + i;
		displayCard(id, solution[i-1].suit, solution[i-1].position);
	}
}

/*  purpose: to arrange the five cards with the first part of the pair
**			 in the front and the second part of the pair in last, and
**			 and the three cards in the middle	
**  args:  	 the pair and the triple in correct order
**	return:  to return an array with the five card solution
*/
function positionCards(pair, triple) {
	var five = [];
	five[0] = pair[0];
	triple.forEach((item) => {
		five.push(item);
	});
	five[4] = pair[1];
	return five;
}

/* purpose: to return a new array with two cards removed
** arg:  	an array of card objects and an index to remove
** return: 	the array with one less card
*/
function removeCards(cards, index1, index2 ) {
	var first = index1;
	var second = index2;
	if ( index2 < index1 ) {
		first = index2;
		second = index1;
	}
	const quartet = cards.filter((card, index) => index != second );
	const triple = quartet.filter((card, index) => index != first );
;	return triple;
}

/* purpose: returns five cards from the given indices
** arg:  	Deck object, an array of five indices betwen 0 and 51
** return: 	an array of the five cards corresponding to the given indices
*/
function selectCards(Deck, indices) {
	var five_cards = [];
	for ( i = 0; i < indices.length; i++ ) {
		five_cards.push(Deck[indices[i]]);
	}

	return five_cards;
}

/* purpose: re-orders all the card objects in the deck array
** arg:  	an array of card objects
** return: 	a new array of card objects with a randomly generated order
*/
function shuffleDeck(Deck) {

	var numbers = [];
	var shuffled_numbers = [];
	var shuffledDeck = [];

	for ( i = 0; i < DECK; i++ ) {
		numbers.push(i);
	}

	for ( j = DECK; j > 0; j-- ) {
		var index = Math.floor(Math.random()*j)
		shuffled_numbers.push(numbers[index]);
		numbers.splice(index, 1);
	}

	for ( i = 0; i < shuffled_numbers.length; i++ ) {

		shuffledDeck.push(Deck[shuffled_numbers[i]]);
	}

	return shuffledDeck;
}

/* purpose:  to return the value of a card based on numeriical value
			 A King has value 13, a queen has value 12, 
			 a jack 11, and an Ace has the value 1.
** arg:  	The position of a card, a numerical value or a character in the 
			set { A, J, Q, K }
** return: 	a numerical value in the interval [1, 13] based on the card position
*/
function toNumericalValue(position) {
	var value = 0;
	if (position == ACE) value = 1;
	else if (position == JACK) value = 11;
	else if (position == QUEEN) value = 12;
	else if (position == KING) value = 13;
	else value = position;

	return value;
}