import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCnWZq-1rRiWWk4AmJJVWG4mUhDB53OBao",
  authDomain: "portfolio-project-e4be2.firebaseapp.com",
  projectId: "portfolio-project-e4be2",
  storageBucket: "portfolio-project-e4be2.appspot.com",
  messagingSenderId: "683194154846",
  appId: "1:683194154846:web:536db38dd7be6407b819cf"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
auth.languageCode = 'en'
const provider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider() 

const btnGoogle = document.getElementById("btn-google");
btnGoogle.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      window.location.href = "index.html"
      console.log("User", user)
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
})

// const Github = document.getElementById("btn-github");
// Github.addEventListener("click", () => {
//   signInWithPopup(auth, githubProvider) 
//     .then((result) => {
//       const credential = GithubAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;
//       const user = result.user;
//       window.location.href = "index.html"
//     }).catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//     });
// })

const Myform = document.getElementById("Signup-form");


Myform.addEventListener("submit", async (event) => {
  var errorMessage = document.getElementById("errorMessage");
  var loadingMessage = document.getElementById("loadingMessage");
  loadingMessage.style.display = "none";
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (!name || !email || !password || !confirmPassword) {
    console.error("All fields are required");
    return;
  }

  if (password !== confirmPassword) {
    console.error("Passwords do not match");
    return;
  }

  const userData = {
    name: name,
    email: email,
    password: password,
    role:"user"
  };

  try {
    const response = await fetch("https://portfolioatlpbackend.onrender.com/api/V1/User/Create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const responseData = await response.json();
      console.error("Error:", response.status, responseData.error);
      return;
    }
    loadingMessage.style.display = "none";
    window.location.href = "index.html";
  } catch (error) {
    console.error("Error:", error);
    errorMessage.innerHTML=error
        errorMessage.style.display = "block";
        setTimeout(function() {
            loadingMessage.style.display = "none";
          }, 5000);
  }
});

