// Fetch cryptocurrency prices and historical data
async function fetchCryptoPrices() {
    const coinList = 'bitcoin,ethereum,xrp,dogecoin,stellar,hedera,chainlink,shiba-inu,the-graph,power-ledger,render-token,the-sandbox,pax-gold,fetch-ai,energy-web-token,basic-attention-token,vechain,helium,agix,e-cash,bittorrent,celer-network,sologenic,beam,xdc-network,usd-coin';

    try {
        // Fetch live coin data
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinList}`);
        if (!response.ok) throw new Error('Failed to fetch live coin data');

        const data = await response.json();
        const container = document.getElementById('crypto-container');
        container.innerHTML = ''; // Clear previous content

        // Render each coin's details and chart
        for (const coin of data) {
            container.innerHTML += `
                <div class="crypto">
                    <h2>${coin.name}</h2>
                    <p>Price: $${coin.current_price.toFixed(2)}</p>
                    <p>Market Cap: $${coin.market_cap.toLocaleString()}</p>
                    <p>24h Change: ${coin.price_change_percentage_24h.toFixed(2)}%</p>
                    <canvas id="chart-${coin.id}" width="400" height="200"></canvas>
                </div>
            `;

            // Fetch historical data for each coin
            const historicalData = await fetchHistoricalData(coin.id);
            if (historicalData) {
                const prices = historicalData.prices.map(([timestamp, price]) => price);
                const labels = historicalData.prices.map(([timestamp]) => new Date(timestamp).toLocaleDateString());

                renderChart(`chart-${coin.id}`, labels, prices, coin.name);
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('crypto-container').innerText = 'Failed to load data.';
    }
}

// Fetch historical data for a specific coin
async function fetchHistoricalData(coinId) {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`);
        if (!response.ok) throw new Error(`Failed to fetch historical data for ${coinId}`);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

// Render a chart for a specific coin
function renderChart(canvasId, labels, data, coinName) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `${coinName} Price (Last 7 Days)`,
                data: data,
                borderColor: '#00d1b2',
                backgroundColor: 'rgba(0, 209, 178, 0.2)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Price (USD)'
                    }
                }
            }
        }
    });
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

// Fetch prices and charts on page load
fetchCryptoPrices();


