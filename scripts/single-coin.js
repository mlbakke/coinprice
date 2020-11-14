async function getSingleCoin() {
    //coin to look up
    const coinId = 'bitcoin';
	//fetch coin information
	const coin = await axios
		.get(
			`https://api.coingecko.com/api/v3/coins/${coinId}`
		)
		.catch((err) => {
			if (err.response.status === 404) {
				return null;
			}
			throw err;
		});
	//print coin data
	console.log(coin.data);
}

function printSingleCoin(coin) {}
getSingleCoin();