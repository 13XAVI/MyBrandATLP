document.addEventListener("DOMContentLoaded", () => {
    const signInForm = document.getElementById("signInForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("errorMessage");
    const loadingMessage = document.getElementById("loadingMessage");
    loadingMessage.style.display = "none";
    signInForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        try {
         
            loadingMessage.style.display = "block";

            const loginData = {
                email: emailInput.value,
                password: passwordInput.value
            };

            const response = await fetch("https://portfolioatlpbackend.onrender.com/api/V1/User/Login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });

            loadingMessage.style.display = "none";

            if (!response.ok) {
                const responseData = await response.json();
                errorMessage.innerHTML = responseData.error;
                errorMessage.style.display = "block";
            } else {
                const { token,role,email } = await response.json();
                localStorage.setItem( 'email',email);
                localStorage.setItem( "token",token);
                alert(`successful logged in as ${role}`);
                 
                if (role === "admin") {
                    window.location.href = "admin.html"; 
                } else {
                    window.location.href = "index.html"; 
                }
            }
        } catch (error) {
            console.error("Error:", error);
            errorMessage.innerHTML = "An error occurred";
            errorMessage.style.display = "block";
            loadingMessage.style.display = "none";
        }
         setTimeout(() => {
            errorMessage.innerHTML = "An error occurred";
         }, 4000);
    });
   
});
