const table = document.querySelector('.table-body');

async function getCoins() {
    const coinList = await axios.get('https://api.coingecko.com/api/v3/coins/');

    printCoins(coinList.data);
}

function printCoins(coins) {
    for (let coin of coins) {
        const row = document.createElement("tr");
        const rank = document.createElement("td");
        const rankT = document.createTextNode(coin.market_data.market_cap_rank);
        const name = document.createElement("td");
        const nameT = document.createTextNode(coin.name);
        const cap = document.createElement("td");
        const capT = document.createTextNode(coin.market_data.market_cap.usd);
        const price = document.createElement("td");
        const priceT = document.createTextNode(coin.market_data.current_price.usd);
        const vol = document.createElement("td");
        const volT = document.createTextNode(coin.market_data.total_volume.usd);
        const supply = document.createElement("td");
        const supplyT = document.createTextNode(coin.market_data.circulating_supply);
        const change = document.createElement("td");
        const changeT = document.createTextNode(coin.market_data.price_change_percentage_24h_in_currency.usd);
        const tds = [rank, name, cap, price, vol, supply, change];

        row.classList.add('table-row');
        name.classList.add('table-bold');

        rank.appendChild(rankT);
        name.appendChild(nameT);
        cap.appendChild(capT);
        price.appendChild(priceT);
        vol.appendChild(volT);
        supply.appendChild(supplyT);
        change.appendChild(changeT);

        row.appendChild(rank);
        row.appendChild(name);
        row.appendChild(cap);
        row.appendChild(price);
        row.appendChild(vol);
        row.appendChild(supply);
        row.appendChild(change);

        table.appendChild(row);
    }
}

getCoins();