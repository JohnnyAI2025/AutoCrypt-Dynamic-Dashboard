async function fetchCryptoPrices() {
    const coinList = 'bitcoin,ethereum,xrp,dogecoin,stellar,hedera,chainlink,shiba-inu,the-graph,power-ledger,render-token,the-sandbox,pax-gold,fetch-ai,energy-web-token,basic-attention-token,vechain,helium,agix,e-cash,bittorrent,celer-network,sologenic,beam,xdc-network,usd-coin';

    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinList}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        renderCoins(data); // Render all coins
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('crypto-container').innerText = 'Failed to load data.';
    }
}

// Function to Render Coins
function renderCoins(data) {
    const container = document.getElementById('crypto-container');
    container.innerHTML = ''; // Clear previous content
    data.forEach((coin) => {
        container.innerHTML += `
            <div class="crypto">
                <h2>${coin.name}</h2>
                <p>Price: $${coin.current_price.toFixed(2)}</p>
                <p>Market Cap: $${coin.market_cap.toLocaleString()}</p>
                <p>24h Change: ${coin.price_change_percentage_24h.toFixed(2)}%</p>
            </div>
        `;
    });
}

// Search Functionality
function filterCoins() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const coins = document.querySelectorAll('.crypto');

    coins.forEach((coin) => {
        const coinName = coin.querySelector('h2').innerText.toLowerCase();
        coin.style.display = coinName.includes(searchInput) ? '' : 'none';
    });
}

// Fetch prices on page load
fetchCryptoPrices();



