  
'use strict'


// MODAL
const Modal = {
    openModal() {
        document.querySelector('.modal-overlay').classList.add('active');
    },
    closeModal() {
        document.querySelector('.modal-overlay').classList.remove('active');
    }
}


// STORAGE

// pegando o que tem dentro do banco de dados e tranformando em JSON e também verifica caso não tenha nenhum cliente registrado.
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_phone')) ?? []

//Enviar os dados para o localStorage e tranforma em JSON
const setLocalStorage = (dbPhone) => localStorage.setItem("db_phone", JSON.stringify(dbPhone))



// CRUD - create read update delete

const deletePhone = (index) => {
    const dbPhone = readPhone()
    dbPhone.splice(index, 1)
    setLocalStorage(dbPhone)
}

const updatePhone = (index, phone) => {
    const dbPhone = readPhone()
    dbPhone[index] = phone
    setLocalStorage(dbPhone)
}

const readPhone = () => getLocalStorage()

const createPhone = (phone) => {
    const dbPhone = getLocalStorage()
    dbPhone.push (phone)
    setLocalStorage(dbPhone)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('modelo').dataset.index = 'new'
}

const savePhone = () => {
    if (isValidFields()) {
        const phone = {
            modelo: document.getElementById('modelo').value,
            marca: document.getElementById('marca').value,
            armazenamento: document.getElementById('armazenamento').value,
            memoria: document.getElementById('memoria').value,
            bateria: document.getElementById('bateria').value
        }
        const index = document.getElementById('modelo').dataset.index
        if (index == 'new') {
            createPhone(phone)
            updateTable()
            Modal.closeModal()
        } else {
            updatePhone(index, phone)
            updateTable()
            Modal.closeModal()
        }
    }
}

const createRow = (phone, index) => {
    const newRow = document.createElement('tr')
    
    newRow.innerHTML = `
        <td>${phone.modelo}</td>
        <td>${phone.marca}</td>
        <td>${phone.armazenamento}</td>
        <td>${phone.memoria}</td>
        <td>${phone.bateria}</td>
        <td>
            <div class="container-buttons">
                <button type="button" class="button-edit" id="edit-${index}">Editar</button>
                <button type="button" class="button-remove" id="delete-${index}">Remover</button>
            </div>
        </td>
    `
    document.querySelector('#data-table>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#data-table>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbPhone = readPhone()
    clearTable()
    dbPhone.forEach(createRow)
}

const fillFields = (phone) => {
    document.getElementById('modelo').value = phone.modelo
    document.getElementById('marca').value = phone.marca
    document.getElementById('armazenamento').value = phone.armazenamento
    document.getElementById('memoria').value = phone.memoria
    document.getElementById('bateria').value = phone.bateria
    document.getElementById('modelo').dataset.index = phone.index
}

const editPhone = (index) => {
    const phone = readPhone()[index]
    phone.index = index
    fillFields(phone)
    Modal.openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editPhone(index)
        } else {
            const phone = readPhone()[index]
            const response = confirm(`Deseja realmente excluir o celular ${phone.modelo}`)
            if (response) {
                deletePhone(index)
                updateTable()
            }
        }
    }
}

updateTable()

// Eventos

document.getElementById('addPhone')
    .addEventListener('click', savePhone)

document.querySelector('#data-table>tbody')
    .addEventListener('click', editDelete)












// 'use strict'

// // MODAL
// const Modal = {
//     openModal() {
//         document.querySelector('.modal-overlay').classList.add('active');
//     },
//     closeModal() {
//         document.querySelector('.modal-overlay').classList.remove('active');
//     }
// }

// const Storage = {
//     getStorage() {
//         JSON.parse(localStorage.getItem('dbPhone')) ?? []
//     },

//     setStorage(dbPhone) {
//         localStorage.setItem("dbPhone", JSON.stringify(dbPhone))
//     }
// }

// const CRUD = {
//     delete(index) {
//         const dbPhone = read()
//         dbPhone.splice(index, 1)
//         Storage.setStorage(dbPhone)
//     },

//     update(index, phone){
//         const dbPhone = read()
//         dbPhone[index] = phone
//         Storage.setStorage(dbPhone)
//     },

//     read() {
//         Storage.getStorage()
//     },

//     create(phone) { 
//         const dbPhone = Storage.getStorage()
//         dbPhone.push(phone)
//         Storage.setStorage(dbPhone)
//     }
// }


// const isValidFields = () => {
//     return document.getElementById('form').reportValidity()
// }



// const DOM = {
//     addPhone(phone, index) {
//         const tr = document.createElement('tr')
//         tr.innerHTML = `
//             <td>${phone.modelo}</td>
//             <td>${phone.marca}</td>
//             <td>${phone.armazenamento}</td>
//             <td>${phone.memoria}</td>
//             <td>${phone.bateria}</td>
//             <td>
//                 <div class="container-buttons">
//                     <input type="button" value="Editar" class="button-edit" id="edit-${index}">
//                     <input type="button" value="Remover" class="button-remove" id="delete-${index}">
//                 </div>
//             </td>
//         `
//         document.querySelector('#data-table>tbody').appendChild(tr)
//     },

//     clearTable() {
//         const rows = document.querySelectorAll('#data-table>tbody tr')
//         rows.forEach(row => row.parentNode.removeChild(row))
//     },

//     updateTable() {
//         const dbPhone = CRUD.read()
//         clearTable()
//         dbPhone.forEach(addPhone)
//     }
// }

// const Form = {

//     clearFields() {
//         const fields = document.querySelectorAll('.modal-field')
//         fields.forEach(field => field.value = '');
//         document.getElementById('modelo').dataset.index = 'new'
//     },
    
//     savePhone() {
//         alert('ou')
//         if(isValidFields()) {
//             const phone = {
//                 modelo: document.getElementById('modelo').value,
//                 marca: document.getElementById('marca').value,
//                 armazenamento: document.getElementById('armazenamento').value,
//                 memoria: document.getElementById('memoria').value,
//                 bateria: document.getElementById('bateria').value
//             }

//             const index = document.getElementById('modelo').dataset.index
            
//             if(index == 'new') {
//                 CRUD.create(phone)
//                 DOM.updateTable()
//                 Modal.closeModal()
//             } else {
//                 CRUD.update(index, phone)
//                 DOM.updateTable()
//                 Modal.closeModal()
//             }
//         }
//     },

//     fillFields(phone) {
//         document.getElementById('modelo').value = phone.modelo
//         document.getElementById('marca').value = phone.marca
//         document.getElementById('armazenamento').value = phone.armazenamento
//         document.getElementById('memoria').value = phone.memoria
//         document.getElementById('bateria').value = phone.bateria
//         document.getElementById('modelo').dataset.index = phone.modelo
//     },
        
//     editPhone(index){
//         const phone = CRUD.read()[index]
//         phone.index = index
//         fillFields(phone)
//         Modal.openModal()
//     },

//     deletePhone(event){
//         if (event.target.type == 'button') {

//             const [action, index] = event.target.id.split('-')

//             if (action == 'edit') {
//                 editPhone(index)
//             } else {
//                 const phone = CRUD.read()[index]
//                 const response = confirm(`Deseja realmente excluir o celular ${phone.nome}`)
//                 if (response) {
//                     CRUD.delete(index)
//                     DOM.updateTable()
//                 }
//             }
//         }
//     }
// }

// DOM.updateTable()


// // Eventos
// document.getElementById('add-phone')
//     .addEventListener('click', Form.savePhone())

// document.querySelector('#data-table>tbody')
//     .addEventListener('click', editDelete)
