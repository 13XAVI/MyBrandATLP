document.addEventListener("DOMContentLoaded", function() {

    function displayUserData(data) {
     
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        var html = "";
        
        data.slice(0, 5).forEach(function(user) {
            html += "<tr>";
            html += "<td>" + user.name + "</td>";
            html += "<td>" + user.email + "</td>";
            html += "<td>" + user.role + "</td>";
            html += "<td>" + user.createdAt + "</td>";
            html += "<td>" + user.updatedAt + "</td>";
            html += "<td><button class='edit-btn'>Edit</button></td>";
            html += "<td><button onclick='Deleteuser(\"" + user.id + "\")' class='btn-danger'>Delete</button></td>";
            html += "</tr>";
        });
        document.getElementById("userTableBody").innerHTML = html;
    }

    fetch('https://portfolioatlpbackend.onrender.com/api/V1/User/All', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.json())
    .then(data => displayUserData(data))
    .catch(error => console.error('Error fetching user data:', error));


    document.getElementById("userTableBody").addEventListener("click", function(event) {
        if (event.target.classList.contains("edit-btn")) {
            
            document.getElementById("editUserModal").style.display = "block";
        }
    });

    document.getElementById("editUserModal").addEventListener("click", function(event) {
        if (event.target.classList.contains("close") || event.target.id === "editUserModal") {
            document.getElementById("editUserModal").style.display = "none";
        }
    });

    document.getElementById("editUserForm").addEventListener("submit", function(event) {
        event.preventDefault();
    });


    function Deleteuser(id) {
        fetch(`https://portfolioatlpbackend.onrender.com/api/V1/User/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            if (response.ok) {
                alert("User deleted successfully");
                fetchUsers();
            } else {
                throw new Error('Failed to delete user');
            }
        })
        .catch(error => {
            console.error('Error deleting user:', error);
        });
    }

    function fetchUsers() {
        fetch('https://portfolioatlpbackend.onrender.com/api/V1/User/All', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => displayUserData(data))
        .catch(error => console.error('Error fetching user data:', error));
    }
});
