var modal_overlay = document.querySelector(".modal-overlay");

const Modal = {
    Open(){
        modal_overlay.classList.add("active");
    },
    Close(){
        modal_overlay.classList.remove("active");
    }
}

const Storage = {
    // Pegar informações das transações
    get() {
        return JSON.parse(localStorage.getItem("family.finances:transactions")) || []
    },
    // Mostrar informações das transações
    set(transactions) {
        localStorage.setItem("family.finances:transactions", JSON.stringify(transactions))
    }
}

const Transaction = {
    // pegar tudo storage
    all: Storage.get(),

    add(transaction) {
        //inseri uma nova conta
        Transaction.all.push(transaction)

        //reinicia a aplicação
        App.reload()
    },

    remove(index) {
        // remove a conta 
        Transaction.all.splice(index, 1)

        App.reload();
    }, 
    
    incomes() {
        // definindo a variável
        let income = 0;
        
        // Se cada cada conta o valor for maior que zero irei somar as entradas
        Transaction.all.forEach(transaction => {
            if(transaction.amount > 0){
                income += transaction.amount;
            }
        })
        // retorna a variável
        return income;
    },

    expenses() {
        // definindo a variável
        let expense = 0;

        // Se cada cada conta o valor for menor que zero irei somar as saídas
        Transaction.all.forEach(transaction => {
            if(transaction.amount < 0){
                expense += transaction.amount;
            }
        })
        // retorna a variável
        return expense;
    },

    total(){
        // retorna o valor da function income somada com a function expense
        return Transaction.incomes() + Transaction.expenses();
    }
}

const DOM = {
    // definindo o container das Contas
    transactionsContainer: document.querySelector('#data-table tbody'),

    // adiciona uma conta dentro da tabela
    addTransaction(transaction, index) {
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        tr.dataset.index = index;

        DOM.transactionsContainer.appendChild(tr);
    },

    innerHTMLTransaction(transaction, index) {
        // se o valor da conta for maior que zero irá adicionar uma classe diferente onde contém cores diferentes nessas classes
        const CSSclass = transaction.amount  > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        // estrutura html da tabela
        const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img class="checked" onclick="Transaction.remove(${index})" src="./icons/minus.svg" alt="Remover transação">
        </td>
        `

        return html
    },

    // atualiza a balança(cards: entrada, saída e total)
    updateBalance() {
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())

        document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses())

        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total())        
    },

    //limpar as contas
    clearTransactions() {
        DOM.transactionsContainer.innerHTML = "";
    }
}

const Utils = {
    // Arredonda o valor da conta 
    formatAmount(value) {
        value = value * 100;

        return Math.round(value);
    },

    // Formatar a Data de vencimento da conta
    formatDate(date) {
        const splittedDate = date.split('-');

        // retorna a data no formato em que usamos dd/mm/aaaa, sendo elas no formato americano yyyy/mm/dd, retornando a posição de cada um deles
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

    // Formata o valor da conta para o padrão brasileiro
    formatCurrency(value) {
        // verifica se o valor é maior ou meno que zero caso menor que sero coloca o sinal de menos na frente
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        // retorna o sinal + valor da conta
       return signal + value
    }

}

const Form = {
    // declarando as informações que tem dentro do formulário
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    // pegando os valores dos inputs
    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    // validando os campos 
    validateFields() {
        const { description, amount, date } = Form.getValues()
        
        // verifica se os campos estão vazios, caso estejam retornam uma mensagem de erro
        if( description.trim() === "" || 
            amount.trim() === "" || 
            date.trim() === "" ) {
                throw new Error("Por favor, preencha todos os campos")
        }
    },

    // Formata os valores que estão nos campos
    formatValues() {
        let { description, amount, date } = Form.getValues()
        
        amount = Utils.formatAmount(amount)

        date = Utils.formatDate(date)

        return {
            description,
            amount,
            date
        }
    },

    // limpa os campos do formulário
    clearFields() {
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    // aqui ocorre o envio das informações do formulário, assim é chamado a função add para adicionar as informações da conta na tabela
    submit(event) {
        event.preventDefault()

        try {
            Form.validateFields()
            const transaction = Form.formatValues()
            Transaction.add(transaction)
            Form.clearFields()
            Modal.Close()
        } catch (error) {
            alert(error.message)
        }
    }

}

const App = {
    // da o inicio da aplicação, e chama os métodos de salvamento das contas e atualização dos balanços
    init() {
        Transaction.all.forEach(DOM.addTransaction)
        
        DOM.updateBalance()

        Storage.set(Transaction.all)
    },

    // reinicialização do app, limpando as transações ou contas
    reload() {
        DOM.clearTransactions()
        App.init()
    },
}

// inicializa a aplicação
App.init()