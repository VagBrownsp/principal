// =========================
// MÁSCARA DE CELULAR (BR)
// =========================
const celularInput = document.getElementById("celular");

celularInput.addEventListener("input", (e) => {
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


// =========================
// ENVIO WHATSAPP
// =========================
function enviarWhatsApp() {
  const nome = document.getElementById("nome").value;
  const nascimento = document.getElementById("nascimento").value;
  const celular = document.getElementById("celular").value;

  if (!nome || !nascimento || !celular) {
    alert("Preencha todos os campos!");
    return;
  }

  // remove máscara
  const numeroLimpo = celular.replace(/\D/g, "");

  // seu número de destino (troque aqui)
  const numeroDestino = "5512997479192";

  const mensagem =
`Olá! Segue cadastro:

Nome: ${nome}
Nascimento: ${nascimento}
Celular: ${celular}`;

  const url = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank");
}
