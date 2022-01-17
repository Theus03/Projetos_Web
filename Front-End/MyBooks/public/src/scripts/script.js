const Modal = {
    modalSucessOpen() {
        document.querySelector('.modal-overlay')
            .classList.add('active')
    },
    modalSucessClose() {
            document.querySelector('.modal-overlay')
        .classList.remove('active')
    }
}

const Back = {
    back() {
        window.history.back();
    }
}

const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("MyBooks: books")) || []
    },
    
    set(books) {
        localStorage.setItem("MyBooks: books", JSON.stringify(books))
    }
}

const Book = {
    all: Storage.get(),
    
    add(book) {
        
        Book.all.push(book)
        
        App.reload()
    },
    
    remove(index) {
        Book.all.splice(index, 1)
        
        App.reload()
    },
    
    total() {
        let totalBook = 0;
        
        Book.all.forEach(() => {
            totalBook++ 
        });
        
        return totalBook;
    }
}
// validando se tem livros na tabela
if(Book.all.length > 0){
    document.querySelector('.text-no-book').classList.remove('add');
}

const DOM = {
    // definindo o container dos livros
    booksContainer: document.querySelector('#data-table tbody'),
    
    
    // Adiciona uma cidade dentro da tabela
    addBook(book, index){
        // criar um elemento tr para que possa ser adicionado no html
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLBook(book, index)
        tr.dataset.index = index;
        
        DOM.booksContainer.appendChild(tr);
    },
    
    innerHTMLBook(book, index) {
        

        // estrutura html da tabela
        const html = `
        <tr>
        <td class="name_book">${book.name_book}</td>
        <td class="name_genre">${book.name_genre}</td>
        <td class="name_author">${book.name_author}</td>
            <td><img class="icon-delete" src="./public/src/icons/delete.svg" title="Excluir" alt="delete" onclick="Book.remove(${index}) "></td>
            </tr>
            ` 
            
            return html
        },
        
        updateTotal() {
            // atualiza o total de livros
            document.querySelector('#number-result').innerHTML = Book.total();
        },
        
        clearBooks() {
            DOM.booksContainer.innerHTML = "";
        }
    }
    
    const Form = {
        // declarando as informações que tem dentro do formulário
        name_book: document.querySelector('input#name_book'),
        name_genre: document.querySelector('input#name_genre'),
        name_author: document.querySelector('input#name_author'),
        
        // pegando os valores das caixas de input
        getValues() {
            return {
                name_book: Form.name_book.value,
                name_genre: Form.name_genre.value,
                name_author: Form.name_author.value
            }
        },
        
        // validando os campos
        validateFields() {
            const { name_book } = Form.getValues()
            
            // verifica se os campos estão vazios, caso estejam retornam uma mensagem de erro
            if(name_book.trim() === ""){
                throw new Error("Por favor, preencha o campo nome, é obrigatório.")
            }
        },
        
        //Formata os valores que estão nos campos
        formatValues() {
            let { name_book, name_genre, name_author } = Form.getValues()
            
            return {
                name_book,
                name_genre,
                name_author
            }
        },
        
        // limpar campos do formulário
        clearFields() {
            Form.name_book.value = ""
            Form.name_genre.value = ""
            Form.name_author.value = ""
        },
        
        // aqui ocorre o envio das informações do formulário, assim é chamado a função add para adicionar as informações dos livros na tabela
        submit(event) {
            event.preventDefault()
            
            try {
                Form.validateFields()
                const book = Form.formatValues()
                Book.add(book)
                Form.clearFields()
                Modal.modalSucessOpen()
                document.querySelector('input').addEventListener('focus', () => {
                    Modal.modalSucessClose()
                })
            } catch (error) {
                alert(error.message)
        }
    }
}

const App = {
    init() {
        Book.all.forEach(DOM.addBook)
        
        DOM.updateTotal()
        
        Storage.set(Book.all)
    },
    
    reload() {
        DOM.clearBooks()
        App.init()
    }
}

App.init()
