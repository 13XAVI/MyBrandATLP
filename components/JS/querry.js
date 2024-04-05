document.addEventListener("DOMContentLoaded", function() {
    var loadingMessage = document.getElementById("loadingMessage");
    var errorMessage = document.getElementById("errorMessage");
    loadingMessage.style.display = "none";
    errorMessage.style.display = "none";
    document.getElementById("sendMessage").addEventListener("click", function(e) {
      var userEmail = document.getElementById("email").value;
      var message = document.getElementById("message").value;
    
      var data = {
        email: userEmail,
        message: message
      };
  
      loadingMessage.style.display = "block";

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
          loadingMessage.style.display = "none";
        } else {
          throw new Error('Failed to send message');
          
        }
      })
      .catch(error => {
        alert(error.message);
        errorMessage.innerHTML=error.message
        errorMessage.style.display = "block";
        setTimeout(function() {
            loadingMessage.style.display = "none";
          }, 5000);
      });
    });
  });



 