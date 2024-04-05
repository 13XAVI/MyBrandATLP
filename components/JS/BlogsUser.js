document.addEventListener("DOMContentLoaded", () => {
    fetch('https://portfolioatlpbackend.onrender.com/api/V1/Blog/All')
    .then(response => response.json())
    .then(data => {
        const cardContainer = document.querySelector(".swiper-wrapper");
        data.forEach(blog => {
            const date = new Date(blog.date).toLocaleDateString();
            const createdAt = new Date(blog.createdAt).toLocaleString();
            cardContainer.innerHTML += `
                <div class="swiper-slide">
                    <img src="${blog.file}" alt="${blog.title}" class="card-image">
                    <div class="card-content">
                        <h2 class="card-title">${blog.title}</h2>
                        <p class="card-description">${blog.description}</p>
                        <p class="card-date">Date: ${date}</p>
                        <p class="card-created-at">Created At: ${createdAt}</p>
                        <div class="buttonArr">
                        <button class="btn-arrow"><a href="SingleBlog.html"  class="auth-logo">More</a></button>
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
    .catch(error => console.error('Error fetching blogs:', error));
});
