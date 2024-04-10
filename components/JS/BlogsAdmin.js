document.addEventListener("DOMContentLoaded", function() {
    const LoadBlogs = document.getElementById("loading");
    const modal = document.getElementById("myModal");
    const  btnEdit= document.getElementById("blogEdit")
    LoadBlogs.style.display = 'block';
    const numBlog = document.getElementById("BlogData");
    const Users = document.getElementById("usersLength")
    const token = localStorage.getItem('token')




    const formBlog = document.getElementById("formsubmit");
    

    formBlog.addEventListener("submit", function submitForm(e) {
        e.preventDefault();
       
        const postTitle = document.getElementById("post-title").value.trim();
        const postDescription = document.getElementById("post-description").value.trim();
        const postThumbnail = document.getElementById("post-thumbnail").files[0]; 
        const postDate = document.getElementById("post-date").value.trim();

        const errorSpanTitle = document.getElementById("error1");
        const errorSpanDescription = document.getElementById("error3");
        const errorSpanImage = document.getElementById("error4");
        const errorSpanDate = document.getElementById("error5");
        const errorSuccess = document.getElementById("error-success");
    
        errorSpanTitle.innerText = ""; 
        errorSpanDescription.innerText = "";
        errorSpanImage.innerText = "";
        errorSpanDate.innerText = "";
        errorSuccess.innerText = "";

        if (postTitle === "") {
            errorSpanTitle.innerText = "Please enter a post title.";
            return;
        }
    
        if (postDescription === "") {
            errorSpanDescription.innerText = "Please enter a post description.";
            return;
        }
    
        if (!postThumbnail) {
            errorSpanImage.innerText = "Please upload a post thumbnail.";
            return;
        }
    
        if (postDate === "") {
            errorSpanDate.innerText = "Please select a post date.";
            return;
        }
        
       

        const formData = new FormData();
        formData.append('title', postTitle);
        formData.append('description', postDescription);
        formData.append('file', postThumbnail);
        formData.append('date', postDate);

        const token = localStorage.getItem("token");

        fetch('https://portfolioatlpbackend.onrender.com/api/v1/Blog/create', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        })
        .then(response => {
           
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            errorSuccess.innerHTML = "<br/>Data Sent successfully ";

        })
        .catch(error => {
            console.error('Error posting blog:', error);
            errorSuccess.innerHTML = "<br/>Failed to post data.";
        });
    });

    fetch('https://portfolioatlpbackend.onrender.com/api/V1/User/All', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
    .then(response => response.json())
    .then(data => {
        Users.innerHTML = `Total: ${data.length}`;
    })




    fetch('https://portfolioatlpbackend.onrender.com/api/V1/Blog/All')
        .then(response => response.json())
        .then(data => {
            LoadBlogs.style.display = 'none';
            LoadBlogs.style.marginLeft = '3em';
            const tableBody = document.getElementById("table-body");
            const blogs_num = data.length;
            numBlog.innerHTML = `Total: ${blogs_num}`;
            data.forEach(blog => {
                const date = new Date(blog.date).toLocaleDateString();
                const createdAt = new Date(blog.createdAt).toLocaleString();
                const bloId = blog._id
                const messages = blog.comments.map(comment => comment.message);
                tableBody.innerHTML += `
                <tr>
                    <td>${blog.title}</td>
                    <td><img src="${blog.file}" alt="Image" class="image-cell"></td>
                    <td>${blog.description}</td>
                    <td>${blog.likeCount}</td>
                    <td>${messages}</td>
                    <td>${createdAt}</td>
                    <td class="action-buttons">
                    <button class='action-button1' id='blogEdit' data-id="${blog._id}">Edit</button>
                    <button class="action-button2" data-id="${blog._id}">Delete</button>
                </td>
                
                </tr>`;
            });
            
    
        })
        .catch(error => console.error('Error fetching blogs:', error));

        document.getElementById("table-body").addEventListener("click", function(event) {
            if (event.target.classList.contains("action-button1")) {
                const row = event.target.closest("tr");
                const blogId = event.target.getAttribute("data-id"); 
            
                const title = row.querySelector("td:nth-child(1)").textContent;
                const description = row.querySelector("td:nth-child(3)").textContent;
                const date = row.querySelector("td:nth-child(4)").textContent;
            
                document.getElementById("post-title").value = title;
                document.getElementById("post-description").value = description;
                document.getElementById("post-date").value = date;
            
                modal.style.display = "block";
                modal.style.width = "'100%'";
            
                formBlog.addEventListener("submit", function(event) {
                    event.preventDefault();
            
                    updatetitle = document.getElementById("post-title").value;
                    updatefile = document.getElementById("post-thumbnail").value;
                    updatedescription = document.getElementById("post-description").value;
                    updatedate = document.getElementById("post-date").value;
            
                    const formDataEd = new FormData();
                    formDataEd.append('title', updatedate);
                    formDataEd.append('description', updatedescription);
                    formDataEd.append('file', updatedescription);
                    formDataEd.append('date', updatedate);
            
                    fetch(`https://portfolioatlpbackend.onrender.com/api/V1/Blog/update/${blogId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'multipart/form-date',
                            'Authorization': `Bearer ${token}`
                        },
                        body: formDataEd
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to update blog post');
                        }
                        modal.style.display = "none";
                        location.reload();
                    })
                    .catch(error => console.error('Error updating blog post:', error));
                });
            }
            else if (event.target.classList.contains("action-button2")) {
                const row = event.target.closest("tr");
                const blogId = event.target.getAttribute("data-id"); 
            
                fetch(`https://portfolioatlpbackend.onrender.com/api/V1/Blog/delete/${blogId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to delete blog post');
                    }
                    row.remove();
                })
                .catch(error => console.error('Error deleting blog post:', error));
            }
            
        });


            document.getElementById("myModal").addEventListener("click", function(event) {
                if (event.target.classList.contains("close") || event.target.id === "myModal") {
                    document.getElementById("myModal").style.display = "none";
                }
            });
 });





