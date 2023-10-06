// Login functionality
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;

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

// Fetch and display user details if on profile page
if (window.location.pathname.includes('profile.html')) {
    let user = JSON.parse(localStorage.getItem('user'));
    let username = user.userName;

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

// If on userlisting page, fetch and display all users
if (window.location.pathname.includes('userlisting.html')) {
    fetch('http://localhost:8088/api/users/list')
        .then(response => response.json())
        .then(users => populateUserTable(users))
        .catch(error => {
            console.error('Error fetching all users:', error);
        });
}

function populateUserTable(users) {
    const tableBody = document.getElementById('usersTable').querySelector('tbody');
    tableBody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');

        ['userName', 'firstName', 'lastName', 'email', 'role'].forEach(key => {
            const cell = document.createElement('td');
            cell.textContent = user[key];
            row.appendChild(cell);
        });

        const actionCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            deleteUser(user.id);
        });

        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.addEventListener('click', function() {
            updateUser(user.id);
        });

        actionCell.appendChild(deleteButton);
        actionCell.appendChild(updateButton);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
    });
}

function deleteUser(userId) {
    fetch(`http://localhost:8088/api/users/${userId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.status === 204) {
                alert('User deleted successfully');
                location.reload();
            } else {
                alert('Error deleting user');
            }
        })
        .catch(error => {
            console.error('Error deleting user:', error);
        });
}

function updateUser(userId) {
    const userData = prompt("Enter new user data in JSON format:", "{}");
    if (userData) {
        try {
            const parsedData = JSON.parse(userData);
            fetch(`http://localhost:8088/api/users/${userId}`, {
                method: 'PUT',
                body: JSON.stringify(parsedData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.successMessage) {
                        alert('User updated successfully');
                        location.reload();
                    } else {
                        alert(data.errorMessage);
                    }
                })
                .catch(error => {
                    console.error('Error updating user:', error);
                });
        } catch (e) {
            alert("Invalid JSON format");
        }
    }
}
/// Registration functionality
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Capture user input
        const user = {
            userName: document.getElementById('userName').value,
            password: document.getElementById('password').value,
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

        // Send POST request to addUser API endpoint
        fetch('http://localhost:8088/api/users/add', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.successMessage) {
                    alert(data.successMessage);
                    // Redirect to login page after successful registration
                    window.location.href = 'login.html';
                } else if (data.errorMessage) {
                    alert(data.errorMessage);
                }
            })
            .catch(error => {
                console.error('Error during registration:', error);
            });
    });
}
