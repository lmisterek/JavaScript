document.body.onload = main();

function main() {

	var Deck = init();  
	ButtonSpace();
	var num_cards = 0;  var indices = []; var solution = [];

/***************** Click Events *********************************************************/
	
	/* The Click Event for each card */
	for ( var i = 0; i < DECK; i++ ) {
		var id = "selection-" + i;  var card_click = document.getElementById(id);
		if ( card_click ) card_click.addEventListener('click', function() {
			var index = this.id[FIRST_DIGIT];
			if ( this.id[SECOND_DIGIT ] ) index = this.id[FIRST_DIGIT] + this.id[SECOND_DIGIT ];		
			if ( indices.indexOf(index) == -1 ) {indices.push(index); num_cards++;}
			if ( num_cards < SOLUTION  ) {this.setAttribute("style", "padding-bottom: 5px;"); }
			else if ( num_cards == SOLUTION ) {
				
				document.getElementById("directions").innerText = ""; 
				document.getElementById("user_input").remove();

				/* Select and Display Cards with Guess Dropdown and Buttons */
				var hand = selectCards(Deck, indices);
				var suit = findSuit(hand);
				var pair = createPair(hand, suit);
				var arranged_pair = arrangePair(pair);
				var triple = createTriple(hand, arranged_pair);
				var ordered_triple = orderTriple123(triple);
				var perm = permIndex(arranged_pair);
				var permuted_triple = permuteTriple(ordered_triple, perm);			
				solution = positionCards(arranged_pair, permuted_triple);

				SolutionSpace();
				placeFourCards(solution);
				ActionSpace();

				/* Process User Guess */
				var guess = document.getElementById("guess");
				if ( guess ) guess.addEventListener('click', function() {
					var suit = document.getElementById("suits");
					var guessed_suit = suit.value
					var positions = document.getElementById("positions");
					var guessed_position = positions.value;

					var correct_position = false;  var correct_suit = false;
					if (guessed_position == solution[SOL_INDEX].position ) correct_position = true;
					if ( guessed_suit == solution[SOL_INDEX].suit ) correct_suit = true;

					if ( !correct_position || !correct_suit ) 
						alert("The answer is not correct.  Please try again.");
					else {
						alert("Correct!");
						document.getElementById("row-1").remove(); 
						document.getElementById("row-2").remove();
						document.getElementById("directions").innerText = "";
						main();

					}
				});


			}
			var show = document.getElementById("show");
			if ( show ) show.addEventListener('click', function() {
				displayCard("sol-5", solution[4].suit, solution[4].position);
			});
		});
	}

	
}