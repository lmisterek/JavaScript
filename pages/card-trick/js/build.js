/* purpose:  builds the first page dynamically */
function ButtonSpace() {
	
	var directions = document.getElementById("directions");

	if (directions) directions.innerText = "Select any five cards.";
	else {

		/* build paragraph tag */
		var paragraph = document.createElement('p');
		paragraph.setAttribute("id", "directions");
		paragraph.innerText = "Select any five cards.";
		var container = document.getElementById("container");
		if ( container ) container.appendChild(paragraph);
	}
	
	var container = document.getElementById("container");

	/* build selection div */
	var newRow = document.createElement("div");
	newRow.setAttribute("id", "user_input");
	newRow.classList.add("row");
	if ( container ) container.appendChild(newRow);

	for ( i = 0; i < 52; i++) {
		var id = "selection-" + i;
		var button = document.createElement("button");
		button.setAttribute("id", id);
		button.classList.add("card_button");
		if (newRow) newRow.append(button);
	}
}

/* purpose: builds the space for the buttons and dropdown to interact with input */
function ActionSpace() {

	document.getElementById("directions").innerText = "Guess the missing card."; 

	/* Build the row for the solution dynamically */
	var inputRow = document.createElement("div");
	inputRow.setAttribute("id", "row-2");
	inputRow.classList.add("row");
	document.getElementById("container").appendChild(inputRow);

	/* Create first column -  1-2 of 12 */
	var firstCol = document.createElement("div");
	firstCol.classList.add("two");
	firstCol.classList.add("columns");
	inputRow.appendChild(firstCol);

	/* Create second column length 3-4 of 12 */
	var secondCol = document.createElement("div");
	secondCol.classList.add("two");
	secondCol.classList.add("columns");
	inputRow.appendChild(secondCol);

	var select = document.createElement("select");
	select.setAttribute("name", "suit");
	select.setAttribute("id", "suits");
	secondCol.appendChild(select);

	for ( i = 0; i < 4; i++) {
		var option = document.createElement("option");
		option.setAttribute("value", SUITS[i]);
		var suit = SUITS[i];
		suit = SUITS[i].charAt(0).toUpperCase() + SUITS[i].slice(1);
		option.innerText = suit;
		select.appendChild(option);
	}

	/* Create third column 5-6 of 12 */
	var thirdCol = document.createElement("div");
	thirdCol.classList.add("two");
	thirdCol.classList.add("columns");
	inputRow.appendChild(thirdCol);

	var select2 = document.createElement("select");
	select2.setAttribute("name", "position");
	select2.setAttribute("id", "positions");
	thirdCol.appendChild(select2);

	var option = document.createElement("option");
	option.setAttribute("value", "A");
	option.innerText = "A";
	select2.appendChild(option);

	for ( i = 2; i <= 10; i++) {
		var option = document.createElement("option");
		option.setAttribute("value", i);
		option.innerText = i;
		select2.appendChild(option);
	}

	var faceCards = ["J", "Q", "K"];
	for ( i = 11; i <= 13; i++) {
		var option = document.createElement("option");
		option.setAttribute("value", faceCards[i-11]);
		option.innerText = faceCards[i-11];
		select2.appendChild(option);
	}

	/* Create fourth column 7-8 of 12 */
	var fourthCol = document.createElement("div");
	fourthCol.classList.add("two");
	fourthCol.classList.add("columns");
	inputRow.appendChild(fourthCol);

	var button = document.createElement("button");
	button.setAttribute("id", "guess");
	button.innerText = "Submit Guess";
	fourthCol.append(button);

	/* Create fifth column 9-10 of 12 */
	var fifthCol = document.createElement("div");
	fifthCol.classList.add("two");
	fifthCol.classList.add("columns");
	inputRow.appendChild(fifthCol);

	var button = document.createElement("button");
	button.setAttribute("id", "show");
	button.innerText = "Show Solution";
	fifthCol.append(button);
	inputRow.appendChild(fourthCol);

	/* Create fifth column 11-12 of 12 */
	var sixthCol = document.createElement("div");
	sixthCol.classList.add("two");
	sixthCol.classList.add("columns");
	inputRow.appendChild(fifthCol);
}

/* purpose:  builds the page showing the four cards dynamically */
function SolutionSpace() {
	/* Build the row for the solution dynamically */
	var solutionRow = document.createElement("div");
	solutionRow.setAttribute("id", "row-1");
	solutionRow.classList.add("row");
	document.getElementById("container").appendChild(solutionRow);

	var firstCol = document.createElement("div");
	firstCol.classList.add("one");
	firstCol.classList.add("column");
	solutionRow.appendChild(firstCol);

	for ( i = 0; i < 5; i++) {
		var id = "sol-" + (i+1);
		var nextDiv = document.createElement("div");
		nextDiv.setAttribute("id", id);
		nextDiv.classList.add("two");
		nextDiv.classList.add("columns");
		solutionRow.appendChild(nextDiv);
	}

	var lastCol = document.createElement("div");
	lastCol.classList.add("one");
	lastCol.classList.add("column");
	solutionRow.appendChild(lastCol);
}