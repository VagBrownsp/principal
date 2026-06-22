document.getElementById("formFicha").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const dataNascimento = document.getElementById("dataNascimento").value;
  

  const mensagem = `🎁 LISTA PARA SORTEIO - VALE FINANCEIRA

Nome: ${nome}
Data de Nascimento: ${dataNascimento}
Celular: ${celularInput}`;

  const url =
    "https://api.whatsapp.com/send?phone=5512997479192&text=" +
    encodeURIComponent(mensagem);

  window.location.href = url;
});


// MÁSCARA DO CELULAR (fora do submit)

const celularInput = document.getElementById("celular").value;
document.getElementById("celular").addEventListener("input", (e) => {
  let value = e.target.value;

  value = value.replace(/\D/g, "");
  value = value.slice(0, 11);

  if (value.length > 6) {
    value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
  } else if (value.length > 2) {
    value = value.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
  } else if (value.length > 0) {
    value = value.replace(/^(\d*)/, "($1");
  }

  e.target.value = value;
});
