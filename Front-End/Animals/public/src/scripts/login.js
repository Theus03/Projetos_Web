// VERFICAÇÃO DO LOGIN

var nameUser = document.querySelector(".input-username");

var iconEyes = document.querySelector(".icon-eye").addEventListener("click", () => {
    nameUser.type = "text";
    document.querySelector(".icon-eye.off").style.display = "flex";
})

var iconEyesOff = document.querySelector(".icon-eye.off").addEventListener("click", () => {
    nameUser.type = "password";
    document.querySelector(".icon-eye.off").style.display = "none";
})

var buttonLogin = document.querySelector(".button.login").addEventListener("click", () => {
    if(nameUser.value == "FuncA2021") {
        document.querySelector(".form-login").action = "../pages/homeFunc.html"
    } else if(nameUser.value == "") {
        alert("É obrigatório preenchar o campo de Username.")
    }
     else {
         alert("Nome de Usuário Incorreto!")
    }
})

