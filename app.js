// Function to submit a new post
function submitPost() {
    const postContent = document.getElementById('tweet-input').value;
    if (postContent) {
        const postFeed = document.getElementById('feed');
        const newPost = document.createElement('div');
        newPost.classList.add('post');
        newPost.innerHTML = `
            <p>${postContent}</p>
            <button onclick="likePost(this)">Like</button>
            <button onclick="commentPost(this)">Comment</button>
            <button>Share</button>
        `;
        postFeed.prepend(newPost); // Add post at the top of the feed
        document.getElementById('tweet-input').value = ''; // Clear the textarea
    }
}

// Function to like a post
function likePost(button) {
    button.innerHTML = "Liked";
    button.disabled = true;
}

// Function to comment on a post
function commentPost(button) {
    const comment = prompt("Enter your comment:");
    if (comment) {
        const commentDiv = document.createElement('div');
        commentDiv.innerHTML = `<strong>Comment:</strong> ${comment}`;
        button.parentElement.appendChild(commentDiv);
    }
}

