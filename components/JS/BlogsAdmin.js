document.addEventListener("DOMContentLoaded", function() {
const numBlog=document.getElementById("BlogData")
fetch('https://portfolioatlpbackend.onrender.com/api/V1/Blog/All',{
    // headers: {
    //     'Authorization': `Bearer ${token}`
    // }
})
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById("table-body");
        const blogs_num = data.length;
        numBlog.innerHTML = `Total: ${blogs_num}`;
        data.forEach(blog => {
            const date = new Date(blog.date).toLocaleDateString();
            const createdAt = new Date(blog.createdAt).toLocaleString();
            tableBody.innerHTML += `
            <tr>
                <td>${blog.title}</td>
                <td><img src="${blog.file}" alt="Image" class="image-cell"></td>
                <td><textarea readonly>${blog.description}</textarea></td>
                <td>${date}</td>
                <td>${createdAt}</td>
                <td class="action-buttons">
                <button class="action-button1">Edit</button>
                <button class="action-button2">Delete</button>
            </td>
            </tr>
        `;
        
        });
    })
    .catch(error => console.error('Error fetching blogs:', error));

});