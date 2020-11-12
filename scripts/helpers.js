function toDecimals(num, dec) {
	if (num === null) {
		return '-';
	}
	return num.toFixed(dec);
}

function isPositive(el) {
	// Check if number in an element is positive/negative
	const float = parseFloat(el.textContent);
	if (float > 0) {
		el.classList.add('positive');
	}
	else if (float == 0) {
		el.classList.add('neutral');
	}
	else {
		el.classList.add('negative');
	}
	return;
}

function separateThousands(x) {
	return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}

// CHANGE CURRENCY
const currencyChoices = document.querySelectorAll('.currency-choice');
currencyChoices.forEach((currencyChoice) => {
	currencyChoice.addEventListener('click', () => {
		currencySign = currencyChoice.dataset.symbol;
		currency = currencyChoice.dataset.code;
		table.innerHTML = '';
		page = 1;
		getCoins();
	});
});