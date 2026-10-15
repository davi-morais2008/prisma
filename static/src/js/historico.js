const maintBTN = document.querySelectorAll('.btn_show');
const closeBTN = document.querySelectorAll('.btn_close');
const modalShow = document.getElementById('modal_show')

maintBTN.forEach((btn) => {
    btn.addEventListener('click', () => {
        modalShow.classList.toggle('active');
    });
})

closeBTN.forEach((btn) => {
    btn.addEventListener('click', () => {
        modalShow.classList.toggle('active');
    });
})


