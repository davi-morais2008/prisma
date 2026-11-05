document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");

  // Elementos do Modal
  const modalOverlay = document.getElementById("modal-overlay");
  const eventTitleInput = document.getElementById("event-title");
  const eventStatusSelect = document.getElementById("event-status");
  const btnSalvar = document.getElementById("btn-salvar");
  const btnCancelar = document.getElementById("btn-cancelar");

  // Elementos do Modal de Exclusão
  const modalDeleteOverlay = document.getElementById("modal-delete-overlay");
  const deleteEventTitle = document.getElementById("delete-event-title");
  const btnConfirmarDelete = document.getElementById("btn-confirmar-delete");
  const btnCancelarDelete = document.getElementById("btn-cancelar-delete");

  let eventToDelete = null; // Variável para armazenar o evento que será excluído

  let selectedDateInfo = null;

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    locale: "pt-br",
    selectable: true,
    editable: true,
    height: "100%",

    headerToolbar: {
    left: 'prev,today,next',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },

    buttonText: {
      today: "Hoje",
      month: "Mês",
      week: "Semana",
      day: "Dia"
    },

    events: [
      { title: "Aula de programação", start: "2026-10-08", className: "evento-primary" },
      { title: "Entrega do projeto", start: "2026-10-15", className: "evento-danger" },
      { title: "Reunião", start: "2026-10-20T14:00:00", className: "evento-warning" },
      { title: "Prova", start: "2026-10-23", className: "evento-danger" },
      { title: "Apresentação", start: "2026-10-28", className: "evento-success" }
    ],

    // Clique num dia abre o modal
    dateClick: function (info) {
      selectedDateInfo = info;
      eventTitleInput.value = "";
      eventTitleInput.style.borderColor = "var(--color-bg-light)";
      modalOverlay.classList.remove("hidden");
      eventTitleInput.focus();
    },

    eventClick: function (info) {
      eventToDelete = info.event; // Salva o evento clicado
      deleteEventTitle.textContent = info.event.title; // Coloca o nome no modal
      modalDeleteOverlay.classList.remove("hidden"); // Exibe o modal
    }
  });

  calendar.render();

  // Funções de Controlo do Modal
  function fecharModal() {
    modalOverlay.classList.add("hidden");
    selectedDateInfo = null;
  }

  function salvarEvento() {
    const titulo = eventTitleInput.value.trim();
    const statusClass = eventStatusSelect.value;

    if (titulo && selectedDateInfo) {
      calendar.addEvent({
        title: titulo,
        start: selectedDateInfo.dateStr,
        className: statusClass
      });
      fecharModal();
    } else {
      eventTitleInput.style.borderColor = "var(--color-status-danger)";
    }
  }

  // Event Listeners
  btnSalvar.addEventListener("click", salvarEvento);
  btnCancelar.addEventListener("click", fecharModal);

  // Fechar ao clicar no fundo fosco
  modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) {
      fecharModal();
    }
  });

  // Salvar com a tecla Enter
  eventTitleInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      salvarEvento();
    }
  });
});

// Funções de Controlo do Modal de Exclusão
  function fecharModalDelete() {
    modalDeleteOverlay.classList.add("hidden");
    eventToDelete = null;
  }

  function confirmarExclusao() {
    if (eventToDelete) {
      eventToDelete.remove(); // Remove o evento do calendário
      fecharModalDelete();
    }
  }

  // Event Listeners do Modal de Exclusão
  btnConfirmarDelete.addEventListener("click", confirmarExclusao);
  btnCancelarDelete.addEventListener("click", fecharModalDelete);

  // Fechar ao clicar no fundo fosco
  modalDeleteOverlay.addEventListener("click", function (e) {
    if (e.target === modalDeleteOverlay) {
      fecharModalDelete();
    }
  });