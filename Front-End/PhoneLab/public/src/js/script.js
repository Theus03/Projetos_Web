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

const Storage = {
    getStorage() {
        JSON.parse(localStorage.getItem('dbPhone')) ?? []
    },

    setStorage(dbPhone) {
        localStorage.setItem("dbPhone", JSON.stringify(dbPhone))
    }
}

const CRUD = {
    delete(index) {
        const dbPhone = read()
        dbPhone.splice(index, 1)
        Storage.setStorage(dbPhone)
    },

    update(index, phone){
        const dbPhone = read()
        dbPhone[index] = phone
        Storage.setStorage(dbPhone)
    },

    read() {
        Storage.getStorage()
    },

    create(phone) { 
        const dbPhone = Storage.getStorage()
        dbPhone.push(phone)
        Storage.setStorage(dbPhone)
    } 
}


const DOM = {
    addPhone() {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td>${phone.modelo}</td>
            <td>${phone.marca}</td>
            <td>${phone.armazenamento}</td>
            <td>${phone.memoria}</td>
            <td>${phone.bateria}</td>
            <td>
                <div class="container-buttons">
                    <input type="button" value="Editar" class="button-edit" id="edit-${index}">
                    <input type="button" value="Remover" class="button-remove" id="delete-${index}">
                </div>
            </td>
        `
        document.querySelector('#data-table>tbody').appendChild(tr)
    },

    clearTable() {
        const rows = document.querySelectorAll('#data-table>tbody tr')
        rows.forEach(row => row.parentNode.removeChild(row))
    },

    updateTable() {
        const dbPhone = readPhone()
        DOM.clearTable()
        dbPhone.forEach(addPhone)
    }
}

const Form = {
    validateFields() {
        return document.getElementById('form').reportValidity();
    },

    clearFields() {
        const fields = document.querySelectorAll('.modal-field')
        fields.forEach(field => field.value = '');
        document.getElementById('modelo').dataset.index = 'new'
    },
    
    savePhone() {
        alert('ou')
        if(validateFields()) {
            const phone = {
                modelo: document.getElementById('modelo').value,
                marca: document.getElementById('marca').value,
                armazenamento: document.getElementById('armazenamento').value,
                memoria: document.getElementById('memoria').value,
                bateria: document.getElementById('bateria').value
            }

            const index = document.getElementById('modelo').dataset.index
            
            if(index == 'new') {
                CRUD.create(phone)
                DOM.updateTable()
                Modal.closeModal()
            } else {
                CRUD.update(indexphone)
                DOM.updateTable(index, phone)
                Modal.closeModal()
            }
        }
    },

    fillFields(phone) {
        document.getElementById('modelo').value = phone.modelo
        document.getElementById('marca').value = phone.marca
        document.getElementById('armazenamento').value = phone.armazenamento
        document.getElementById('memoria').value = phone.memoria
        document.getElementById('bateria').value = phone.bateria
        document.getElementById('modelo').dataset.index = phone.modelo
    },
        
    editPhone(index){
        const phone = CRUD.read()[index]
        phone.index = index
        fillFields(phone)
        Modal.openModal()
    },

    deletePhone(event){
        if (event.target.type == 'button') {

            const [action, index] = event.target.id.split('-')

            if (action == 'edit') {
                editPhone(index)
            } else {
                const phone = CRUD.read()[index]
                const response = confirm(`Deseja realmente excluir o celular ${phone.nome}`)
                if (response) {
                    CRUD.delete(index)
                    DOM.updateTable()
                }
            }
        }
    }
}

DOM.updateTable()


// Eventos
document.getElementById('add-phone')
    .addEventListener('click', Form.savePhone())

document.querySelector('#data-table>tbody')
    .addEventListener('click', editDelete)
