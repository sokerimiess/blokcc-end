document.getElementById('registerBtn').addEventListener('click', registerUser);

async function registerUser() {
    const name = document.getElementById('name').value;
    const biography = document.getElementById('biography').value;
    const profilePicture = document.getElementById('profilePicture').value;

    try {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                
                const web3 = new Web3(window.ethereum);
        
            } catch (error) {
                console.error('Error connecting wallet:', error);
                alert('Wallet connection failed. Please check the console for details.');
            }
        } else {
            alert('Please install MetaMask or a compatible wallet to use this application.');
        }
        

        const accounts = await web3.eth.getAccounts();
        const currentAccount = accounts[0];

        const userRegistryContract = new web3.eth.Contract(userRegistryAbi, userRegistryContractAddress);

        const transaction = await userRegistryContract.methods.registerUser(name, biography, profilePicture).send({
            from: currentAccount
        });

        if (transaction.status) {
            alert('Registration successful!');
            
        } else {
            alert('Transaction failed. Please check the console for details.');
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('Registration failed. Please check the console for details.');
    }
}
