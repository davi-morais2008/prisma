document.addEventListener("DOMContentLoaded", () => {
    // 1. Mapeamento de Elementos do DOM
    const modal = document.getElementById("modalEditUser");
    const closeBtn = modal.querySelector(".user-edit__close-button");
    const overlay = modal.querySelector(".user-edit__overlay");
    
    // Seleciona todos os botões de "Editar" (botões secundários nos cards)
    const editButtons = document.querySelectorAll(".profile-card__actions .button--secondary");

    // 2. Funções de Controle
    const openModal = () => {
        modal.classList.add("user-edit--active");
    };

    const closeModal = () => {
        modal.classList.remove("user-edit--active");
    };

    // 3. Atribuição de Eventos (Listeners)
    
    // Abrir o modal ao clicar em qualquer botão de "Editar"
    editButtons.forEach(button => {
        button.addEventListener("click", openModal);
    });

    // Fechar o modal ao clicar no botão de 'X'
    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    // Fechar o modal ao clicar fora da caixa (no fundo desfocado)
    if (overlay) {
        overlay.addEventListener("click", closeModal);
    }

    // Acessibilidade: Fechar o modal ao pressionar a tecla "Escape" (ESC)
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("user-edit--active")) {
            closeModal();
        }
    });
});
