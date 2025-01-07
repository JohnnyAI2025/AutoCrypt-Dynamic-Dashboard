async function fetchCryptoPrices() {
    const coinList = 'bitcoin,ethereum,xrp,dogecoin,stellar,tao,hedera,chainlink,shiba-inu,the-graph,power-ledger,shadow-token,render-token,the-sandbox,pax-gold,fetch-ai,energy-web-token,basic-attention-token,vechain,helium,agix,e-cash,bittorrent,celer-network,sologenic,the-lux-network,nature-currency,beam,xdc-network,rlusd,usd-coin';

    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinList}&vs_currencies=usd`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data); // Debugging

        const container = document.getElementById('crypto-container');
        container.innerHTML = ''; // Clear previous content

        // Iterate over the coins and dynamically create HTML
        Object.keys(data).forEach((coin) => {
            container.innerHTML += `
                <div class="crypto">
                    <h2>${coin.charAt(0).toUpperCase() + coin.slice(1)}</h2>
                    <p>Price: $${data[coin]?.usd || 'N/A'}</p>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('crypto-container').innerText = 'Failed to load data.';
    }
}

// Fetch prices on page load
fetchCryptoPrices();
