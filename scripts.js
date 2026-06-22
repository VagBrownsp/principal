document.getElementById("formFicha").addEventListener("submit", function(e) {

    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const dataNascimento = document.getElementById("dataNascimento").value;
    const celular = document.getElementById("celular").value;

    const mensagem =
`🎁 LISTA PARA SORTEIO - VALE FINANCEIRA

Nome: ${nome}
Data de Nascimento: ${dataNascimento}
Celular: ${celular}`;

    const url =
        "https://api.whatsapp.com/send?phone=5512997479192&text=" +
        encodeURIComponent(mensagem);

    window.location.href = url;

});
