const Modal = {
    modalAdd() {
        document.querySelector('.modal-overlay.add')
            .classList.add('active');
    },
    modalAddClose() {
        document.querySelector('.modal-overlay.add')
            .classList.remove('active');
    }
}