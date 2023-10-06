const registerForm = document.getElementById('registerForm');

if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Capture user input
        const user = {
            userName: document.getElementById('userName').value,
            password: document.getElementById('registerPassword').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            dateOfBirth: document.getElementById('dateOfBirth').value,
            gender: document.getElementById('gender').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            houseNumber: document.getElementById('houseNumber').value,
            streetName: document.getElementById('streetName').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            zipCode: document.getElementById('zipCode').value,
            country: document.getElementById('country').value,
            role: document.getElementById('role').value
        };

        // Validate input data (basic example, can be extended for more rigorous checks)
        if (!user.userName || !user.password || !user.firstName || !user.lastName) {
            alert('Please fill out all required fields.');
            return;
        }

        // Send POST request to addUser API endpoint
        fetch('http://localhost:8088/api/users', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                if (data.successMessage) {
                    alert(data.successMessage);
                    window.location.href = 'login.html';
                } else if (data.errorMessage) {
                    alert(data.errorMessage);
                }
            })
            .catch(error => {
                console.error('Error during registration:', error);
                alert('Registration failed. Please try again later.');
            });
    });
}
