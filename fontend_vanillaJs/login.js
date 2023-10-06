// Login functionality
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('loginPassword').value;

        fetch('http://localhost:8088/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username: username, password: password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.successMessage) {
                    localStorage.setItem('user', JSON.stringify(data.payload));
                    window.location.href = 'profile.html';
                } else if (data.errorMessage) {
                    alert(data.errorMessage);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
}

// Handle logout functionality
const logoutButton = document.getElementById('logoutBtn');
if (logoutButton) {
    logoutButton.addEventListener('click', function() {
        fetch('http://localhost:8088/logout', {
            method: 'GET'
        })
            .then(response => {
                if (response.status === 200) {
                    localStorage.removeItem('user');
                    window.location.href = 'login.html';
                } else {
                    console.error('Error during logout:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error during logout:', error);
            });
    });
}

// Redirect to the registration page when the "Register" button is clicked
const registerButton = document.getElementById('registerBtn');
if (registerButton) {
    registerButton.addEventListener('click', function() {
        window.location.href = 'register.html';
    });
}

// Navigate to user listing page
const usersButton = document.getElementById('usersBtn');
if (usersButton) {
    usersButton.addEventListener('click', function() {
        window.location.href = 'userlisting.html';
    });
}
