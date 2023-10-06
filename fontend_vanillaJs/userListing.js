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
    window.location.href = `update.html?userId=${userId}`;
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

// Navigate to user listing page (Though this seems redundant in the user listing page itself)
const usersButton = document.getElementById('usersBtn');
if (usersButton) {
    usersButton.addEventListener('click', function() {
        window.location.href = 'userlisting.html';
    });
}
