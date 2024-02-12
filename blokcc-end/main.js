
const userRegistryContractAddress = 'YOUR_USER_REGISTRY_CONTRACT_ADDRESS';
const connectionsContractAddress = 'YOUR_CONNECTIONS_CONTRACT_ADDRESS';

document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);

async function connectWallet() {
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const userAccount = accounts[0];

        const web3 = new Web3(ethereum);

        await updateProfileList();
    } catch (error) {
        console.error('Error connecting wallet:', error);
        alert('Wallet connection failed. Please check the console for details.');
    }
}

async function updateProfileList() {
    const profileListDiv = document.getElementById('profileList');
    profileListDiv.innerHTML = '';

    try {
        const userRegistryContract = new web3.eth.Contract(userRegistryAbi, userRegistryContractAddress);

        const registeredUsers = await userRegistryContract.methods.getRegisteredUsers().call();

        registeredUsers.forEach(async (userAddress) => {
            const userProfile = await getUserProfile(userAddress);
            const profileCard = createProfileCard(userProfile);
            profileListDiv.appendChild(profileCard);
        });

    } catch (error) {
        console.error('Error updating profile list:', error);
    }
}

async function connectToUser(userAddress) {
    try {
        const connectionsContract = new web3.eth.Contract(connectionsAbi, connectionsContractAddress);
        await connectionsContract.methods.connectToUser(userAddress).send({ from: userWalletAddress });

        alert('Connected to user successfully!');
    } catch (error) {
        console.error('Error connecting to user:', error);
        alert('Connection to user failed. Please check the console for details.');
    }
}

async function sendConnectionRequest(userAddress) {
    try {
        const connectionsContract = new web3.eth.Contract(connectionsAbi, connectionsContractAddress);
        await connectionsContract.methods.sendConnectionRequest(userAddress).send({ from: userWalletAddress });

        alert('Connection request sent successfully!');
    } catch (error) {
        console.error('Error sending connection request:', error);
        alert('Failed to send connection request. Please check the console for details.');
    }
}
function createProfileCard(userProfile) {
    const profileCard = document.createElement('div');
    profileCard.classList.add('profile-card');

    const profileContent = document.createElement('div');
    profileContent.innerHTML = `
        <h3>${userProfile.name}</h3>
        <p>${userProfile.biography}</p>
        <img src="${userProfile.profilePicture}" alt="Profile Picture">
    `;

    const connectButton = document.createElement('button');
    connectButton.textContent = 'Connect';
    connectButton.addEventListener('click', () => sendConnectionRequest(userProfile.address));

    profileCard.appendChild(profileContent);
    profileCard.appendChild(connectButton);

    return profileCard;
}


document.getElementById('connectBtn').addEventListener('click', connectToUser);
document.getElementById('sendConnectionRequestBtn').addEventListener('click', sendConnectionRequest);



async function showUserProfile(userAddress) {
    const profileDetailsDiv = document.getElementById('profileDetails');
    profileDetailsDiv.innerHTML = '';

    try {
        const userRegistryContract = new web3.eth.Contract(userRegistryAbi, userRegistryContractAddress);

        const userProfile = await userRegistryContract.methods.getUserProfile(userAddress).call();

        const profileContent = document.createElement('div');
        profileContent.innerHTML = `
            <h2>${userProfile.name}</h2>
            <p><strong>Biography:</strong> ${userProfile.biography}</p>
            <p><strong>Profile Picture:</strong> <img src="${userProfile.profilePicture}" alt="Profile Picture"></p>
        `;

        const connectButton = document.createElement('button');
        connectButton.textContent = 'Connect to User';
        connectButton.addEventListener('click', () => connectToUser(userAddress));

        profileDetailsDiv.appendChild(profileContent);
        profileDetailsDiv.appendChild(connectButton);

    } catch (error) {
        console.error('Error fetching user profile:', error);
        alert('Failed to fetch user profile. Please check the console for details.');
    }
}

const messagesContractAddress = 'YOUR_MESSAGES_CONTRACT_ADDRESS';
const messagesAbi = [
    {
        "constant": true,
        "inputs": [],
        "name": "getAllMessages",
        "outputs": [
            {
                "components": [
                    {
                        "name": "author",
                        "type": "address"
                    },
                    {
                        "name": "content",
                        "type": "string"
                    },
                    {
                        "name": "messageId",
                        "type": "uint256"
                    },
                    {
                        "name": "comments",
                        "type": "uint256[]"
                    }
                ],
                "name": "",
                "type": "tuple[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_content",
                "type": "string"
            }
        ],
        "name": "writeMessage",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_messageId",
                "type": "uint256"
            },
            {
                "name": "_content",
                "type": "string"
            }
        ],
        "name": "commentMessage",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const connectBtn = document.getElementById('connectBtn');
    if (connectBtn) {
        connectBtn.addEventListener('click', connectToUser);
    }

    const sendConnectionRequestBtn = document.getElementById('sendConnectionRequestBtn');
    if (sendConnectionRequestBtn) {
        sendConnectionRequestBtn.addEventListener('click', sendConnectionRequest);
    }
});
