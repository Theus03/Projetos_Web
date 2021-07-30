// Declarar Variável
let modal_overlay = document.querySelector(".modal-overlay");
let contNoInit = 0, contInit = 0, contReset = 0;

// Criar Função para o Modal 
const Modal = {
    openModal() {
        modal_overlay.classList.add("active");
    }, 
    closeModal() {
        modal_overlay.classList.remove("active");
    }
}  
// Funções para guardar informações dos jogos no browser

const Storage = {
    // Pegar informações dos jogos
    get() {
        return JSON.parse(localStorage.getItem("gametime:games")) || [];
    },
    // Mostrar informações dos jogos
    set(games) {
        localStorage.setItem("gametime:games", JSON.stringify(games))
    }
}

const Game = {
    // pegar tudo storage
    all: Storage.get(),

    add(game) {
        // inserir um novo jogo
        Game.all.push(game)

        // reinicia a aplicação
        App.reload();
    },

    noInitGame() {
        let noInitGame = 0;

        Game.all.forEach(() => {
            noInitGame++;
        })

        contNoInit++;
        resultNoInit = noInitGame + contNoInit;
        document.getElementById('numberNoInit').innerHTML = resultNoInit;
        
        return resultNoInit;
    },
    
    initGame() {
        let initGame = 0;
        contInit++;
        resultInit = initGame + contInit;
        document.getElementById('numberInit').innerHTML = resultInit;
        return resultInit;
    },

    resetGame() {
        let resetGame = 0;
        contReset++;
        resultReset = resetGame + contReset;
        document.getElementById('numberReset').innerHTML = resultReset;
        
        return resultReset;
    }
}

const DOM = {
      // definindo o container das Contas
      gamesContainer: document.querySelector('#data-table tbody'),
      
        // adiciona um jogo dentro da tabela
        addGame(game) {
            const tr = document.createElement('tr');
            tr.innerHTML = DOM.innerHTMLGame(game)
            DOM.gamesContainer.appendChild(tr);
        },

        innerHTMLGame(game) {
            // // se o valor da conta for maior que zero irá adicionar uma classe diferente onde contém cores diferentes nessas classes
            // const CSSclass = transaction.amount  > 0 ? "income" : "expense"
    
            // const amount = Utils.formatCurrency(transaction.amount)
    
            // estrutura html da tabela
            const html = `
            <tr>
                <td><img class="img-game" src="${game.image}" alt=""></td>
                <td class="name">${game.name}</td>
                <td class="category">${game.category}</td>
                <td class="td-situation">
                    <input class="button-situation noInit" id="noInit" onclick="Game.noInitGame()" type="button" value="Não Iniciado">
                    <input class="button-situation " id="init" type="button" onclick="Game.initGame()"  value="Iniciado">
                    <input class="button-situation " id="reset" type="button" onclick="Game.resetGame()" value="Zerado">
                </td>
            </tr>
            `
    
            return html
        },

        //atualiza os cards(cards: não iniciado, iniciado e zerado)
        updateCards() {
            
            document.getElementById('numberNoInit').innerHTML = Game.noInitGame();
            
            document.getElementById('numberInit').innerHTML = Game.initGame();

            document.getElementById('numberReset').innerHTML = Game.resetGame();
        },

        //limpar as contas
        clearGames() {
            DOM.gamesContainer.innerHTML = "";
        }
}

const Form = {
    // declarando as informações que tem dentro do formulário
    image: document.querySelector('input#image'),
    name: document.querySelector('input#name'),
    category: document.querySelector('input#category'),

    // pegando os valores dos inputs
    getValues() {
        return {
            image: Form.image.value,
            name: Form.name.value,
            category: Form.category.value
        }
    },

    // validando os campos 
    validateFields() {
        const { image, name, category } = Form.getValues()
        
        // verifica se os campos estão vazios, caso estejam retornam uma mensagem de erro
        if( image.trim() === "" || name.trim() === "" || category.trim() === "" ) {
                throw new Error("Por favor, preencha os campos obrigatórios: nome e categoria.")
        }
    },

    // Formata os valores que estão nos campos
    formatValues() {
        let { image, name, category } = Form.getValues()

        return {
            image,
            name,
            category,
        }
    },


    // limpa os campos do formulário
    clearFields() {
        Form.image.value = ""
        Form.name.value = ""
        Form.category.value = ""
    },

    // aqui ocorre o envio das informações do formulário, assim é chamado a função add para adicionar as informações da conta na tabela
    submit(event) {
        event.preventDefault()

        try {
            Form.validateFields()
            const game = Form.formatValues()
            Game.add(game)
            Form.clearFields()
            Modal.closeModal()
        } catch (error) {
            alert(error.message)
        }
    }

}

const App = {
    // da o inicio da aplicação, e chama os métodos de salvamento dos jogos e atualização dos cards
    init() {
        Game.all.forEach(DOM.addGame)
        
        DOM.updateCards()

        Storage.set(Game.all)
    },

    // reinicialização do app, limpando os jogos
    reload() {
        DOM.clearGames();
        App.init()
    },
}

// inicializa a aplicação 

App.init()
