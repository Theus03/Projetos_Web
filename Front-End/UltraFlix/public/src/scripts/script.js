/*======== LABEL ===========*/

const labelForm = [
    nome = document.getElementById('nome'),
    tipo = document.getElementById('tipo'),
    genero = document.getElementById('genero'),
    plataforma = document.getElementById('plataforma'),
    
    nome.addEventListener('keypress', function(){
        document.querySelector('.sr-only.nome').style.visibility = 'visible';
    }),
    
    tipo.addEventListener('keypress', function(){
        document.querySelector('.sr-only.tipo').style.visibility = 'visible';
    }), 
    
    genero.addEventListener('keypress', function(){
        document.querySelector('.sr-only.genero').style.visibility = 'visible';
    }), 
    
    plataforma.addEventListener('keypress', function(){
        document.querySelector('.sr-only.plataforma').style.visibility = 'visible';
    }), 
    
]

/*======== MODAL ===========*/

function modalOpen(){
    document.querySelector('.modal-overlay').classList.add('active')
}

function modalClose() {
    document.querySelector('.modal-overlay').classList.remove('active')
}

/*======== STORAGE ===========*/

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_flix')) ?? []

const setLocalStorage = (dbFlix) => localStorage.setItem("db_flix", JSON.stringify(dbFlix))

/*======== CRUD ===========*/

const deleteFlix = (index) => {
    const dbFlix = readFlix()
    
    dbFlix.splice(index, 1)
    setLocalStorage(dbFlix)
}

const updateFlix = (index, flix) => {
    const dbFlix = readFlix()
    dbFlix[index] = flix
    setLocalStorage(dbFlix)
}

const readFlix = () => getLocalStorage()

const createFlix = (flix) => {
    const dbFlix = getLocalStorage()
    dbFlix.push(flix)
    setLocalStorage(dbFlix)
}

/*======== VALIDATION ===========*/

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

/*======== INTERACTION WITH LAYOUT ===========*/

const clearFields = () => {
    const fields = document.querySelectorAll('.form-field')
    fields.forEach(field => field.value = "")
    document.getElementById('nome').dataset.index = 'new'
}

const saveFlix = () => {
    try {
        if(isValidFields()) {
            const flix = {
                nome: document.getElementById('nome').value,
                tipo: document.getElementById('tipo').value,
                genero: document.getElementById('genero').value,
                plataforma: document.getElementById('plataforma').value
            }
            const index = document.getElementById('nome').dataset.index
            if (index == 'new') {
                createFlix(flix)
                updateTableFlix()
            } else {
                updateFlix(index, flix)
                updateTableFlix()
            }
        }
    } catch (error) {
        alert(error.message)
    }
    
}

/*======== DOM ===========*/

const createRowFlix = (flix, index) => {
    const newRow = document.createElement('tr')
    
    newRow.innerHTML = `
    <td>${flix.nome}</td>
    <td>${flix.tipo}</td>
    <td>${flix.genero}</td>
    <td>${flix.plataforma}</td>
    <td class="actions-button">
    <svg id="edit-${index}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="icon-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
    
    <svg id="delete-${index}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="icon-delete"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
    </td>
    `
    document.querySelector('#data-table>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#data-table>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTableFlix = () => {
    const dbFlix = readFlix()
    clearTable()
    dbFlix.forEach(createRowFlix)
}

/*======== FORM ===========*/

const fillFields = (flix) => {
    document.getElementById('nome').value = flix.nome
    document.getElementById('tipo').value = flix.tipo
    document.getElementById('genero').value = flix.genero
    document.getElementById('plataforma').value = flix.plataforma
    document.getElementById('nome').dataset.index = flix.index
}

const editFlix = (index) => {
    const flix = readFlix()[index]
    flix.index = index
    fillFields(flix)
}


const editDelete = (event) => {
    if(event.target.tagName == 'svg') {
        const[action, index] = event.target.id.split('-')
        
        if(action == 'edit'){
            document.querySelector('.result-edit').style.display = 'flex'
            document.querySelector('.container-table').style.display = 'none'
            document.querySelector('.text-title').style.display = 'none'
            document.querySelector('.text-title.edit').style.display = 'inline-block'
            editFlix(index)
        } else {
            const flix = readFlix()[index]
            modalOpen()
            document.getElementById('confirmDelete').addEventListener('click', () => {
                deleteFlix(index)
                modalClose()
                updateTableFlix()

            }) 
        }
    }
}

updateTableFlix()


/*======== EVENTS ===========*/


document.getElementById('addFlix')
    .addEventListener('click', saveFlix)

document.querySelector('#data-table>tbody')
    .addEventListener('click', editDelete)

    