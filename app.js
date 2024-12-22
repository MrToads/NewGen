// Simulated User Database
const users = []; // In real-world use, this should be a backend database

// Simulate user login
function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        alert("Login successful!");
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        window.location.href = "feed.html";  // Redirect to feed page after login
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
        const newUser = { username, password, friends: [], posts: [] };
        users.push(newUser);
        alert("Signup successful! You can now log in.");
        toggleForm();
    }
}

// Toggle between Login and Signup forms
function toggleForm() {
    document.getElementById("login-form").style.display = document.getElementById("login-form").style.display === "none" ? "block" : "none";
    document.getElementById("signup-form").style.display = document.getElementById("signup-form").style.display === "none" ? "block" : "none";
}

// Function to submit post with text, image, or video
function submitPost() {
    const postText = document.getElementById("post-text").value;
    const fileInput = document.getElementById("file-input");
    const file = fileInput.files[0];

    if (postText.trim() !== "" || file) {
        const newPost = document.createElement("div");
        newPost.classList.add("post");

        const postContent = document.createElement("p");
        postContent.textContent = postText;

        if (file && file.type.startsWith('image')) {
            const img = document.createElement("img");
            img.src = URL.createObjectURL(file);
            img.alt = "Post Image";
            img.classList.add("post-img");
            newPost.appendChild(img);
        } else if (file && file.type.startsWith('video')) {
            const video = document.createElement("video");
            video.src = URL.createObjectURL(file);
            video.controls = true;
            newPost.appendChild(video);
        }

        const postFeed = document.getElementById("post-feed");
        postFeed.appendChild(newPost);
    }
}
