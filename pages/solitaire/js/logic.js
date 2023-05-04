/*
**  purpose:	to determine if the chosen card can be played on a new column
**	args:		the layout object, the node related to the button pressed, 
				the column number
**	return:		boolean:  true if play is possible, false otherwise
*/
function checkForPlay(layout, node, column) {

	var lastCards = getLastCards(layout);
	var nextCards = getNextCards(lastCards);

	if ( checkForKing(node) ){
		layout.columns.forEach(column => {
			if(!column[0]) return true;
			else return false;
		});
		return true;
	}
	else if (nextCards.indexOf(node.innerText) != -1 ) {
		var toColumn = (nextCards.indexOf(node.innerText) + 1);
		if ( column == toColumn ) return false;
		else return true;
	}
	else if ( checkForHiddenCard(layout, node)) {
		
		layout.hidden=true;
		/* Check to see if the hidden card is in the last row */
		
		var row = node.id[1];
		if ( row ==  layout.columns[column-1].length ) {
			var card = layout.columns[column-1][row-1];
			node.innerText = card;
			var cutIndex = layout.hiddenCards.indexOf(card);
			layout.hiddenCards.splice(cutIndex, 1);

			return true;
		}
		else return false;

	}
	else return false;
}

/*
**  purpose:	to determine if the selected card is a hidden card from the node
**  args:		layout object and the node
**  return:		boolean, true if the node contains a hidden card, otherwise false
*/
function checkForHiddenCard(layout, node) {

	var row = node.id[1];
	var col = node.id[3];
	var rowIndex = row-1;
	var colIndex = col-1;
	var column = layout.columns[colIndex];
	var card = column[rowIndex];
	if ( isHidden(layout, card) ) return true;
	else return false;

}

/*
** purpose:		to determine if the chosen card is a king
** args:		node with row and column
** return:		boolean
*/
function checkForKing(node) {
	if (node.innerText[0] === 'K') return true;
	else return false;
}

/*
**  purpose:	to create a shuffled deck of chards with a position and a suit
**	args:		none
**	return:  	an array of 52 cards with a position and a suit written as two characters
*/
function createDeck() {
	
	var orderedDeck = [];
	var shuffledDeck = [];

	SUITS.forEach((suit) => {
		POSITIONS.forEach((position) => {
			orderedDeck.push(position+suit);
		});
	});

	for ( i = UPPER_BOUND; i > 0; i-- ) {
		var index = Math.floor(Math.random()*i);
		shuffledDeck.push(orderedDeck[index]);
		orderedDeck.splice(index, 1);
	}
	return shuffledDeck;
}

/*
**  purpose:	to create an object that holds three different arrays of cards from 52 cards
**  args:		an array of shuffled deck of cards
**  return:		an object that holds three arrays for three different data types in the game
*/
function createLayout(DECK) {

	var fourCols = [];
	var threeCols = [];
	var mysteryCards = [];
	var index = 0;

	for ( i = 0; i < 4; i++ ) {
		var newCol = [];
		for ( j = 0; j < 7; j++) {
			newCol.push(DECK[index]);
			index++;
		}
		fourCols.push(newCol);
	}

	for ( i = 0; i < 3; i++ ) {
		var newCol = [];
		for ( j = 0; j < 7; j++) {
			newCol.push(DECK[index]);
			index++;
		}
		threeCols.push(newCol);
	}

	for ( i = 0; i < 3; i++) {
		mysteryCards.push(DECK[index]);
		index++;
	}

	var hiddenCards = [];

	for ( i = 0; i < 3; i++) {
		for ( j = 0; j < 3; j++) {
			hiddenCards.push(threeCols[i][j]);
		}
	}

	var layout = {
		"columns":	[ fourCols[0],
			fourCols[1], fourCols[2],
			fourCols[3], threeCols[0],
			threeCols[1], threeCols[2]],
		"mysteryCards": mysteryCards,
		"hiddenCards": hiddenCards,
		"hidden": false,
		"showing":  [0, 0, 0],
		"played": [0, 0, 0]
	}

	return layout;
}

/*
**  purpose:	to create a Matrix of the rows from the column matrix
**  args:		the column matrix
**	return:		none
*/
function createRowMatrix(columns) {

	var rows = [];
	for ( j = 0; j < getMax(columns); j++ ) {
		var newRow = [];
		for ( i = 0; i < 7; i++ ) {
			newRow.push(columns[i][j]);
		}
		rows.push(newRow);
	}
	return rows;
}

/*
**  purpose:	to cut off a portion of the end of an array from the array
**  args:		array, the index from which to cut off the end
**	return:		the new array, less the portion cut off
*/
function cutColumn(array, cutIndex) {
	var subArray = [];
	array.forEach((element, index) => {
		if ( index < cutIndex ) subArray.push(element);
	});

	return subArray;
}

