async function fetchCryptoPrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,xrp&vs_currencies=usd');
        
        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const container = document.getElementById('crypto-container');
        container.innerHTML = `
            <div class="crypto">
                <h2>Bitcoin</h2>
                <p>Price: $${data.bitcoin.usd}</p>
            </div>
            <div class="crypto">
                <h2>Ethereum</h2>
                <p>Price: $${data.ethereum.usd}</p>
            </div>
            <div class="crypto">
                <h2>XRP</h2>
                <p>Price: $${data.xrp.usd}</p>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('crypto-container').innerText = 'Failed to load data.';
    }
}

// Fetch prices on page load
fetchCryptoPrices();
