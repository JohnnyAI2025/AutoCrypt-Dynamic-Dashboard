console.log("AutoCrypt Dashboard is running!");

// Get the container element
const cryptoContainer = document.getElementById('crypto-container');

// List of coins to fetch
const coinList = 'bitcoin,ethereum,xrp,dogecoin,stellar,hedera,chainlink';

// Fetch and display cryptocurrency data
async function fetchCryptoData() {
    try {
        // Fetch data from the CoinGecko API
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinList}`);
        if (!response.ok) throw new Error("Failed to fetch cryptocurrency data.");

        const data = await response.json();

        // Clear the container and populate it with data
        cryptoContainer.innerHTML = '';
        data.forEach((coin) => {
            cryptoContainer.innerHTML += `
                <div class="crypto-card">
                    <h2>${coin.name}</h2>
                    <p>Price: $${coin.current_price.toFixed(2)}</p>
                    <p>Market Cap: $${coin.market_cap.toLocaleString()}</p>
                    <p>24h Change: ${coin.price_change_percentage_24h.toFixed(2)}%</p>
                </div>
            `;
        });

    } catch (error) {
        console.error(error);
        cryptoContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

// Fetch data when the page loads
fetchCryptoData();
