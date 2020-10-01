const table = document.querySelector('.table-body');
const currencySign = '$';
const currency = 'usd';
const perPage = '50';
let page = 1;

async function getCoins() {
    //fetch coinlist
    const coinList = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_rank_desc&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=24h`)
        .catch(err => {
            if (err.response.status === 404) {
                return null;
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
    // Sort table after rank when loading more
    sortTable(0);
});

// SORTING TABLE
const ths = document.querySelectorAll('th');
// Sort table on th click
ths.forEach((th) => {
    th.addEventListener('click', () => {
        sortTable(th.dataset.key);
    });
});

function sortTable(n) {
    let rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    switching = true;
    dir = "asc";
    // Loop until no switching has been done
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        // Loop through all table rows
        for (i = 0; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            // Compare current row next
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            // If rows are name or ticker:
            if (n == 1 || n == 2) {
                // Check if the rows should switch place
                if (dir === "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir === "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            } else {
                // For rows with numbers, create floats without currency sign and commas
                const xNum = parseFloat(x.innerHTML.replace(/[Ξ฿¥€£$,]/g, ""));
                const yNum = parseFloat(y.innerHTML.replace(/[Ξ฿¥€£$,]/g, ""));
                if (dir === "asc") {
                    if (xNum > yNum) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir === "desc") {
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
            switchcount ++;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}