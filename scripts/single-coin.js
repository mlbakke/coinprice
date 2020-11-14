async function getSingleCoin() {
    //coin to look up
    const coinId = 'bitcoin';
	//fetch coin information
	const coin = await axios
		.get(
			`https://api.coingecko.com/api/v3/coins/${coinId}?vs_currency=${currency}`
		)
		.catch((err) => {
			if (err.response.status === 404) {
				return null;
			}
			throw err;
		});
	//print coin data
    console.log(coin.data);
    printSingleCoin(coin.data);
}

function printSingleCoin(coin) {
    const heading = document.querySelector('.coin-stats__heading');
    heading.innerHTML = `<div class=coin-stats__heading--left>
                            <img src="${coin.image.small}" alt="${coin.name} logo" class="coin-stats__heading--logo"></img>
                            <h4 class="coin-stats__heading--name">${coin.name}</h4>
                            <h4 class="coin-stats__heading--ticker">(${coin.symbol.toUpperCase()})</h4>
                        </div>
                        <div class=coin-stats__heading--right>
                            ${currencySign}${separateThousands(coin.market_data.current_price[currency])}
                        </div>`;
}
getSingleCoin();