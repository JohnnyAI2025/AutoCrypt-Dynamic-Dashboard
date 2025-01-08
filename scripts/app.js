// Log that the script is running
console.log("AutoCrypt Dashboard is running!");

// Get the container element
const cryptoContainer = document.getElementById('crypto-container');

// Check if the container exists
if (cryptoContainer) {
    cryptoContainer.innerHTML = '<p>Loading cryptocurrency data...</p>';

    // Fetch cryptocurrency prices and historical data
    async function fetchCryptoPrices() {
        const coinList = 'bitcoin,ethereum,xrp,dogecoin,stellar,hedera,chainlink';

        try {
            // Fetch live coin data from CoinGecko
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinList}`);
            if (!response.ok) throw new Error('Failed to fetch live coin data');

            const data = await response.json();

            // Clear the loading message
            cryptoContainer.innerHTML = '';

            // Render each coin's details
            data.forEach(coin => {
                const coinElement = document.createElement('div');
                coinElement.className = 'crypto';
                coinElement.innerHTML = `
                    <h2>${coin.name}</h2>
                    <p>Price: $${coin.current_price.toFixed(2)}</p>
                    <p>Market Cap: $${coin.market_cap.toLocaleString()}</p>
                    <p>24h Change: ${coin.price_change_percentage_24h.toFixed(2)}%</p>
                `;
                cryptoContainer.appendChild(coinElement);
            });

        } catch (error) {
            console.error('Error fetching data:', error);
            cryptoContainer.innerHTML = '<p>Failed to load data. Please try again later.</p>';
        }
    }

    // Call the function to fetch crypto prices
    fetchCryptoPrices();
} else {
    console.error('Container element "crypto-container" not found.');
}

// Filter coins based on search input
function filterCoins() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const coins = document.querySelectorAll('.crypto');

    coins.forEach((coin) => {
        const coinName = coin.querySelector('h2').innerText.toLowerCase();
        coin.style.display = coinName.includes(searchInput) ? '' : 'none';
    });
}

