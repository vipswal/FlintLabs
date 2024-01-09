async function getBalance(address) {
    try {
        const response = await fetch(`https://api.etherscan.io/api');
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Error fetching balance:', error);
        return null;
    }
}

async function updateBalance() {
    const currentBalance = await getBalance(ethAddress);

    if (currentBalance !== null) {
        const storedBalance = localStorage.getItem('lastBalance');

        if (storedBalance !== null) {
            const percentageChange = ((currentBalance - parseFloat(storedBalance)) / parseFloat(storedBalance)) * 100;
            document.getElementById('change').textContent = `Change in the last 12 hours: ${percentageChange.toFixed(2)}%`;

            if (percentageChange < -10) {
                alert('Balance reduced by 10% or more in the last 12 hours!');
            }
        }

        localStorage.setItem('lastBalance', currentBalance.toString());
        document.getElementById('balance').textContent = `Current Balance: ${currentBalance} ETH`;
    }
}


updateBalance();

setInterval(updateBalance, 12 * 60 * 60 * 1000);
