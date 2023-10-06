document.addEventListener("DOMContentLoaded", function() {
    // Extract userId from the URL's query parameters
    const userId = new URLSearchParams(window.location.search).get('userId');

    // Function to populate the form fields with user data
    function populateForm(user) {
        document.getElementById('userName').value = user.userName;
        document.getElementById('registerPassword').value = user.password;
        document.getElementById('firstName').value = user.firstName;
        document.getElementById('lastName').value = user.lastName;
        document.getElementById('dateOfBirth').value = user.dateOfBirth;
        document.getElementById('gender').value = user.gender;
        document.getElementById('email').value = user.email;
        document.getElementById('phone').value = user.phone;
        document.getElementById('houseNumber').value = user.houseNumber;
        document.getElementById('streetName').value = user.streetName;
        document.getElementById('city').value = user.city;
        document.getElementById('state').value = user.state;
        document.getElementById('zipCode').value = user.zipCode;
        document.getElementById('country').value = user.country;
        document.getElementById('role').value = user.role;
    }

    // Load existing data for the user
    fetch(`http://localhost:8088/api/users/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(user => {
            populateForm(user);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });

    // Handle form submission
    const updateForm = document.getElementById('updateForm');
    updateForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Capture user input
        const updatedUser = {
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

        // Send PUT request to updateUser API endpoint
        fetch(`http://localhost:8088/api/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(updatedUser),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.successMessage) {
                    alert(data.successMessage);
                    window.location.href = 'userListing.html';
                } else if (data.errorMessage) {
                    alert(data.errorMessage);
                }
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    });
});

function goToUserListing() {
    window.location.href = 'userlisting.html';
}