/*
** purpose:		to get the end cards from each column
** args:		the setup object
** return:		an array with seven card values or undefined
*/
function getLastCards(layout) {
	var lastCards = [];
	var columns = layout.columns;
	for ( const column in columns) {
		var currentCol = columns[column];
		var index = currentCol.length - 1;
		if ( index >= 0 )lastCards.push(columns[column][index]);
		else lastCards.push('');
	}
	if (layout) return lastCards;
	else return null;
}

function getMax(columns) {

	var max = 0;
	columns.forEach( column => {
		if ( column.length > max ) max = column.length;
	});

	return max;
}

/*
**  purpose:	to create an array of the cards that follow the bottom cards in the sequence
**  args:		an array of the last card in each row
**  return:  	the array of cards that follow the endpoints
*/
function getNextCards(endPoints) {

	var nextCards = [];
	endPoints.forEach((card) => {
		var cardNum = 0;
		var nextCard = '';

		/* Keep an empty slot for a new column, next card may be one of four kings */
		if (!card) { nextCards.push(''); }

		/* If the card number is 10, the next card will be a 9 */
		else if ( card[0] === '1' ) { nextCards.push('9' + card[2]); }

		/* If the card number is 2, the next card will be an Ace */
		else if ( card[0] === '2' ) { nextCards.push('A' + card[1]); }

		/* If the card is a Jack, the next card will be a 10 */
		else if ( card[0] === 'J') { nextCards.push('10' + card[1]); }

		/* If the card is an Ace, the next card will not exist */
		else if ( card[0] === 'A') { nextCards.push(''); }

		/* If the card is a Queen, the next card will be a Jack */
		else if ( card[0] === 'Q') { nextCards.push('J' + card[1]); }

		/* If the card is a King, the next card will be a Queen */
		else if ( card[0] === 'K') { nextCards.push('Q' + card[1]); }
		else {
			var num = parseInt(card[0]) - 1;
			num = num + "";
			nextCard = '' + num + card[1];
			nextCards.push('' + num + card[1]);
		}
	});
	return nextCards;
}

/*
**	purpose:	to return the node corresponding to the given row and column number
**	args:  		row number, column number
**	return:		the node given by the particular id, null if no such node exists
*/
function getNode(row, col) {

	var id = "r" + row + "c" + col;
	var node = document.getElementById(id);
	if ( node ) return node;
	return null;
}

/*
**  purpose:	to determine if a card is turned down
**	args:		the layout object, and the card string
**  return:		boolean, true if the card is hidden, false, otherwsie
*/
function isHidden (layout, card) {

	if ( layout.mysteryCards.indexOf(card) == -1 && layout.hiddenCards.indexOf(card) == -1 )
		return false;
	else return true;
}


/*
**  purpose:	to return an ordered subarray from an array
**  args:		the array, starting index, ending index
**  return:		the subarray
*/
function returnSlice(array, firstIndex, secondIndex) {
	
	var slice = [];
	array.forEach((element, index) => {
		if ( index >= firstIndex && index <= secondIndex ) slice.push(element);
	});
	return slice;
}

/*
**  purpose:	to change the columns in layout by moving a piece to a new column
**	args:		layout object, the row and column number of the card that will be moved
**  return:		none
*/
function updateLayout(layout, rowIndex, columnIndex) {

	/* Handle the Hidden Card */
	if (layout.hidden) {layout.hidden = false; return;}

	/* King Case */
	var node = getNode((rowIndex+1), (columnIndex+1));

	if (node.innerText[0] == 'K') {
		
		/* get the piece starting with the king */
		var lowIndex = layout.columns[columnIndex].length-1;
		var beginning = layout.columns[columnIndex][rowIndex];
		var end = layout.columns[columnIndex][lowIndex];
		var piece = [];
		for ( i = rowIndex; i <=lowIndex; i++) {
			piece.push(layout.columns[columnIndex][i]);
		}

		/* change the column with an undefined position */
		var toColumnIndex = null;	
		layout.columns.forEach((column, index) => {
			if (!column[0]) toColumnIndex = index;
		});
		layout.columns[toColumnIndex] = piece;

		/* shorten the column containing the king */
		var smallColumn = cutColumn(layout.columns[columnIndex], rowIndex);
		layout.columns[columnIndex] = smallColumn;

	}
	/* The card is not a King */
	else {
		var row = rowIndex+1;
		var column = columnIndex+1;
		var fromId = "r" + row + "c" + column;

		var lastCards = getLastCards(layout);
		var nextCards = getNextCards(lastCards);
		var toColumnIndex = nextCards.indexOf(node.innerText);
		
		var newCol = layout.columns[toColumnIndex];
		var newRow;
		if ( newCol.length > 0 ) newRow = newCol.length + 1;
		else newRow = 1;
		var toId = "r" + newRow + "c" + (toColumnIndex + 1);

		var columns = layout.columns;
		var smallColumn = cutColumn(columns[columnIndex], (row-1));
		var slice = returnSlice(columns[columnIndex], (row-1), (columns[columnIndex].length-1));
		var longColumn = columns[toColumnIndex].concat(slice);
		
		/* change columns in the layout object */
		columns[columnIndex] = smallColumn;
		columns[toColumnIndex] = longColumn;
	}
}
