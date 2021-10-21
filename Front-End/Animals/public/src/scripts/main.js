// MODAL

// Delete
function openModalDelete() {
    document.querySelector(".modal-overlay").classList.add("active");
}

function closeModalDelete() {
    document.querySelector(".modal-overlay").classList.remove("active");
}

// Edit
function openModalEdit() {
    document.querySelector(".modal-overlay.edit").classList.add("active");
}

function closeModalEdit() {
    document.querySelector(".modal-overlay.edit").classList.remove("active");
}


// LOCALSTORAGE

// Pegando Informações dos animais
const getLocalStorage = () => JSON.parse(localStorage.getItem("db_animal")) || [];

// Mostrando informações dos animais
const setLocalStorage = (dbAnimal) => localStorage.setItem("db_animal", JSON.stringify(dbAnimal))

// CRUD 

// Delete
const deleteAnimal = (index) => {
    const dbAnimal = getLocalStorage(); // pegar informações dos animais
    dbAnimal.splice(index, 1); // deleta o animal da posição(que ele está, quantos animais terão que ser deletados nessa ação)
    setLocalStorage(dbAnimal); // mostrar informações dos animais
}

// Update
const updateAnimal = (index, animal) => {
    const dbAnimal = getLocalStorage(); // pegar informações dos animais
    dbAnimal[index] = animal; // pegar informação do animal que você quer editar
    setLocalStorage(dbAnimal); // mostrar informações dos animais
}

// Read
const readAnimal = getLocalStorage(); // pegar informações dos animais

// Create
const createAnimal = (animal) => {
   const dbAnimal = getLocalStorage(); // pegar informações dos animais
   dbAnimal.push(animal); // inserindo o animal
   setLocalStorage(dbAnimal); // mostrar informações dos animais
}

// VALIDATION 

// Funcão que irá validar o form, e que poderá retornar as restrições dos forms
const isValidForm = () => {
    return document.querySelector(".form").reportValidity();
}

// INTERACTION WITH LAYOUT

// Funcão que irá limpar os campos do forms
const clearFields = () => {
    const fields = document.querySelectorAll(".field-input");
    fields.forEach(field => field.value = "");
    document.getElementById('name').dataset.index = "new";
}

const saveAniamls = () => {
    try {
        if(isValidForm()) {
            const animal = {
                animal = document.getElementById("animal").value, 
                breed = document.getElementById("breed").value,
                age = document.getElementById("age").value,
                lenght = document.getElementById("lenght").value,
                species = document.getElementById("species").value,
                kind = document.getElementById("kind").value,
                weight = document.getElementById("weight").value,
                height = document.getElementById("height").value,

            }
            const index = document.getElementById("animal").dataset.index
            if(index == "new") {
                createAnimal(animal)
                alert("Animal Registrado!");
            }
        }
    } catch (error) {
        alert(error.message);
    }
}

// DOM

// FORM

// EVENTS