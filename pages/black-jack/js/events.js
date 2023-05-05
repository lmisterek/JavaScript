function createWagerEvents() {

	for ( i = 0; i < WAGERS.length; i++ ) {

		wager = document.getElementById(WAGERS[i]);

		if (wager) {

			wager.addEventListener('click', function() {		
				bet = parseInt(this.id);
				document.getElementById('bets').remove();
				if ( account - bet >= 0 ) {
					account -= bet;
					document.getElementById('account').innerHTML = "Account: $" + account;
					main();
				}
			});
		}
	}
}

function createHitEvent(button1_id, button2_id, player, dealer, Deck) {

	hitEvent = document.getElementById(button1_id);
	if ( hitEvent ) {

		hitEvent.addEventListener('click', function() {
		
			var card = Deck.shift();
			player.hand.push(card);
			
			i = player.hand.length - 1;
			displayCard("row0-col" + i, card.suit, card.position);

			if ( player.lowSum() > BJ ) {

				showHiddenCard(dealer);
				document.getElementById(button1_id).remove();
				document.getElementById(button2_id).remove();
				if( !split ) endRound("bust");

			}

		});
	}
}

function createStandEvent(button1_id, button2_id, player, dealer, Deck) {

	standEvent = document.getElementById("stand");
	if ( standEvent ) {

		standEvent.addEventListener('click', function() {

			document.getElementById(button1_id).remove();
			document.getElementById(button2_id).remove();
			
			while ( dealer.highSum() < STAND || dealer.lowSum() < STAND && dealer.highSum() > BJ ) { 
				var card = Deck.shift();
				dealer.hand.push(card);
				i = dealer.hand.length -1;
				displayCard("row1-col" + i, card.suit, card.position);
			}

				showHiddenCard(dealer);	
				var winner = determineWinner(player, dealer);
				if ( winner != null ) { endRound(winner);}
				else { endRound("tie");}
		
		});
	}
}