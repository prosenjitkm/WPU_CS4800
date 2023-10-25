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

// Redirect to the registration page when the "Register" button is clicked
const registerButton = document.getElementById('registerBtn');
if (registerButton) {
    registerButton.addEventListener('click', function() {
        window.location.href = 'register.html';
    });
}
