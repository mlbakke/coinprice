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
    printCoinLinks(coin.data.links);
    printSingleCoin(coin.data);
}

function printCoinLinks(coin) {
    const links = document.querySelector('.coin-stats__info--links');
    //WEBSITE
    if (coin.homepage[0].includes('http')) {
        const anch = document.createElement('a');
        anch.setAttribute("href", `${coin.homepage[0]}`);
        const anchNode = document.createTextNode("Website");
        anch.classList.add('coin-stats__info--link');
        anch.appendChild(anchNode);
        links.appendChild(anch);
    }
    //EXPLORER
    if (coin.blockchain_site[0].includes('http')) {
        const anch = document.createElement('a');
        anch.setAttribute("href", `${coin.blockchain_site[0]}`);
        const anchNode = document.createTextNode("Explorer");
        anch.classList.add('coin-stats__info--link');
        anch.appendChild(anchNode);
        links.appendChild(anch);
    }
    //SOURCE CODE
    if (coin.repos_url.github[0].includes('http')) {
        const anch = document.createElement('a');
        anch.setAttribute("href", `${coin.repos_url.github[0]}`);
        const anchNode = document.createTextNode("Source Code");
        anch.classList.add('coin-stats__info--link');
        anch.appendChild(anchNode);
        links.appendChild(anch);
    }
    //FORUMS
    if (coin.official_forum_url[0].includes('http')) {
        const anch = document.createElement('a');
        anch.setAttribute("href", `${coin.repos_url.github[0]}`);
        const anchNode = document.createTextNode("Forums");
        anch.classList.add('coin-stats__info--link');
        anch.appendChild(anchNode);
        links.appendChild(anch);
    }
    //SUBREDDIT
    if (coin.subreddit_url.includes('http')) {
        const anch = document.createElement('a');
        anch.setAttribute("href", `${coin.repos_url.github[0]}`);
        const anchNode = document.createTextNode("Subreddit");
        anch.classList.add('coin-stats__info--link');
        anch.appendChild(anchNode);
        links.appendChild(anch);
    }

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

    const priceChange = document.querySelector('.coin-stats__info--price-change');
    priceChange.innerHTML = `
            <h5 class="heading__quinary">Price Changes<h5>
            <div class="coin-stats__info--change-overview">
                <div>1h: <span class="coin-change">${toDecimals(coin.market_data.price_change_percentage_1h_in_currency[currency], 2)}%</span></div>
                <div>1d: <span class="coin-change">${toDecimals(coin.market_data.price_change_percentage_24h_in_currency[currency], 2)}%</span></div>
                <div>1w: <span class="coin-change">${toDecimals(coin.market_data.price_change_percentage_7d_in_currency[currency], 2)}%</span></div>
                <div>1m: <span class="coin-change">${toDecimals(coin.market_data.price_change_percentage_30d_in_currency[currency], 2)}%</span></div>
                <div>1y: <span class="coin-change">${toDecimals(coin.market_data.price_change_percentage_1y_in_currency[currency], 2)}%</span></div>
            </div>
    `;
    // Color change for positive/negative price change
    for (coinChange of document.querySelectorAll('.coin-change')) {
        isPositive(coinChange);
    }

    const divLeft = document.querySelector('.coin-stats__info--div-left');
    divLeft.innerHTML = `
            <h5 class="heading__quinary">Rank</h5> <span>${coin.market_data.market_cap_rank}</span>
            <h5 class="heading__quinary">Circulating Supply</h5> <span>${separateThousands(coin.market_data.circulating_supply)}</span>
            <h5 class="heading__quinary">24h Volume</h5> <span>${currencySign}${separateThousands(coin.market_data.total_volume[currency])}</span>
            <h5 class="heading__quinary">ATH</h5> <span>${currencySign}${separateThousands(coin.market_data.ath[currency])}</span>
    `

    const divRight = document.querySelector('.coin-stats__info--div-right');
    divRight.innerHTML = `
            <h5 class="heading__quinary">Market Cap</h5> <span>${currencySign}${separateThousands(coin.market_data.market_cap[currency])}</span>
            <h5 class="heading__quinary">Max Supply</h5> <span>${separateThousands(coin.market_data.max_supply)}</span>
            <h5 class="heading__quinary">24h low / 24h high</h5> <span>${currencySign}${separateThousands(coin.market_data.low_24h[currency])} / ${currencySign}${separateThousands(coin.market_data.high_24h[currency])}</span>
            <h5 class="heading__quinary">ROI</h5> <span id="ROI">${coin.market_data.current_price[currency]}</span>
    `
    isPositive(document.querySelector('#ROI'));

    const description = document.querySelector('.coin-stats__info--description');
    description.innerHTML = `
            <summary><h5 class="heading__quinary">Description</h5></summary>
                ${coin.description.en}
    `
}
getSingleCoin();


// async function getCoinGraph() {
//     //coin to look up
//     const coinId = 'bitcoin';
// 	//fetch coin information
// 	const coinChart = await axios
// 		.get(
// 			`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=30`
// 		)
// 		.catch((err) => {
// 			if (err.response.status === 404) {
// 				return null;
//             }
//             console.log(err.response);
// 			throw err;
// 		});
//     //print coin data
//     console.log(coinChart.data)
//     printGraph(coinChart.data)
// }

// function printGraph(coinChart) {
//     const chart = document.querySelector('.coin-stats__graph');
// }

// getCoinGraph();