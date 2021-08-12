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
    }
}