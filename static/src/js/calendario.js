document.addEventListener("DOMContentLoaded", function () {

    // Pega a div onde o calendário será criado
    const calendarEl = document.getElementById("calendar");

    // Cria o calendário
    const calendar = new FullCalendar.Calendar(calendarEl, {

        // Visualização inicial
        initialView: "dayGridMonth",

        // Português
        locale: "pt-br",

        // Permite clicar e selecionar dias
        selectable: true,

        // Permite arrastar eventos
        editable: true,

        // Cabeçalho
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
        },

        // Texto dos botões
        buttonText: {
            today: "Hoje",
            month: "Mês",
            week: "Semana",
            day: "Dia"
        },

        // Eventos
        events: [

            {
                title: "Aula de programação",
                start: "2026-10-08"
            },

            {
                title: "Entrega do projeto",
                start: "2026-10-15"
            },

            {
                title: "Reunião",
                start: "2026-10-20T14:00:00"
            },

            {
                title: "Prova",
                start: "2026-10-23"
            },

            {
                title: "Apresentação",
                start: "2026-10-28"
            }

        ],

        // Quando clicar em um dia
        dateClick: function (info) {

            const titulo = prompt(
                "Digite o nome do evento:"
            );

            if (titulo) {

                calendar.addEvent({
                    title: titulo,
                    start: info.dateStr
                });

            }

        },

        // Quando clicar em um evento
        eventClick: function (info) {

            const remover = confirm(
                "Deseja remover o evento '" +
                info.event.title +
                "'?"
            );

            if (remover) {
                info.event.remove();
            }

        }

    });

    // Mostra o calendário
    calendar.render();

});