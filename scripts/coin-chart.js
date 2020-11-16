// Save canvas element
const ctx = document.querySelector('.coin_stats__chart').getContext('2d');

const chart = new Chart(ctx, {
	type: 'line',
	data: {
		labels: [],
		datasets: [{
			label: 'Graph',
			backgroundColor: 'rgb(255, 99, 132)',
			borderColor: 'rgb(255, 99, 132)',
			data: [],
			pointRadius: 0
		}]
	},
	options: {
		responsive: true
	}
});

async function getCoinGraph(coinId, name) {
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

function printChart(coinChart, name, days) {
	// x-axis, labels
	let dates = [];
	// y-axes, data / coin prices
    let prices = [];
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
        // console.log(formattedTime);
        dates.push(time);
	}
    // extract prices to array
    for (price of coinChart.prices) {
		if (price[1] >= 100) {
			prices.push(toDecimals(price[1], 2));
		} else if (price[1] > 1) {
			prices.push(toDecimals(price[1], 4));
		} else {
			prices.push(toDecimals(price[1], 8));
		}
	}
	
	// Add new data to chart
	chart.data.datasets[0].data = prices;
	chart.data.datasets[0].label = `${name} chart`;
	chart.data.labels = dates;
	// Update chart
	chart.update();
}