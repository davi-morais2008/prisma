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
                atualizarStatusUsuario(cpfSelecionadoParaInativar, 0);
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
            // Envia status 1 para ativar/aprovar o cadastro pendente
            atualizarStatusUsuario(cpf, 1);
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
});