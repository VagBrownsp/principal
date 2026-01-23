function buscarCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length !== 8) return;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json())
        .then(data => {
            if (!data.erro) {
                endereco.value = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
            }
        });
}

function validarCPF() {
    let cpf = document.getElementById('cpf').value.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        alert("CPF inválido");
        cpf.value = "";
        return false;
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += cpf[i] * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    if (resto != cpf[9]) return alert("CPF inválido");

    soma = 0;
    for (let i = 0; i < 10; i++) soma += cpf[i] * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    if (resto != cpf[10]) return alert("CPF inválido");
}

function toggleEntrada() {
    const div = document.getElementById('valorEntradaDiv');
    const valor = document.getElementById('valorEntrada');
    if (entrada.value === "Sim") {
        div.classList.remove('hidden');
        valor.required = true;
    } else {
        div.classList.add('hidden');
        valor.required = false;
        valor.value = "";
    }
}

function formatarBRL(campo) {
    let v = campo.value.replace(/\D/g, "");
    v = (v / 100).toFixed(2).replace(".", ",");
    v = v.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    campo.value = "R$ " + v;
}

function enviarWhatsApp() {
    const msg = `
 *FICHA ANÁLISE DE CRÉDITO*

${nome.value}
 CPF: ${cpf.value}

 ${endereco.value}, Nº ${numeroCasa.value} ${complemento.value}

 ${telefone.value}
 ${email.value}

 ${profissao.value} | ${empresa.value}
 Renda: ${renda.value}

 Referência:
${refNome.value} - ${refGrau.value}
${refTelefone.value}

 Entrada: ${entrada.value}
 Valor: ${valorEntrada.value || 'Não informado'}
`;

    window.open(`https://wa.me/5512991791629?text=${encodeURIComponent(msg)}`, "_blank");
}