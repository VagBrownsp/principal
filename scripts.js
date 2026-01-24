// ELEMENTOS
const formFicha = document.getElementById("formFicha");
const nome = document.getElementById("nome");
const cpf = document.getElementById("cpf");
const telefone = document.getElementById("telefone");
const cep = document.getElementById("cep");
const endereco = document.getElementById("endereco");
const numeroCasa = document.getElementById("numeroCasa");
const complemento = document.getElementById("complemento");
const profissao = document.getElementById("profissao");
const empresa = document.getElementById("empresa");
const renda = document.getElementById("renda");
const refNome = document.getElementById("refNome");
const refGrau = document.getElementById("refGrau");
const refTelefone = document.getElementById("refTelefone");
const entrada = document.getElementById("entrada");
const valorEntrada = document.getElementById("valorEntrada");
const valorEntradaDiv = document.getElementById("valorEntradaDiv");

// =====================
// MÁSCARAS
// =====================
cpf.addEventListener("input", () => {
    cpf.value = cpf.value.replace(/\D/g,"")
        .replace(/(\d{3})(\d)/,"$1.$2")
        .replace(/(\d{3})(\d)/,"$1.$2")
        .replace(/(\d{3})(\d{1,2})$/,"$1-$2");
});

telefone.addEventListener("input", () => {
    telefone.value = telefone.value.replace(/\D/g,"")
        .replace(/(\d{2})(\d)/,"($1) $2")
        .replace(/(\d{5})(\d)/,"$1-$2");
});

refTelefone.addEventListener("input", () => {
    refTelefone.value = refTelefone.value.replace(/\D/g,"")
        .replace(/(\d{2})(\d)/,"($1) $2")
        .replace(/(\d{5})(\d)/,"$1-$2");
});

cep.addEventListener("input", () => {
    cep.value = cep.value.replace(/\D/g,"")
        .replace(/(\d{5})(\d)/,"$1-$2");
});

// =====================
// CEP
// =====================
cep.addEventListener("blur", () => {
    const v = cep.value.replace(/\D/g,'');
    if (v.length !== 8) return;

    fetch(`https://viacep.com.br/ws/${v}/json/`)
        .then(r => r.json())
        .then(d => {
            if (!d.erro) {
                endereco.value = `${d.logradouro}, ${d.bairro}, ${d.localidade} - ${d.uf}`;
            }
        });
});

// =====================
// CPF VALIDAÇÃO
// =====================
function cpfValido(cpf) {
    cpf = cpf.replace(/\D/g,'');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let s = 0;
    for (let i = 0; i < 9; i++) s += cpf[i] * (10 - i);
    let r = (s * 10) % 11;
    if (r === 10) r = 0;
    if (r != cpf[9]) return false;

    s = 0;
    for (let i = 0; i < 10; i++) s += cpf[i] * (11 - i);
    r = (s * 10) % 11;
    if (r === 10) r = 0;

    return r == cpf[10];
}

// =====================
// ENTRADA
// =====================
entrada.addEventListener("change", () => {
    const temEntrada = entrada.value === "Sim";
    valorEntradaDiv.classList.toggle("hidden", !temEntrada);
    valorEntrada.required = temEntrada;
});

// =====================
// FORMATA BRL
// =====================
valorEntrada.addEventListener("input", () => {
    let v = valorEntrada.value.replace(/\D/g,"");
    v = (v / 100).toFixed(2).replace(".",",").replace(/\B(?=(\d{3})+(?!\d))/g,".");
    valorEntrada.value = "R$ " + v;
});

// =====================
// SUBMIT
// =====================
formFicha.addEventListener("submit", e => {
    e.preventDefault();

    if (!cpfValido(cpf.value)) {
        alert("CPF inválido");
        return;
    }

    if (!formFicha.checkValidity()) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    const msg = `
*FICHA ANÁLISE DE CRÉDITO*
${nome.value}
CPF: ${cpf.value}
Telefone: ${telefone.value}
Endereço: ${endereco.value}, ${numeroCasa.value} ${complemento.value}
Profissão: ${profissao.value} | Empresa: ${empresa.value}
Renda: ${renda.value}
Referência: ${refNome.value} (${refGrau.value}) ${refTelefone.value}
Entrada: ${entrada.value}
Valor: ${valorEntrada.value || "Não informado"}
`;

    window.open(
        `https://wa.me/5512991791629?text=${encodeURIComponent(msg)}`,
        "_blank"
    );
});
