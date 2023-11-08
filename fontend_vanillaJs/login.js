document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent the default form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("loginPassword").value;

    // Create the login payload
    const loginPayload = {
        username: username,
        password: password
    };

    // Call the backend API for login
    fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginPayload)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to login");
            }
        })
        .then(data => {
            if (data && data.successMessage) {
                alert(data.successMessage);
                // Navigate to the user dashboard or any other page after successful login
                // window.location.href = "/dashboard";
            }
        })
        .catch(error => {
            alert(error.message);
        });
});

document.getElementById("registerBtn").addEventListener("click", function() {
    // Navigate to the registration page
    window.location.href = "/register";
});
