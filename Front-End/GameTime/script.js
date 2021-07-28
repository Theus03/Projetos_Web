// Declarar Variável
let button_openModal = document.querySelector(".button-add");
let button_closeModal = document.querySelector(".box-close");
let modal_overlay = document.querySelector(".modal-overlay");

// Criar Função para o Modal 
const Modal = [  
    // Abrir Modal  
    button_openModal.addEventListener("click", () => {
        modal_overlay.classList.add("active");
    }),

    //Fechar Modal 
    button_closeModal.addEventListener("click", () => {
        modal_overlay.classList.remove("active");
    })
]



