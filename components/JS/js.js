document.addEventListener("DOMContentLoaded", function() {
    const formBlog = document.getElementById("form-submit");
    const loadingMessage = document.getElementById("loading-message");
   loadingMessage.style.display='none'
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
        
        loadingMessage.innerText = "Sending message..."; 

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
            loadingMessage.innerText = "";
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
});
