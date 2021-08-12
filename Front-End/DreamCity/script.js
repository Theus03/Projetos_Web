const Modal = {
    modalAdd() {
        document.querySelector('.modal-overlay.add')
            .classList.add('active');
    },
    modalAddClose() {
        document.querySelector('.modal-overlay.add')
            .classList.remove('active');
    },

    modalConfAddOpen() {
        document.querySelector('.modal-overlay.confirmAdd')
        .classList.add('active');
        Modal.modalAddClose();
    },

    modalConfAddClose() {
        document.querySelector('.modal-overlay.confirmAdd')
            .classList.remove('active');
    },

    modalConfDeleteOpen() {
        document.querySelector('.modal-overlay.confirmDelete')
            .classList.add('active');
    },

    modalConfDeleteClose() {
        document.querySelector('.modal-overlay.confirmDelete')
            .classList.remove('active')
    }
}

const Storage = {
    // Pegar informações das cidades
    get() {
        return JSON.parse(localStorage.getItem("dreamcity: cities")) || []     
    },
    // Mostrando informações das cidades, por exemplo o estado e o país que fica a cidade
    set(cities) {
        localStorage.setItem("dreamcity: cities", JSON.stringify(cities))
    }
}

const City = {
    // pega todas as cidades ques estão no Storage
    all: Storage.get(),

    add(city) {
        // Inseri uma nova cidade
        City.all.push(city)

        // reinicia o app
        App.reload()
    },

    remove(index) {
        Modal.modalConfDeleteOpen();
        confirm_delete: document.querySelector('.button.confirm-delete').addEventListener('click', () => {
            // remove a cidade só se o usuário clicar em excluir
            City.all.splice(index, 1)
            
            // reinicia o app
            App.reload()
        }) 
    },


    total() {
        // defini a variável
        let totalCity = 0;

        // Vai buscar dentro do Storage o total de cidades que contém dentro do Storage
        City.all.forEach(() => {
            totalCity++;
        });

        return totalCity;
    }
}

const DOM = {
    // definindo o container das cidades
    cityContainer: document.querySelector('#data-table tbody'),

    // Adiciona uma cidade dentro da tabela
    addCity(city, index){
        // criar um elemento tr para que possa ser adicionado no html
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLCity(city, index)
        tr.dataset.index = index;

        DOM.cityContainer.appendChild(tr);
    },

    innerHTMLCity(city, index) {
        // estrutura html da tabela
        const html = `
        <tr>
            <td class="name_city">${city.name_city}</td>
            <td class="name_state">${city.name_state}</td>
            <td class="name_country">${city.name_country}</td>
            <td><img class="icon-delete" src="./img/delete.png" title="Excluir" alt="delete" onclick="City.remove(${index}) "></td>
        </tr>
        ` 

        return html
    },

    updateTotal() {
        // atualiza o total de cidades
        document.querySelector('.result-total'). innerHTML = City.total();
    },

    clearCities() {
        DOM.cityContainer.innerHTML = "";
    }
}

const Form = {
    // declarando as informações que tem dentro do formulário
    name_city: document.querySelector('input#name_city'),
    name_state: document.querySelector('input#name_state'),
    name_country: document.querySelector('input#name_country'),

    // pegando os valores das caixas de input
    getValues() {
        return {
            name_city: Form.name_city.value,
            name_state: Form.name_state.value,
            name_country: Form.name_country.value
        }
    },

    // validando os campos
    validateFields() {
        const { name_city, name_state, name_country } = Form.getValues()

        // verifica se os campos estão vazios, caso estejam retornam uma mensagem de erro
        if(name_city.trim() === "" || name_state.trim() === "" || name_country.trim() === ""){
            throw new Error("Por favor, preencha todos os campos.")
        }
    },

    //Formata os valores que estão nos campos
    formatValues() {
        let { name_city, name_state, name_country } = Form.getValues()

        return {
            name_city,
            name_state,
            name_country
        }
    },

    // limpar campos do formulário
    clearFields() {
        Form.name_city.value = ""
        Form.name_state.value = ""
        Form.name_country.value = ""
    },

    // aqui ocorre o envio das informações do formulário, assim é chamado a função add para adicionar as informações da cidade na tabela
    submit(event) {
        event.preventDefault()

        try {
            Form.validateFields()
            const city = Form.formatValues()
            City.add(city)
            Form.clearFields()
            Modal.modalConfAddOpen()
        } catch (error) {
            alert(error.message)
        }
    }
}

const App = {
    // da início no app, e chama os métodos de salvamento das cidades e atualização do total de cidades

    init() {
        City.all.forEach(DOM.addCity)

        DOM.updateTotal()

        Storage.set(City.all)
    },

    // reinicializa o app e limpa as cidades
    reload() {
        DOM.clearCities()
        App.init()
    }
}

// inicializa o app
App.init()