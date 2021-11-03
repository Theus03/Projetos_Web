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
const getLocalStorage = () => JSON.parse(localStorage.getItem("db_animal")) ?? [];

// Mostrando informações dos animais
const setLocalStorage = (dbAnimal) => localStorage.setItem("db_animal", JSON.stringify(dbAnimal))

// CRUD 

// Delete
const deleteAnimal = (index) => {
    const dbAnimal = readAnimal(); // pegar informações dos animais
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
const readAnimal = () => getLocalStorage(); // pegar informações dos animais

// Create
const createAnimal = (animal) => {
   const dbAnimal = getLocalStorage(); // pegar informações dos animais
   dbAnimal.push(animal); // inserindo o animal
   setLocalStorage(dbAnimal); // mostrar informações dos animais
}


// TOTAL
const totalAnimal = () => {
    document.querySelector(".total").innerHTML = getLocalStorage().length;
}


// VALIDATION 

// Funcão que irá validar o form, e que poderá retornar as restrições dos forms
function isValidForm() {
    return document.getElementById("form").reportValidity();
}

// INTERACTION WITH LAYOUT

// Funcão que irá limpar os campos do forms
const clearFields = () => {
    const fields = document.querySelectorAll(".field-input");
    fields.forEach(field => field.value = "");
    document.getElementById('name').dataset.index = "new";
}


// Funcão que irá salvar os animais
const saveAnimal = () => {
    // irá tentar fazer as seguintes ações
    try {
        // na verificação irá chamar a função isValidForm(), caso a função dfor true ele irá pegar os valores que foram inseridos dentro de cada input
        if(isValidForm()) {
            const animal = {
                animal: document.getElementById("animal").value, 
                breed: document.getElementById("breed").value,
                age: document.getElementById("age").value,
                length: document.getElementById("length").value,
                species: document.getElementById("species").value,
                kind: document.getElementById("kind").value,
                weight: document.getElementById("weight").value,
                height: document.getElementById("height").value
            }
            const index = document.getElementById("animal").dataset.index
            // verificando se o index que é o campo chave, tem o data-index = "new"
            if(index == "new") {
                createAnimal(animal)
                alert("Animal Registrado!");
            } else {
                updateAnimal(index, animal)
                updateTableAnimal()
            }
        }
    } catch (error) {
        alert(error.message);
    }
}

// DOM
// criar uma função onde irá mostrar um esqueleto HTML de como ficará nossa lista
const createRowAnimal = (animal, index) => {
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${animal.animal}</td>
        <td>${animal.breed}</td>
        <td>${animal.age}</td>
        <td>${animal.length}</td>
        <td>
            <a class="link-edit" id="edit-${index}" >Editar/Detalhes</a><br><hr>
            <a class="link-delete" id="delete-${index}">Excluir</a>
        </td>
    `
    document.querySelector("#data-table>tbody").appendChild(newRow);
}

// criar função que limpa a tabela
const clearTable = () => {
    const rows = document.querySelectorAll("#data-table>tbody tr")
    rows.forEach(row => row.parentNode.removeChild(row))
}

// criar função que atualiza a tabela
const updateTableAnimal = () => {
    const dbAnimal = readAnimal();
    clearTable()
    dbAnimal.forEach(createRowAnimal);
    totalAnimal()
}

// FORM

const emptyTable = document.querySelectorAll('#data-table>tbody>tr td').value

// criar função para preencher os campos
const fillFields = (animal) => {
    document.getElementById("animal").value = animal.animal
    document.getElementById("breed").value = animal.breed
    document.getElementById("age").value = animal.age
    document.getElementById("length").value = animal.length
    document.getElementById("species").value = animal.species
    document.getElementById("kind").value = animal.kind
    document.getElementById("weight").value = animal.weight
    document.getElementById("height").value = animal.height
    document.getElementById("animal").dataset.index = animal.index
}

// função que faz a ação para editar
const editAnimal = (index) => {
    const animal = readAnimal()[index]
    animal.index = index
    fillFields(animal)
}

// função que faz a ação para excluir
const editDelete = (event) => {
    if(event.target.a != "") {
        const[action, index] = event.target.id.split('-')

        if(action == "edit") {
            openModalEdit();
            editAnimal(index);
        } else {
            openModalDelete();
            document.getElementById("confirmDelete").addEventListener("click", () => {
                deleteAnimal(index);
                closeModalDelete();
                updateTableAnimal()
            })
        }
    }
}

updateTableAnimal();


// EVENTS

document.getElementById("addAnimal").addEventListener('click', saveAnimal)

document.querySelector("#data-table>tbody").addEventListener("click", editDelete)