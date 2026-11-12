document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");

  // Elementos do Modal de Informações
  const modalOverlay = document.getElementById("modal-overlay");
  const modalTitulo = document.getElementById("modal-titulo");
  const modalTipo = document.getElementById("modal-tipo");
  const modalPeriodo = document.getElementById("modal-periodo");
  const modalDescricao = document.getElementById("modal-descricao");
  // No topo, junto com os outros elementos do modal:
  const modalStatus = document.getElementById("modal-status");
  const btnFechar = document.getElementById("btn-fechar");

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    locale: "pt-br",
    height: "100%",

    headerToolbar: {
      left: "prev,today,next",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay"
    },

    buttonText: {
      today: "Hoje",
      month: "Mês",
      week: "Semana",
      day: "Dia"
    },

    events: "/api/ordens-servico",

    // Clique na OS abre o modal com os detalhes
    eventClick: function (info) {
      const evento = info.event;
      const extras = evento.extendedProps;

      modalTitulo.textContent = evento.title;
      modalTipo.textContent = extras.tipo || "Não informado";
      modalDescricao.textContent = extras.descricao || "Sem descrição registrada.";

      const dataInicio = evento.start
        ? evento.start.toLocaleDateString("pt-BR", { timeZone: "UTC" })
        : "-";
      const dataFim = evento.end
        ? evento.end.toLocaleDateString("pt-BR", { timeZone: "UTC" })
        : dataInicio;

      modalPeriodo.textContent =
        dataInicio === dataFim ? dataInicio : `${dataInicio} até ${dataFim}`;
      modalStatus.textContent = extras.status || "Ativa";
      modalOverlay.classList.remove("hidden");
    }
  });

  calendar.render();

  // Fechar o modal
  function fecharModal() {
    modalOverlay.classList.add("hidden");
  }

  btnFechar.addEventListener("click", fecharModal);

  modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) {
      fecharModal();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modalOverlay.classList.contains("hidden")) {
      fecharModal();
    }
  });
});