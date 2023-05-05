document.body.onload = main();

function main() {

	/* Setup */
	var DECK = createDeck();
	var layout = createLayout(DECK);
	play(layout);
	
}

/* 
**  purpose:	a function to make the click events recursive 
**  args:		the layout object
**  return:		none
*/
function play(layout) {

	var rows = createRowMatrix(layout.columns);
	buildRows(rows.length);
	createButtonCards(rows, layout.hiddenCards);
	hideCards(rows);
	placeMysteryCards(layout);

	rows.forEach((row, i) => {
		row.forEach((col, j) => {
			var node = getNode((i+1), (j+1));
			if (node) node.addEventListener("click", event => {
				if (checkForPlay(layout, node, (j+1))) {
					updateLayout(layout, i, j);
					document.getElementById("placemat").innerHTML = "";
					document.getElementById("mysteryCardRow").remove();
					play(layout);
				}
				else alert("Invalid Play.");
			});
		});
	});

	
	/* Click Events for Mystery Cards */
	layout.mysteryCards.forEach((card, index) => {
		var id = "rMc" + (index+1);
		var node = document.getElementById(id);
		if (node) node.addEventListener("click", event => {
			if ( layout.showing[index] == 0 ) {  
				node.innerText = card;			/* show the card */
				layout.showing[index] = 1;		/* change the card status to showing */
			}
			else {
				var lastCards = getLastCards(layout);		/* retrieve an array of the bottom cards */
				var colIndex = null;					/* column index to play the card */
				
				/* King Case */
				if ( card[0] == 'K') {
					lastCards.forEach((bottomCard, j) => {
						if (!bottomCard && card[0] == 'K') {
							layout.columns[j][0] = card;
							layout.played[index] = 2;
							document.getElementById("placemat").innerHTML = "";
							document.getElementById("mysteryCardRow").remove();
							play(layout);
						}
					});
				}
				else {
					var nextCards = getNextCards(lastCards);
					var toIndex = nextCards.indexOf(card);
					
					if ( toIndex != -1 ) {
						layout.columns[toIndex][layout.columns[toIndex].length] = card;
						layout.played[index] = 2;
						document.getElementById("placemat").innerHTML = "";
						document.getElementById("mysteryCardRow").remove();
						play(layout);
					}
					else alert("Not a valid play.");
				}
			}
		});
	});
}