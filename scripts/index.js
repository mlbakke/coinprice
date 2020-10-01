const table = document.querySelector('.table-body');
const currencySign = '$';
const currency = 'usd'
let page = 1;

async function getCoins() {
    //fetch coinlist
    const coinList = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_rank_desc&per_page=100&page=${page}&sparkline=false&price_change_percentage=24h`)
        .catch(err => {
            if (err.response.status === 404) {
                return 0;
            }
            throw err;
        }
    );
    //print data
    printCoins(coinList.data);
}

function printCoins(coins) {
    for (let coin of coins) {
        // Create table row for coin and table data for each data point
        const row = document.createElement("tr");
        const rank = document.createElement("td");
        const rankT = document.createTextNode(coin.market_cap_rank);
        const name = document.createElement("td");
        const nameT = document.createTextNode(coin.name);
        const tick = document.createElement("td");
        const tickT = document.createTextNode(coin.symbol.toUpperCase());
        const cap = document.createElement("td");
        const capT = document.createTextNode(`${currencySign}${separateThousands(coin.market_cap)}`);
        const price = document.createElement("td");
        const priceT = document.createTextNode(`${currencySign}${separateThousands(coin.current_price)}`);
        const vol = document.createElement("td");
        const volT = document.createTextNode(`${currencySign}${separateThousands(coin.total_volume)}`);
        const supply = document.createElement("td");
        const supplyT = document.createTextNode(separateThousands(toDecimals(parseFloat(coin.circulating_supply), 0)));
        const change = document.createElement("td");
        const changeT = document.createTextNode(toDecimals(coin.price_change_percentage_24h_in_currency, 2));
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
    if (num === null) {
        return '-';
    }
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

function separateThousands(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

getCoins();

// LOAD COINS
const loadBtn = document.querySelector('.btn-load');

loadBtn.addEventListener('click', () => {
    page++;
    getCoins();
});