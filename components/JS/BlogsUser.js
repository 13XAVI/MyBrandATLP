document.addEventListener("DOMContentLoaded", (event) => {
    var loadingMessage = document.getElementById("loading-blog");
    var errorMessage = document.getElementById("errorMessage");
    const token = localStorage.getItem("token")
    const single = document.getElementById("blogItemz")
    fetch('https://portfolioatlpbackend.onrender.com/api/V1/Blog/All')
    .then(response => response.json())
    .then(data => {
        const cardContainer = document.querySelector(".swiper-wrapper");
        data.forEach(blog => {
          
            const createdAt = new Date(blog.createdAt).toLocaleString();
            cardContainer.innerHTML += `
                <div class="swiper-slide">
                    <img src="${blog.file}" alt="${blog.title}" class="card-image">
                    <div class="card-content">
                        <h2 class="card-title">${blog.title}</h2>
                        <p class="card-description">${blog.description}</p>
                        <p class="card-date">Date: ${blog.likeCount}</p>
                        <p class="card-date">Date: ${blog.comments.message}</p>
                        <p class="card-created-at">Created At: ${createdAt}</p>
                        <div class="buttonArr">
                        <button class="btn-arrow">
                            <a href="SingleBlog.html?blogId=${blog._id}" class="auth-logo">More</a>
                        </button>
                    </div>

                    </div>
                </div>
            `;
        });


        var swiper = new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    })
    .catch(error => {
        console.error('Error fetching blogs:', error);
        errorMessage.innerHTML = "Error fetching blogs";
        errorMessage.style.display = "block";
    })
    .finally(() => {
        loadingMessage.style.display = "none"; 
    });


    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('blogId');
    
    fetch(`https://portfolioatlpbackend.onrender.com/api/V1/Blog/find/${blogId}`, {
    method: "GET",
    headers: {
        'Authorization': `Bearer ${token}`
    }
})

    .then(response => response.json())
.then(blog => { // Change data to blog
    single.innerHTML += `
        <h2 class="blog-name">${blog.title}</h2>
        <div class="image-blog">
            <img src="${blog.file}" alt="${blog.title}" class="bloImage">
        </div>
        <div class="descr">
            <div class="header-des">
            <p class="descr-header"> Description</p>
            </div>
            <div class="descr-des"> <p class="descr-paragraph">${blog.description}</p></div>
            <div class="icon-blogs">
                <div class="blogCount">${blog.likeCount}</div>
                
                
                <div class="iconB" id="countLikes"><img src="./components/images/like (1).png" alt=""  class="icons-blogz"></div>
                <div class="iconB"><img src="./components/images/heart (1).png" alt="" class="icons-blogz"> </div>
                <div class="iconB"><img src="./components/images/share_1358023.png" alt="" class="icons-blogz"></div>
                
            </div>
            <div class="comment">
                <div class="commentB"> <p class="coom">Comments</p></div>
                
                ${blog.comments.map(comment => `
                    <div class="comment-item">
                        <p>${comment.message}</p>
                    </div>
                `).join('')}
            </div>
            <div class="last">
                <div></div>
                <textarea name="comment" id="comment" cols="40" rows="6" class="commentArea" ></textarea>
                <div class="btn-image-icon">
                    <div></div>
                    <span class='sendMessage'></span>
                    <div></div>
                    <button class="button-blog" id="btnBlogCom"><img src="./components/images/bi_send.svg" alt="" class="ima-blogz"></button>
                </div>
            </div>
        </div>
    `;
})

    .catch(error => console.error('Error  fetching blogs:', error));

    
document.getElementById("countLikes").addEventListener("click",()=>{
    const datas = {
        blogId: blogId,
        userId: `${localStorage.getItem('userId')}`
    }

    fetch('https://portfolioatlpbackend.onrender.com/api/V1/Like/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datas)
        })
        .then(response => {
            if (response.ok) {
                alert("Message sent successfully!");
                errorMessage.style.display = "none";
            } else {
                throw new Error('Failed to send message');
            }
        })
        .catch(error => {
            alert(error.message);
            errorMessage.style.display = "block";
        })
        .finally(() => {
            // loadingMessagees.style.display = "none";
        });
        
})
document.getElementById("btnBlogCom").addEventListener("click",()=>{
    const comment = document.getElementById("comment").value
    const datas = {
        blogId: blogId,
        userId: `${localStorage.getItem('userId')}`,
        message:comment
    }

    fetch('https://portfolioatlpbackend.onrender.com/api/V1/comment/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datas)
        })
        .then(response => {
            if (response.ok) {
                alert("Message sent successfully!");
                errorMessage.style.display = "none";
            } else {
                throw new Error('Failed to send message');
            }
        })
        .catch(error => {
            alert(error.message);
            errorMessage.style.display = "block";
        })
        .finally(() => {
            // loadingMessagees.style.display = "none";
        });
        
})

});




document.addEventListener("DOMContentLoaded", function() {
    var errorMessage = document.getElementById("errorMessage");
    var sendMessageButton = document.getElementById("sendMessage");
    // var loadingMessagees = document.getElementById("loading");
    var emailInput = document.getElementById("email");
    var messageInput = document.getElementById("message");

    errorMessage.style.display = "none";

    sendMessageButton.addEventListener("click", function() {
        var userEmail = emailInput.value;
        var message = messageInput.value;

        var data = {
            email: userEmail,
            message: message
        };

        // loadingMessagees.style.display = "block";

        fetch('https://portfolioatlpbackend.onrender.com/api/V1/Querry/Createquery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                alert("Message sent successfully!");
                errorMessage.style.display = "none";
            } else {
                throw new Error('Failed to send message');
            }
        })
        .catch(error => {
            alert(error.message);
            errorMessage.style.display = "block";
        })
        .finally(() => {
            // loadingMessagees.style.display = "none";
        });
    });
});
