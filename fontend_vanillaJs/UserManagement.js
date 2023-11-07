document.addEventListener('DOMContentLoaded', function() {
    fetchUsers();
});

function fetchUsers() {
    fetch('/api/user/list') // Replace with your actual API endpoint
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            populateUserTable(data);
        })
        .catch(error => console.error('There has been a problem with your fetch operation:', error));
}

function populateUserTable(users) {
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; // Clear the table body

    // Iterate over each user and append a row to the table body
    users.forEach((user) => {
        const userRow = `
            <tr>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.dateOfBirth}</td>
                <td>${user.gender}</td>
                <td>${user.phone}</td>
                <!-- Add more data cells as per your user object properties -->
                <td>
                    <button onclick="updateUser('${user.id}')" class="btn btn-primary btn-sm">Update</button>
                    <button onclick="deleteUser('${user.id}')" class="btn btn-danger btn-sm">Delete</button>
                </td>
            </tr>
        `;
        userList.innerHTML += userRow;
    });
}

function updateUser(userId) {
    // Redirect to update user page or open a modal for editing
    console.log('Update user with ID:', userId);
    // Implement the update logic here
}

function deleteUser(userId) {
    // Call API to delete the user
    console.log('Delete user with ID:', userId);
    // Implement the delete logic here
}
