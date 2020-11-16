const ctx = document.querySelector('.coin_stats__chart').getContext('2d');
// CREATE CHART
const chart = new Chart(ctx, {
	type: 'line',
	data: {
		labels: [],
		datasets: [{
			label: 'Price',
			yAxisID: 'right',
			backgroundColor: 'transparent',
			borderColor: 'rgb(56, 128, 58)',
			data: [],
			pointRadius: 0
		},
		{
			label: 'Market Cap',
			yAxisID: 'left',
			backgroundColor: 'transparent',
			borderColor: 'rgb(255, 99, 132)',
			borderWidth: 2,
			data: [],
			pointRadius: 0
		}
	]
	},
	options: {
		responsive: true,
		elements: {
			line: { tension: 0 }
		},
		scales: {
			yAxes: [{
			  	id: 'left',
			  	type: 'linear',
			  	position: 'left',
			  	ticks: {
					userCallback: function(value) {
						return value.toLocaleString();
					}
			  	}
			}, {
			  	id: 'right',
			  	type: 'linear',
			  	position: 'right',
			  	ticks: {
					userCallback: function(value) {
						return value.toLocaleString();
					}
			  	}
			}]
		}
	}
});

// GET COIN CHART DATA
async function getCoinChart(coinId, name) {
    const days = 360;
	//fetch coin information
	const coinChart = await axios
		.get(
			`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`
		)
		.catch((err) => {
			if (err.response.status === 404) {
				return null;
            }
            console.log(err.response);
			throw err;
		});
    //print chart
	printChart(coinChart.data, name, days)
}

// PRINT CHART
function printChart(coinChart, name, days) {
	// x-axis, labels
	let dates = [];
	// y-axis (right), data / coin prices
    let prices = [];
	// y-axis (left), data / market caps
    let caps = [];
    // extract dates to array
    for (price of coinChart.prices) {
        const newDate = new Date(price[0]);
        const months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
        const year = newDate.getFullYear();
        const month = months[newDate.getMonth()];
        const date = newDate.getDate();
        const hours = newDate.getHours();
        const minutes = newDate.getMinutes();
        
        let time = '';
        if (days <= 1) {
            time = hours + ':' + minutes;
        } else if (days > 1 && days <= 90) {
            time = date + '.' + month;
        } else {
            time = date + '.' + month + ' ' + year;
        }
        dates.push(time);
	}
    // extract prices to array
    for (price of coinChart.prices) {
		// adjust decimals to price
		if (price[1] >= 100) {
			prices.push(toDecimals(price[1], 2));
		} else if (price[1] > 1) {
			prices.push(toDecimals(price[1], 4));
		} else {
			prices.push(toDecimals(price[1], 8));
		}
	}
    // extract market caps to array
    for (cap of coinChart.market_caps) {
		caps.push(cap[1]);
	}
	// Add new data to chart
	chart.data.datasets[0].data = prices;
	chart.data.datasets[0].label = `${name} price`;
	chart.data.datasets[1].data = caps;
	chart.data.datasets[1].label = `${name} market cap`;
	chart.data.labels = dates;
	// Update chart
	chart.update();
}