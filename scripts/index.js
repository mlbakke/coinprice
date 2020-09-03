const table = document.querySelector('.table-body');

async function getCoins() {
    //fetch coinlist
    const coinList = await axios.get('https://api.coingecko.com/api/v3/coins/');
    //print data
    printCoins(coinList.data);
}

function printCoins(coins) {
    for (let coin of coins) {
        // Create table row for coin and table data for each data point
        const row = document.createElement("tr");
        const rank = document.createElement("td");
        const rankT = document.createTextNode(coin.market_data.market_cap_rank);
        const name = document.createElement("td");
        const nameT = document.createTextNode(coin.name);
        const tick = document.createElement("td");
        const tickT = document.createTextNode(coin.symbol.toUpperCase());
        const cap = document.createElement("td");
        const capT = document.createTextNode(coin.market_data.market_cap.usd);
        const price = document.createElement("td");
        const priceT = document.createTextNode(coin.market_data.current_price.usd);
        const vol = document.createElement("td");
        const volT = document.createTextNode(coin.market_data.total_volume.usd);
        const supply = document.createElement("td");
        const supplyT = document.createTextNode(toDecimals(parseFloat(coin.market_data.circulating_supply), 0));
        const change = document.createElement("td");
        const changeT = document.createTextNode(toDecimals(coin.market_data.price_change_percentage_24h_in_currency.usd, 2));
        row.classList.add('table-row');
        name.classList.add('table-bold');

        //append textNode to td
        rank.appendChild(rankT);
        name.appendChild(nameT);
        tick.appendChild(tickT);
        cap.appendChild(capT);
        price.appendChild(priceT);
        vol.appendChild(volT);
        supply.appendChild(supplyT);
        change.appendChild(changeT);
        
        isPositive(change);
        //append td's to tr
        row.appendChild(rank);
        row.appendChild(name);
        row.appendChild(tick);
        row.appendChild(cap);
        row.appendChild(price);
        row.appendChild(vol);
        row.appendChild(supply);
        row.appendChild(change);
        //append row to table
        table.appendChild(row);

    }
}

function toDecimals(num, dec) {
    return num.toFixed(dec);
}

function isPositive(el) {
    // Check if number in an element is positive/negative
    const float = parseFloat(el.textContent)
    if (float > 0) {
        el.classList.add('positive');
    } else if (float == 0) {
        el.classList.add('neutral');
    } else {
        el.classList.add('negative');
    }
    return;
}

getCoins();