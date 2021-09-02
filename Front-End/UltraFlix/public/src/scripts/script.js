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

const getStorage = () => JSON.parse(localStorage.getItem('db_flix')) ?? []

const setStorage = (db_flix) => localStorage.setItem("db_filx", JSON.stringify(dbFlix))

/*======== CRUD ===========*/

const deleteFlix = (index) => {
    const dbFlix = readFlix()
    dbFlix.splice(index, 1)
    setStorage(dbFlix)
}

const updateFlix = (index, flix) => {
    const dbFlix = readFlix()
    dbFlix[index] = flix
    setStorage(dbFlix)
}

const readFlix = () => getStorage()

const createFlix = (flix) => {
    const dbFlix = getStorage()
    dbFlix.push(flix)
    setStorage(dbFlix)
}

/*======== VALIDATION ===========*/

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

/*======== INTERACTION WITH LAYOUT ===========*/

const clearFields = () => {
    const fields = document.querySelectorAll('.input-form')
    fields.forEach(field => field.value = "")
    document.getElementById('nome').dataset.index = 'new'
}

const saveFlix = () => {
    if(isValidFields()) {
        const flix = {
            nome: document.getElementById('nome').value,
            tipo: document.getElementById('tipo').value,
            genero: document.getElementById('genero').value,
            plataforma: document.getElementById('plataforma').value
        }
        const index = document.getElementById('nome').dataset.index
        if(index == 'new') {
            createFlix(flix)
            updateTable()
            modalClose()
        } else {
            updateFlix(index, flix)
            updateTable()
            modalClose()
        }
    }
}

/*======== DOM ===========*/

const creatRow = (flix, index) => {
    const newRow = document.createElement('tr')

    newRow.innerHTML = `
        <td>${flix.nome}</td>
        <td>${flix.tipo}</td>
        <td>${flix.genero}</td>
        <td>${flix.plataforma}</td>
        <td>
            <a href="../pages/edit.html">
                <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="icon-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </a>
            <a onclick="modalOpen()" >
                <svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="icon-delete"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </a>
        </td>
    `
    document.querySelector('#data-table>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#data-table>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbFlix = readFlix()
    clearTable()
    dbFlix.forEach(createRow)
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
    location.href = '../pages/edit.html'
}

function isDeleteFlix(){
    deleteFlix();
}

const editDelete = (event) => {
    if(event.target.type == 'button') {
        const [action, index] = event.target.id.split('-')

        if(action == 'edit'){
            editFlix(index)
        } else {
            const flix = readFlix()[index]
            modalOpen()
            if(isDeleteFlix()){
                deleteFlix(index)
                modalClose()
                updateTable()
            }
        }
    }
}

updateTable()


