// MODAL DELETE

function openModalDelete() {
    document.querySelector(".modal-overlay").classList.add("active");
}


function closeModalDelete() {
    document.querySelector(".modal-overlay").classList.remove("active");
}

// MODAL EDIT

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