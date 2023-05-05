/* Arrays */
const SUITS = ["C", "D", "H", "S"];
const POSITIONS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const UPPER_BOUND = 52;



const LAYOUT = {
		"columns":	[ 
			['3S', 'KC', '4D', 'QH', '7D', '10S', '2D'],
			['3H', 'KD', '9D', '4C', '8C', '5D', 'AC'], 
			['10H', '4H', '9S', '5H', '3C', '9C', 'JC'],
			['JD', '5S', '4S', '9H', '10D', '8S', 'JH'], 
			['7S', '2H', 'QS', '6C', '6S', '6H', '2C'], 
			['KS', 'QC', '10C', '8H', '3D', '8D', 'KH'],
			['7C', 'AH', '6D', '2S', 'QD', 'AS', '5C'],
			],
		"mysteryCards": ['AD', '7H', 'JS'],
		"hiddenCards": ['7S', '2H', 'QS', 'KS', 'QC', '10C', '7C', 'AH', '6D'],
		"hidden": false,
		"showing":  [0, 0, 0],
		"played": [0, 0, 0]
	};