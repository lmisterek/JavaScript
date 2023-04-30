const BJ = 21;
const STAND = 17;
const TEN = 10;
const WAGERS = [1, 2, 10, 50, 100, 500, 1000];
const FACECARDS = ["J", "Q", "K"];
const ACE = 'A';

var split = false;
var first = true;
var bet = 0;
var account = 500;

class Card {

	constructor ( suit, position )
	{
		this.suit = suit;
		this.position = position;
	}
}

class Player {

	constructor ( id, first, second )
	{
		
		this.id = id;
		this.first = first;
		this.second = second;
		this.hand = [this.first, this.second];
		this.split = [];
	}
	hasAce() {
		var hand = this.hand;
		for ( i = 0; i < hand.length; i++ ) 
		{ if ( hand[i].position == ACE ) return true; }
		return false;
	}
	highSum() { 

		if (this.hasAce() ) return (this.lowSum() + 10);
		else return this.lowSum();
	}
	lowSum() {

		var sum = 0;
		var hand = this.hand;

		for ( i = 0; i < hand.length; i++ ) {

			if ( FACECARDS.indexOf(hand[i].position) != -1 ) sum+= 10; 
			else if ( hand[i].position == ACE ) sum++;
			else {
				var value = parseInt(hand[i].position);
				sum+= value;
			}
		
		}

		return sum;

	}

}