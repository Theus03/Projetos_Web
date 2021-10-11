// VERFICAÇÃO DO LOGIN

var nameUser = document.querySelector(".input-email");

var buttonLogin = document.querySelector(".button.login").addEventListener("click", () => {
    if(nameUser.value == "FuncA2021") {
        location.href = "http://127.0.0.1:5500/Front-End/Animals/public/src/pages/homeUser.html"
    } else {
        alert("deu não")
    }
})

