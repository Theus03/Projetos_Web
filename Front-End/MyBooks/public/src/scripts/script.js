const Modal = {
    modalSucessOpen() {
        document.querySelector('.modal-overlay')
            .classList.add('active');
    },
    modalSucessClose() {
        setTimeout((function(){
            document.querySelector('.modal-overlay')
                .classList.remove('active')
        }, 1000))
    }
}

const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("mybooks:books")) || []
    },

    set(books) {
        localStorage.setItem("mybooks:books", JSON.stringify(books))
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

const DOM = {
    bookContainer: document.querySelector('#data-table tbody'),

    addBook(book, index) {
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLBook(book, index)
        tr.dataset.index = index;

        DOM.bookContainer.appendChild(tr);
    },

    innerHTMLBook(book, index) {
        const html = `
            <tr>
                <td class="name_book">${book.name_book}</td>
                <td class="name_genre">${book.name_genre}</td>
                <td class="name_author">${book.name_author}</td>
                <td><img src="../icons/delete.svg" alt="Delete" title="Excluir" class="icon-delete" onclick = "Book.remove(${index})"></td>
            </tr>
        `
        return html
    },

    updateTotal() {
        document.querySelector('.number-result').innerHTML = Book.total();
    },

    clearBooks() {
        DOM.bookContainer.innerHTML = "";
    }
}

const Form = {
    name_book: document.querySelector('input#name_book'),
    name_genre: document.querySelector('input#name_genre'),
    name_author: document.querySelector('input#name_author'),

    getValues() {
        return {
            name_book: Form.name_book.value,
            name_genre: Form.name_genre.value,
            name_author: Form.name_author.value
        }
    },

    validateFields() {
        const { name_book, name_genre, name_author } = Form.getValues()

        if(name_book.trim() === "" || name_genre.trim() === "" || name_author.trim() === "" ){
            throw new Error("Por favor, o campo nome do livro é obrigatório.")
        }
    },

    formatValues() {
        let { name_book, name_genre, name_author } = Form.getValues()

        return {
            name_book,
            name_genre,
            name_author
        }
    },

    clearFields() {
        Form.name_book.value = ""
        Form.name_genre.value = ""
        Form.name_author.value = ""
    },

    submit(event) {
        event.preventDefault()

        try {
            Form.validateFields()
            const book = Form.formatValues()
            Book.add(book)
            Form.clearFields()
        } catch (error) {
            alert(error.Message)
        }
    }
}

const App = {
    init() {
        Book.all.forEach(DOM.add)

        DOM.updateTotal()

        Storage.set(Book.all)
    },

    reload() {
        DOM.clearBooks()
        App.init()
    }
}

App.init()