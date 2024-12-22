// Handle new post creation
function submitPost() {
    var postText = document.getElementById("post-text").value;

    if (postText.trim() !== "") {
        var postFeed = document.getElementById("post-feed");

        var newPost = document.createElement("div");
        newPost.classList.add("post");

        var postHeader = document.createElement("div");
        postHeader.classList.add("post-header");

        var profileImg = document.createElement("img");
        profileImg.src = "https://via.placeholder.com/50";
        profileImg.alt = "User";
        profileImg.classList.add("profile-img");

        var username = document.createElement("span");
        username.classList.add("username");
        username.textContent = "John Doe";

        var postContent = document.createElement("p");
        postContent.textContent = postText;

        var likeButton = document.createElement("button");
        likeButton.textContent = "Like";
        likeButton.onclick = function () { likePost(likeButton); };

        var commentButton = document.createElement("button");
        commentButton.textContent = "Comment";
        commentButton.onclick = function () { commentOnPost(); };

        var shareButton = document.createElement("button");
        shareButton.textContent = "Share";

        postHeader.appendChild(profileImg);
        postHeader.appendChild(username);
        newPost.appendChild(postHeader);
        newPost.appendChild(postContent);
        newPost.appendChild(likeButton);
        newPost.appendChild(commentButton);
        newPost.appendChild(shareButton);

        postFeed.appendChild(newPost);

        document.getElementById("post-text").value = ""; // Clear textarea
    }
}

// Like post functionality
function likePost(button) {
    if (button.style.backgroundColor === 'rgb(29, 161, 242)') {
        button.style.backgroundColor = '#3A3B3C';
        button.style.color = '#E4E6EB';
    } else {
        button.style.backgroundColor = '#1DA1F2'; // Facebook-like blue
        button.style.color = 'white';
    }
}

// Comment on post functionality
function commentOnPost() {
    alert("Comment functionality coming soon!");
}
