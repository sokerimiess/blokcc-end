// Assuming you already have web3 and other necessary variables declared in main.js

document.addEventListener('DOMContentLoaded', async () => {
    await updateMessagesList();
});

async function updateMessagesList() {
    try {
        const web3 = new Web3(window.ethereum);
        // ваш код для обновления списка сообщений
    } catch (error) {
        console.error('Error updating messages list:', error);
    }
}
function createMessageCard(message) {
    const messageCard = document.createElement('div');
    messageCard.classList.add('message-card');

    const messageContent = document.createElement('div');
    messageContent.innerHTML = `
        <p><strong>Author:</strong> ${message.author}</p>
        <p>${message.content}</p>
    `;

    const commentButton = document.createElement('button');
    commentButton.textContent = 'Comment';
    commentButton.addEventListener('click', () => commentOnMessage(message.messageId));

    messageCard.appendChild(messageContent);
    messageCard.appendChild(commentButton);

    return messageCard;
}

async function commentOnMessage(messageId) {
    const commentContent = prompt('Enter your comment:');

    try {
        const messagesContract = new web3.eth.Contract(messagesAbi, messagesContractAddress);
        await messagesContract.methods.commentMessage(messageId, commentContent).send({ from: userWalletAddress });

        alert('Comment added successfully!');
        await updateMessagesList();
    } catch (error) {
        console.error('Error commenting on message:', error);
        alert('Failed to add comment. Please check the console for details.');
    }
}
