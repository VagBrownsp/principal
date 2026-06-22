document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("formFicha");

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const dataNascimento = document.getElementById("dataNascimento").value;
        const celular = document.getElementById("celular").value.trim();

        const mensagem = `
🎁 *LISTA PARA SORTEIO - VALE FINANCEIRA*

👤 Nome: ${nome}

📅 Data de Nascimento: ${dataNascimento}

📱 Celular: ${celular}

Obrigado por participar!
`;

        window.open(
            `https://wa.me/5512997479192?text=Teste?text=${encodeURIComponent(mensagem)}`,
            "_blank"
        );

    });

});






