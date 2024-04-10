document.addEventListener("DOMContentLoaded", function() {
    
    const LoadBlogs = document.getElementById("loading");
    LoadBlogs.style.display = 'block';
    const prevPageButton = document.getElementById("prevPage");
    const nextPageButton = document.getElementById("nextPage");
    const token =localStorage.getItem("token")
    const Users = document.getElementById("usersLength")
    const Blogs = document.getElementById("BlogData");
    const pageSize = 4; 
    let currentPage = 1; 

    function createUserRow(user) {
        var row = "<tr>";
        row += "<td><img src='" + user.file + "' alt='User Image' class='profileUsers' ></td>";
        row += "<td>" + user.name + "</td>";
        row += "<td>" + user.email + "</td>";
        row += "<td>" + user.role + "</td>";
        row += "<td>" + user.createdAt + "</td>";
        row += "<td>" + user.updatedAt + "</td>";
        row += "<td><button class='edit-btn' data-id='" + user._id + "'>Edit</button></td>"; 
        row += "<td><button  class='btn-danger' data-id='" + user._id + "'>Delete</button></td>";
        row += "</tr>";
    
        return row;
    }
    
    function displayUserData(data) {
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
       
        var headerRow = "<thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Created At</th><th>Updated At</th><th>Action</th></tr></thead>";
    
        var html = "";
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        const usersToShow = data.slice(start, end);
        usersToShow.forEach(function(user) {
            html += createUserRow(user);
        });

        document.getElementById("userTableBody").innerHTML = html;
        document.getElementById("userTable").innerHTML = headerRow;
    }

    fetch('https://portfolioatlpbackend.onrender.com/api/V1/Blog/All')
    .then(response => response.json())
    .then(data => {
        Blogs.innerHTML = `Total: ${data.length}`;
    })
    
    function fetchUsers() {
        fetch('https://portfolioatlpbackend.onrender.com/api/V1/User/All', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            LoadBlogs.style.display = 'none';
            document.body.style.backgroundColor = "gray";
            LoadBlogs.style.marginLeft = '2em';
            Users.innerHTML = `Total: ${data.length}`;
            displayUserData(data);
        })
        .catch(error => console.error('Error fetching user data:', error));
    }

    // Fetch initial user data
    fetchUsers();

    // Event listener for clicking on edit button
    document.getElementById("userTableBody").addEventListener("click", function(event) {
        if (event.target.classList.contains("edit-btn")) {

            const userId = event.target.getAttribute("data-id");
            fetch(`https://portfolioatlpbackend.onrender.com/api/V1/User/find/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => response.json())
            .then(userData => {
                document.getElementById('editIcon').value = userData.file
                document.getElementById("editName").value = userData.name;
                document.getElementById("editEmail").value = userData.email;
                document.getElementById("editRole").value = userData.role;

                document.getElementById("editUserModal").style.display = "block";
            })
            .catch(error => console.error('Error fetching user data for edit:', error));
        }
        else if (event.target.classList.contains("btn-danger")) {
            const row = event.target.closest("tr");
            const userId = event.target.getAttribute("data-id"); 
           
        
            fetch(`https://portfolioatlpbackend.onrender.com/api/V1/User/delete/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete User post');
                }
                row.remove();
            })
            .catch(error => console.error('Error deleting User:', error));
        }
    });

    document.getElementById("editUserModal").addEventListener("click", function(event) {
        if (event.target.classList.contains("close") || event.target.id === "editUserModal") {
            document.getElementById("editUserModal").style.display = "none";
        }
    });

    document.getElementById("editUserForm").addEventListener("submit", function(event) {
        event.preventDefault();
        // Implement edit user logic here
    });

    fetchUsers(currentPage);

    // Event listener for previous page button
    prevPageButton.addEventListener("click", function() {
        if (currentPage > 1) {
            LoadBlogs.style.display = 'block';
            currentPage--;
            fetchUsers(currentPage);
        }
    });

    // Event listener for next page button
    nextPageButton.addEventListener("click", function() {
        LoadBlogs.style.display = 'block';
        currentPage++;
        fetchUsers(currentPage);
    });

   
});
