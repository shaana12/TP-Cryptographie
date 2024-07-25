const SERVER_URL = 'http://34.163.219.17:3000'; 

// Fonction pour valider l'adresse Ethereum
function isValidEthereumAddress(address) {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
}


document.getElementById('subscribeBtn').addEventListener('click', async () => {
    try {
        const name = document.getElementById('name').value.trim();
        const address = document.getElementById('ethAddress').value.trim();
        
        if (!name) {
            document.getElementById('response').textContent = 'Veuillez entrer un nom.';
            return;
        }

        if (!isValidEthereumAddress(address)) {
            document.getElementById('response').textContent = 'Adresse Ethereum invalide.';
            return;
        }
        
       
        const response = await axios.post(`${SERVER_URL}/subscribe`, 
            { Name: name, Address: address }, 
            { headers: { 'Content-Type': 'application/json' } }
        );
        document.getElementById('response').textContent = `Réponse: ${JSON.stringify(response.data)}`;
    } catch (error) {
        console.error('Erreur lors de l\'abonnement:', error.message);
        document.getElementById('response').textContent = 'Erreur lors de l\'abonnement.';
    }
});


document.getElementById('getInfoBtn').addEventListener('click', async () => {
    const address = document.getElementById('ethAddress').value.trim();
    if (!isValidEthereumAddress(address)) {
        document.getElementById('response').textContent = 'Adresse Ethereum invalide.';
        return;
    }

    try {
        const response = await axios.get(`${SERVER_URL}/info/${address}`);
        document.getElementById('response').textContent = `Informations: ${JSON.stringify(response.data)}`;
    } catch (error) {
        console.error('Erreur lors de la récupération des informations:', error.message);
        document.getElementById('response').textContent = 'Erreur lors de la récupération des informations.';
    }
});
