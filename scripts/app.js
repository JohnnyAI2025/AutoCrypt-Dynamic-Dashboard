// Import required libraries
const axios = require('axios');

// Coin list to fetch
const coinList = [
  'bitcoin',
  'ethereum',
  'xrp',
  'dogecoin',
  'stellar',
  'hedera',
  'chainlink',
  'shiba-inu',
  'the-graph',
  'power-ledger',
  'render-token',
  'the-sandbox',
  'pax-gold',
  'fetch-ai',
  'energy-web-token',
  'basic-attention-token',
  'vechain',
  'helium',
  'agix',
  'e-cash',
  'bittorrent',
  'celer-network',
  'sologenic',
  'beam',
  'xdc-network',
  'usd-coin',
];

// Fetch cryptocurrency prices and historical data
async function fetchCryptoPrices() {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets`,
      {
        params: {
          vs_currency: 'usd',
          ids: coinList.join(','),
        },
      }
    );

    const data = response.data;
    renderCryptoData(data);
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    document.getElementById('crypto-container').innerHTML =
      '<p>Error loading data. Please try again later.</p>';
  }
}

// Render cryptocurrency data
function renderCryptoData(data) {
  const container = document.getElementById('crypto-container');
  container.innerHTML = ''; // Clear previous content

  data.forEach((coin) => {
    const coinElement = `
      <div class="crypto-card">
        <h2>${coin.name}</h2>
        <p>Price: $${coin.current_price.toFixed(2)}</p>
        <p>Market Cap: $${coin.market_cap.toLocaleString()}</p>
        <p>24h Change: ${coin.price_change_percentage_24h.toFixed(2)}%</p>
        <canvas id="chart-${coin.id}" width="400" height="200"></canvas>
      </div>
    `;

    container.insertAdjacentHTML('beforeend', coinElement);
    renderChart(coin.id, coin.name);
  });
}

// Render chart using Chart.js
function renderChart(coinId, coinName) {
  const ctx = document.getElementById(`chart-${coinId}`).getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`), // Placeholder labels
      datasets: [
        {
          label: `${coinName} Price (Last 7 Days)`,
          data: Array.from({ length: 7 }, () => Math.random() * 100), // Placeholder data
          borderColor: '#00d1b2',
          backgroundColor: 'rgba(0, 209, 178, 0.2)',
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Price (USD)',
          },
        },
      },
    },
  });
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', fetchCryptoPrices);
