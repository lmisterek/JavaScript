function createButtonCards(rows_array, hiddenArray) {

	rows_array.forEach((row, i) => {
		row.forEach((card, j) => {
			var id = "r" + (i+1) + "c" + (j+1);
			var button = document.createElement("button");
			button.setAttribute("id", id);
			button.setAttribute("style", "width:12%");
			if ( hiddenArray.indexOf(card) != -1 ) button.innerText = '\u00A0';
			else if ( card ) { button.innerText = card;}
			var parentId = "buttons" + (i+1);
			document.getElementById(parentId).appendChild(button);
		});
	});
}

/*
**  purpose:	to create rows to hold buttons dynamically
**  args:		an integer in [0, 52] representing the number of rows to be built
**  return:		none
*/
function buildRows(n) {

	if ( n > UPPER_BOUND ) return;
	for ( i = 1; i <= n; i++ ) {

		var div1 = document.createElement("div");
		var id = "row-" + i;
		div1.setAttribute("id", id);
		div1.setAttribute("class", "row");

		var diva = document.createElement("div");
		diva.setAttribute("class", "one column");
		div1.appendChild(diva);

		var divb = document.createElement("div");
		var id = "buttons" + i;
		divb.setAttribute("id", id);
		divb.setAttribute("class", "eight columns");
		div1.appendChild(divb);

		var divc = document.createElement("div");
		divc.setAttribute("class", "three column");
		div1.appendChild(divc);
		div1.appendChild(divc);

		document.getElementById("placemat").appendChild(div1);
	}
}


function hideCards(rows) {
	rows.forEach((row, rowIndex) => {
		row.forEach((card, colIndex) => {
			if (!card ) {
				var node = getNode((rowIndex+1), (colIndex+1));
				node.style.visibility = "hidden";

			}
		});
	});
}

/*
**  purpose:	to place the mystery cards at the bottom of the screent
**  args:		the layout object
**	return:		none
*/
function placeMysteryCards(layout) {

	var parentNode = document.getElementById("container");
	var div = document.createElement("div");
	div.setAttribute("id", "mysteryCardRow");
	div.setAttribute("class", "row");
	div.setAttribute("style", "padding-top:20px");

	var divA = document.createElement("div");
	divA.setAttribute("class", "one column");

	var divB = document.createElement("div");
	divB.setAttribute("id", "mysteryCards");
	divB.setAttribute("class", "eight columns");

	var divC = document.createElement("div");
	divC.setAttribute("class", "three columns");

	var cards = layout.mysteryCards;
	cards.forEach((card, index) => {
		var button;
		if ( layout.played[index] == 0 ) {
			var id = "rMc" + (index+1);
			button = document.createElement("button");
			button.setAttribute("id", id);
			button.setAttribute("style", "width:12%");
			divB.appendChild(button);
			if ( layout.showing[index] == 1 ) button.innerText = card;
		}
	});
	
	div.appendChild(divA);
	div.appendChild(divB);
	div.appendChild(divC);
	parentNode.appendChild(div);

	

}