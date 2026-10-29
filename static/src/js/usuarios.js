document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. MODAL DE EDIÇÃO DE USUÁRIO
    // ==========================================
    const modalEdit = document.getElementById("modalEditUser");
    const closeBtnEdit = modalEdit ? modalEdit.querySelector(".user-edit__close-button") : null;
    const overlayEdit = modalEdit ? modalEdit.querySelector(".user-edit__overlay") : null;
    const editButtons = document.querySelectorAll(".user-card__actions .button--secondary");

    const openModalEdit = () => {
        if (modalEdit) modalEdit.classList.add("user-edit--active");
    };

    const closeModalEdit = () => {
        if (modalEdit) modalEdit.classList.remove("user-edit--active");
    };

    editButtons.forEach(button => {
        button.addEventListener("click", openModalEdit);
    });

    if (closeBtnEdit) closeBtnEdit.addEventListener("click", closeModalEdit);
    if (overlayEdit) overlayEdit.addEventListener("click", closeModalEdit);


    // ==========================================
    // 2. MODAL DE INATIVAÇÃO DE USUÁRIO
    // ==========================================
    // Certifique-se de que o modal no HTML possua o id "modalInativarUser"
    const modalInativar = document.getElementById("modalInativarUser");
    const overlayInativar = modalInativar ? modalInativar.querySelector(".modal__overlay") : null;
    const closeBtnInativar = modalInativar ? modalInativar.querySelector(".modal__close") : null;
    const cancelBtnInativar = modalInativar ? modalInativar.querySelector(".button--cancelar") : null;
    const botoesInativar = document.querySelectorAll(".user-card__actions .button--danger");

    const abrirModalInativar = () => {
        if (modalInativar) modalInativar.classList.add("modal--active");
    };

    const fecharModalInativar = () => {
        if (modalInativar) modalInativar.classList.remove("modal--active");
    };

    botoesInativar.forEach(button => {
        button.addEventListener("click", abrirModalInativar);
    });

    if (closeBtnInativar) closeBtnInativar.addEventListener("click", fecharModalInativar);
    if (cancelBtnInativar) cancelBtnInativar.addEventListener("click", fecharModalInativar);
    if (overlayInativar) overlayInativar.addEventListener("click", fecharModalInativar);


    // ==========================================
    // 3. ACESSIBILIDADE GLOBAL (TECLA ESC)
    // ==========================================
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            // Fecha o modal de edição se estiver aberto
            if (modalEdit && modalEdit.classList.contains("user-edit--active")) {
                closeModalEdit();
            }
            // Fecha o modal de inativação se estiver aberto
            if (modalInativar && modalInativar.classList.contains("modal--active")) {
                fecharModalInativar();
            }
        }
    });
});