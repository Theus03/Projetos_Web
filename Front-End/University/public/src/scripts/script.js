/* ======== HOME ========*/

// SLIDER 

let time = 4000,
    currentImageWeb = 0,
    images = document.querySelectorAll(".sliders img")
    max = images.length;

    // Função que troca a imagem
    function nextImage() {
        images[currentImageWeb].classList.remove("selected")

        currentImageWeb++

        if(currentImageWeb >= max)
            currentImageWeb = 0

        images[currentImageWeb].classList.add("selected")
    }

    // Função para executar o sliders 
    function startImage() {
        setInterval(() => {
            // Troca imagem
            nextImage();
        }, time)
    }

window.addEventListener("load", startImage)


/* ======== MY LIST ========*/

const Modal = {
    openModal() {
        document.querySelector(".modal-overlay").classList.add("active");
    }, 
    
    closeModal() {
        document.querySelector(".modal-overlay").classList.remove("active");
    }
}