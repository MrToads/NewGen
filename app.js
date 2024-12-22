// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Handle Post Submission
function submitPost() {
    const postText = document.getElementById('post-text').value;
    const fileInput = document.getElementById('file-input');
    const postsSection = document.getElementById('posts-section');

    const newPost = document.createElement('div');
    newPost.classList.add('post');

    if (postText.trim() !== '') {
        const postContent = document.createElement('p');
        postContent.textContent = postText;
        newPost.appendChild(postContent);
    }

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const fileType = file.type;

        if (fileType.startsWith('image')) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.alt = "Post Image";
            img.classList.add('post-img');
            newPost.appendChild(img);
        } else if (fileType.startsWith('video')) {
            const video = document.createElement('video');
            video.src = URL.createObjectURL(file);
            video.controls = true;
            video.classList.add('post-img');
            newPost.appendChild(video);
        }
    }

    postsSection.appendChild(newPost);
    document.getElementById('post-text').value = '';
    fileInput.value = '';
}

// Handle Chat Bot
function sendMessage() {
    const messageInput = document.getElementById('chat-input');
    const userMessage = messageInput.value;

    if (userMessage.trim() === '') return;

    // Add user message to the chat
    addMessage(userMessage, 'user');

    // Simulate a bot response (Replace with AI API for real bot)
    const botResponse = "This is a sample bot reply!";
    addMessage(botResponse, 'bot');

    messageInput.value = '';
}

function addMessage(message, sender) {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender);
    messageDiv.innerText = message;
    messagesDiv.appendChild(messageDiv);
}
