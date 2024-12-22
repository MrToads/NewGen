// Simulated User Database (Now stored in localStorage)
let users = JSON.parse(localStorage.getItem('users')) || [];
let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || null;

// Toggle between Login and Signup forms
function toggleForm() {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    loginForm.style.display = loginForm.style.display === "none" ? "block" : "none";
    signupForm.style.display = signupForm.style.display === "none" ? "block" : "none";
}

// Simulate user login
function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        loggedInUser = user;
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Login successful!");
        displayFeedPage();
    } else {
        alert("Invalid username or password.");
    }
}

// Simulate user signup
function signup() {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    const existingUser = users.find(u => u.username === username);

    if (existingUser) {
        alert("Username already exists!");
    } else {
        const newUser = { username, password, posts: [] };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert("Signup successful! You can now log in.");
        toggleForm();
    }
}

// Display the feed page after login
function displayFeedPage() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('feed-page').style.display = 'block';

    loadPosts();
}

// Submit Post (Text, Image, Video)
function submitPost() {
    const postText = document.getElementById("post-text").value;
    const fileInput = document.getElementById("file-input");
    const file = fileInput.files[0];

    if (postText.trim() !== "" || file) {
        const newPost = {
            text: postText,
            file: file ? URL.createObjectURL(file) : null,
            fileType: file ? file.type : null,
            likes: 0,
            comments: []
        };

        loggedInUser.posts.push(newPost);
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

        // Add post to feed
        const postFeed = document.getElementById("post-feed");
        const postElement = createPostElement(newPost);
        postFeed.appendChild(postElement);
    }
}

// Create post element to append to the feed
function createPostElement(post) {
    const postElement = document.createElement("div");
    postElement.classList.add("post");

    if (post.text) {
        const postContent = document.createElement("p");
        postContent.textContent = post.text;
        postElement.appendChild(postContent);
    }

    if (post.fileType && post.fileType.startsWith('image')) {
        const img = document.createElement("img");
        img.src = post.file;
        img.alt = "Post Image";
        img.classList.add("post-img");
        postElement.appendChild(img);
    } else if (post.fileType && post.fileType.startsWith('video')) {
        const video = document.createElement("video");
        video.src = post.file;
        video.controls = true;
        video.classList.add("post-video");
        postElement.appendChild(video);
    }

    // Footer with Like and Comment buttons
    const postFooter = document.createElement("div");
    postFooter.classList.add("post-footer");

    const likeButton = document.createElement("button");
    likeButton.textContent = `Like (${post.likes})`;
    likeButton.onclick = () => {
        post.likes++;
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        likeButton.textContent = `Like (${post.likes})`;
    };

    const commentButton = document.createElement("button");
    commentButton.textContent = `Comment (${post.comments.length})`;
    commentButton.onclick = () => {
        const comment = prompt("Enter your comment:");
        if (comment) {
            post.comments.push(comment);
            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
            commentButton.textContent = `Comment (${post.comments.length})`;
        }
    };

    postFooter.appendChild(likeButton);
    postFooter.appendChild(commentButton);

    postElement.appendChild(postFooter);

    return postElement;
}

// Load posts for the logged-in user
function loadPosts() {
    const postFeed = document.getElementById("post-feed");
    postFeed.innerHTML = ''; // Clear the current feed

    loggedInUser.posts.forEach(post => {
        const postElement = createPostElement(post);
        postFeed.appendChild(postElement);
    });
}

// Automatically redirect to the feed page if the user is logged in
if (loggedInUser) {
    displayFeedPage();
}
