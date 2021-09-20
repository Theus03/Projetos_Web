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

// MODAL

const Modal = {
    openModal() {
        document.querySelector(".modal-overlay").classList.add("active");
    }, 
    
    closeModal() {
        document.querySelector(".modal-overlay").classList.remove("active");
    }
}

// LOCAL STORAGE 

const getLocalStorage = () => JSON.parse(localStorage.getItem("db_university")) ?? [];

const setLocalStorage = () => localStorage.setItem("db_university", JSON.stringify(dbUniversity))

// CRUD

const readUniversity = () => getLocalStorage()

const createUniversity = (university) => {
        const dbUniversity = getLocalStorage();
        dbUniversity.push(university);
        setLocalStorage(dbUniversity);
}

// VALIDATION

const isValidFields = () => { 
    return document.getElementById('form').reportValidity();
}

// INTERACTION WITH LAYOUT

const clearFields = () => {
    const fields = document.querySelectorAll('.form-field')
    fields.forEach(field => field.value = "")
    document.getElementById('name').dataset.index = 'new'
}

const saveUniversity = () => {
    try{
        if(isValidFields()) {
            const university = {
                name: document.getElementById('name').value,
                course: document.getElementById('course').value,
                price: document.getElementById('price').value,
                type: document.getElementById('type').value,
                nomenclature: document.getElementById('nomenclature').value,
                duration: document.getElementById('duration').value,
                local: document.getElementById('local').value,
                degree: document.getElementById('degree').value,
            }
            const index = document.getElementById('name').dataset.index
            if(index == "new") {
                createUniversity(university)
                updateTableUniversity()
            } else {
                updateUniversity(index, university)
                updateTableUniversity()
            }
        }
    } catch (error) {
        alert(error.message)
    }
}


// DOM 

const createRowUniversity = (university, index) => {
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${university.name}</td>
        <td>${university.course}</td>
        <td>${university.price}</td>
        <td>${university.type}</td>
        <td>${university.nomenclature}</td>
        <td>${university.duration}</td>
        <td>${university.local}</td>
        <td>${university.degree}</td>
        <td>
            <img src="../icons/edit.png" alt="" id="edit-${index}">
            <img src="../icons/delete.png" id="delete-${index}" alt="" style="width:2.8rem;" onclick="Modal.openModal()">
        </td>
    `

    document.querySelector('#data-table>tbody tr').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#data-table>tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTableUniversity = () => {
    const dbUniversity = readUniversity()
    clearTable();
    dbUniversity.forEach(createRowUniversity)
}

// FORM 

// EVENTS


