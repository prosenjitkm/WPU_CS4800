// Fetch and display user details if on profile page
if (window.location.pathname.includes('profile.html')) {
    const user = JSON.parse(localStorage.getItem('user'));
    const username = user.userName;

    fetch(`http://localhost:8088/api/users/username/${username}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('usernameDisplay').innerText = data.userName;
            document.getElementById('firstNameDisplay').innerText = data.firstName;
            document.getElementById('lastNameDisplay').innerText = data.lastName;
            document.getElementById('dobDisplay').innerText = data.dateOfBirth;
            document.getElementById('emailDisplay').innerText = data.email;
            document.getElementById('phoneDisplay').innerText = data.phone;
            document.getElementById('addressDisplay').innerText = `${data.houseNumber} ${data.streetName}, ${data.city}, ${data.state}, ${data.zipCode}, ${data.country}`;
            document.getElementById('roleDisplay').innerText = data.role;
        })
        .catch(error => {
            console.error('Error fetching user details:', error);
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

// Navigate to user listing page
const usersButton = document.getElementById('usersBtn');
if (usersButton) {
    usersButton.addEventListener('click', function() {
        window.location.href = 'userlisting.html';
    });
}
