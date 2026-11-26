const inputTech = document.querySelector(".search__input");
const inputType = document.querySelector(".search__select");

document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // FUNÇÃO DE COMUNICAÇÃO COM O BACKEND (FLASK)
    // ==========================================
    async function atualizarStatusUsuario(cpf, novoStatus) {
        try {
            const response = await fetch("/usuarios/api_alterar_status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                // Agora envia 'Ativo' ou 'Inativo' como string
                body: JSON.stringify({ cpf: cpf, status: novoStatus })
            });

            if (response.ok) {
                window.location.reload();
            } else {
                const erro = await response.json();
                alert(erro.mensagem || "Erro ao atualizar o status do usuário.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro de conexão ao tentar atualizar o usuário.");
        }
    }

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
    const modalInativar = document.getElementById("modalInativarUser");
    const overlayInativar = modalInativar ? modalInativar.querySelector(".modal__overlay") : null;
    const closeBtnInativar = modalInativar ? modalInativar.querySelector(".modal__close") : null;
    const cancelBtnInativar = document.getElementById("btnCancelarInativar");
    const confirmBtnInativar = document.getElementById("btnConfirmarInativar");
    const nomeUsuarioSpan = document.getElementById("nomeUsuarioInativar");
    const botoesInativar = document.querySelectorAll(".btn-inativar");

    let cpfSelecionadoParaInativar = null;

    const abrirModalInativar = (cpf, nome) => {
        cpfSelecionadoParaInativar = cpf;
        if (nomeUsuarioSpan) {
            nomeUsuarioSpan.textContent = nome;
        }
        if (modalInativar) {
            modalInativar.classList.add("modal--active");
        }
    };

    const fecharModalInativar = () => {
        cpfSelecionadoParaInativar = null;
        if (modalInativar) {
            modalInativar.classList.remove("modal--active");
        }
    };

    botoesInativar.forEach(button => {
        button.addEventListener("click", () => {
            const cpf = button.dataset.cpf;
            const nome = button.dataset.nome;
            abrirModalInativar(cpf, nome);
        });
    });

    if (confirmBtnInativar) {
        confirmBtnInativar.addEventListener("click", () => {
            if (cpfSelecionadoParaInativar) {
                // ALTERADO: envia 'Inativo' no lugar de 0
                atualizarStatusUsuario(cpfSelecionadoParaInativar, "Inativo");
            }
        });
    }

    if (closeBtnInativar) closeBtnInativar.addEventListener("click", fecharModalInativar);
    if (cancelBtnInativar) cancelBtnInativar.addEventListener("click", fecharModalInativar);
    if (overlayInativar) overlayInativar.addEventListener("click", fecharModalInativar);

    // ==========================================
    // 3. ATIVAÇÃO / APROVAÇÃO DE CADASTRO
    // ==========================================
    const botoesAtivar = document.querySelectorAll(".btn-ativar");

    botoesAtivar.forEach(button => {
        button.addEventListener("click", () => {
            const cpf = button.dataset.cpf;
            // ALTERADO: envia 'Ativo' no lugar de 1 (serve tanto para 'Pendente' quanto para 'Inativo')
            atualizarStatusUsuario(cpf, "Ativo");
        });
    });

    // ==========================================
    // 4. ACESSIBILIDADE GLOBAL (TECLA ESC)
    // ==========================================
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            if (modalEdit && modalEdit.classList.contains("user-edit--active")) {
                closeModalEdit();
            }
            if (modalInativar && modalInativar.classList.contains("modal--active")) {
                fecharModalInativar();
            }
        }
    });

    // ==========================================
    // 5. FILTROS DE BUSCA
    // ==========================================
    function aplicarFiltros() {
        const cardsUsers = document.querySelectorAll('.user-card');
        const termoBusca = (inputTech?.value || '').trim().toLowerCase();
        const statusFiltro = (inputType?.value || '').trim().toLowerCase();
        let visiveis = 0;

        cardsUsers.forEach(card => {
            const nomeCard = (card.getAttribute('data-nome') || '').toLowerCase();
            // Caso o card tenha data-status="{{ usuario.status_usuario }}", o select também filtrará
            const statusCard = (card.getAttribute('data-status') || '').toLowerCase();

            const bateNome = !termoBusca || nomeCard.includes(termoBusca);
            const bateStatus = !statusFiltro || statusFiltro === 'todos' || statusCard === statusFiltro;

            if (bateNome && bateStatus) {
                card.style.display = '';
                visiveis++;
            } else {
                card.style.display = 'none';
            }
        });

        const msgVazio = document.getElementById('sem-resultados');
        const flash = document.querySelector('.container-flash');

        if (msgVazio) {
            if (flash) {
                msgVazio.style.display = 'none';
            } else {
                msgVazio.style.display = (visiveis === 0) ? 'flex' : 'none';
            }
        }
    }

    if (inputTech) {
        inputTech.addEventListener('input', aplicarFiltros);
    }
    if (inputType) {
        inputType.addEventListener('change', aplicarFiltros);
    }
});