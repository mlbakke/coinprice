// SORTING TABLE
const ths = document.querySelectorAll('th');
// Sort table on th click
ths.forEach((th) => {
	th.addEventListener('click', () => {
		sortTable(th.dataset.key);
	});
});

function sortTable(n) {
	let rows,
		switching,
		i,
		x,
		y,
		shouldSwitch,
		dir,
		switchcount = 0;
	switching = true;
	/* Set sorting direction to default
        - Keep default and reverse sorting directions instead of desc/asc
          since we want desc as default for numbers and asc for tickers and names
    */
	dir = 'default';
	// Loop until no switching has been done
	while (switching) {
		// Start by saying: no switching is done:
		switching = false;
		rows = table.rows;
		// Loop through all table rows
		for (i = 0; i < rows.length - 1; i++) {
			// Start by saying there should be no switching:
			shouldSwitch = false;
			// Compare current row next
			x = rows[i].getElementsByTagName('TD')[n];
			y = rows[i + 1].getElementsByTagName('TD')[n];

			// If rows are name or ticker:
			if (n == 1 || n == 2) {
				// Check if the rows should switch place
				if (dir === 'reverse') {
					if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
						// If so, mark as a switch and break the loop:
						shouldSwitch = true;
						break;
					}
				}
				else if (dir === 'default') {
					if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
						// If so, mark as a switch and break the loop:
						shouldSwitch = true;
						break;
					}
				}
			}
			else {
				// For rows with numbers, create floats without currency sign and commas
				const xNum = parseFloat(x.innerHTML.replace(/[Ξ฿¥€£$,]/g, ''));
				const yNum = parseFloat(y.innerHTML.replace(/[Ξ฿¥€£$,]/g, ''));
				if (dir === 'reverse') {
					if (xNum > yNum) {
						shouldSwitch = true;
						break;
					}
				}
				else if (dir === 'default') {
					if (xNum < yNum) {
						shouldSwitch = true;
						break;
					}
				}
			}
		}
		if (shouldSwitch) {
			/* If a switch has been marked, make the switch
            and mark that a switch has been done: */
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			// Each time a switch is done, increase switchCount by 1
			switchcount++;
		}
		else {
			/* If no switching has been done AND the direction is "reverse",
            set the direction to "default" and run the while loop again. */
			if (switchcount == 0 && dir == 'default') {
				dir = 'reverse';
				switching = true;
			}
		}
	}
}
