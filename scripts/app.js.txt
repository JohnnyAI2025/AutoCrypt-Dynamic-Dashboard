async function fetchCryptoPrices() {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,xrp&vs_currencies=usd');
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
}

// Fetch prices on load and refresh every minute
fetchCryptoPrices();
setInterval(fetchCryptoPrices, 60000);
