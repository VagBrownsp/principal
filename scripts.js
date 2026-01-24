document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("formFicha");
  const entrada = document.getElementById("entrada");
  const valorEntrada = document.getElementById("valorEntrada");
  const valorEntradaDiv = document.getElementById("valorEntradaDiv");

  const cepInput = document.getElementById("cep");
  const enderecoInput = document.getElementById("endereco");
  const bairroInput = document.getElementById("bairro");

  // =====================
  // MOSTRAR / ESCONDER VALOR ENTRADA
  // =====================
  entrada.addEventListener("change", () => {
    if (entrada.value === "Sim") {
      valorEntradaDiv.classList.remove("hidden");
      valorEntrada.required = true;
    } else {
      valorEntradaDiv.classList.add("hidden");
      valorEntrada.required = false;
      valorEntrada.value = "";
    }
  });

  // =====================
  // FORMATAR VALOR ENTRADA
  // =====================
  valorEntrada.addEventListener("input", () => {
    let v = valorEntrada.value.replace(/\D/g, "");
    v = (v / 100)
      .toFixed(2)
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    valorEntrada.value = "R$ " + v;
  });

  // =====================
  // MÁSCARA E BUSCA DE CEP
  // =====================
  cepInput.addEventListener("input", () => {
    let cep = cepInput.value.replace(/\D/g, "");

    if (cep.length > 8) cep = cep.slice(0, 8);

    cepInput.value = cep.replace(/^(\d{5})(\d{0,3})$/, "$1-$2");

    if (cep.length === 8) {
      buscarCEP(cep);
    }
  });

  function buscarCEP(cep) {
    enderecoInput.value = "Buscando endereço...";
    bairroInput.value = "";

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(res => res.json())
      .then(data => {
        if (data.erro) {
          alert("CEP não encontrado. Verifique e tente novamente.");
          limparEndereco();
          return;
        }

        enderecoInput.value = data.logradouro || "";
        bairroInput.value = data.bairro || "";
      })
      .catch(() => {
        alert("Erro ao buscar o CEP.");
        limparEndereco();
      });
  }

  function limparEndereco() {
    enderecoInput.value = "";
    bairroInput.value = "";
  }

  // =====================
  // VALIDA CPF
  // =====================
  function cpfValido(cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += cpf[i] * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    if (resto != cpf[9]) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += cpf[i] * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;

    return resto == cpf[10];
  }

  // =====================
  // ENVIO WHATSAPP
  // =====================
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const cpf = document.getElementById("cpf").value;

    if (!cpfValido(cpf)) {
      alert("CPF inválido");
      return;
    }

    if (!form.checkValidity()) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const mensagem = `
*FICHA ANÁLISE DE CRÉDITO*

*Dados Pessoais*
Nome: ${document.getElementById("nome").value}
CPF: ${cpf}
RG: ${document.getElementById("rg").value}
Data Expedição RG: ${document.getElementById("rgData").value}
Estado Civil: ${document.getElementById("estadoCivil").value}

*CNH*
Número: ${document.getElementById("cnh").value || "Não informado"}
Data Expedição: ${document.getElementById("cnhData").value || "Não informado"}

*Endereço*
CEP: ${cepInput.value}
Endereço: ${enderecoInput.value}
Bairro: ${bairroInput.value}
Número: ${document.getElementById("numeroCasa").value}
Complemento: ${document.getElementById("complemento").value || "—"}

*Contato*
Telefone: ${document.getElementById("telefone").value}
E-mail: ${document.getElementById("email").value}

*Profissional*
Profissão: ${document.getElementById("profissao").value}
Empresa: ${document.getElementById("empresa").value}
Renda Mensal: ${document.getElementById("renda").value}

*Referência*
Nome: ${document.getElementById("refNome").value}
Grau: ${document.getElementById("refGrau").value}
Telefone: ${document.getElementById("refTelefone").value}

*Entrada*
Possui entrada: ${entrada.value}
Valor: ${valorEntrada.value || "Não possui"}
`;

    window.open(
      "https://wa.me/5512991791629?text=" + encodeURIComponent(mensagem),
      "_blank"
    );
  });

});


