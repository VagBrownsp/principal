// MÁSCARAS
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

// CEP
cep.addEventListener("blur", buscarCEP);
function buscarCEP() {
    const v = cep.value.replace(/\D/g,'');
    if (v.length !== 8) return;
    fetch(`https://viacep.com.br/ws/${v}/json/`)
    .then(r=>r.json())
    .then(d=>{
        if(!d.erro){
            endereco.value = `${d.logradouro}, ${d.bairro}, ${d.localidade} - ${d.uf}`;
        }
    });
}

// CPF VALIDAÇÃO
function cpfValido(cpf) {
    cpf = cpf.replace(/\D/g,'');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let s = 0;
    for(let i=0;i<9;i++) s+=cpf[i]*(10-i);
    let r=(s*10)%11; if(r==10) r=0;
    if(r!=cpf[9]) return false;
    s=0;
    for(let i=0;i<10;i++) s+=cpf[i]*(11-i);
    r=(s*10)%11; if(r==10) r=0;
    return r==cpf[10];
}

// ENTRADA
entrada.addEventListener("change",()=>{
    valorEntradaDiv.classList.toggle("hidden", entrada.value!=="Sim");
    valorEntrada.required = entrada.value==="Sim";
});

// FORMATA BRL
valorEntrada.addEventListener("input",()=>{
    let v = valorEntrada.value.replace(/\D/g,"");
    v = (v/100).toFixed(2).replace(".",",").replace(/\B(?=(\d{3})+(?!\d))/g,".");
    valorEntrada.value = "R$ "+v;
});

// SUBMIT BLOQUEADO SE INVÁLIDO
formFicha.addEventListener("submit", e=>{
    e.preventDefault();

    if (!cpfValido(cpf.value)) {
        alert("CPF inválido");
        return;
    }

    if (!formFicha.checkValidity()) {
        alert("Preencha todos os campos obrigatórios corretamente.");
        return;
    }

    const msg = `
*FICHA ANÁLISE DE CRÉDITO*
${nome.value}
CPF: ${cpf.value}
 ${telefone.value}
${endereco.value}, ${numeroCasa.value} ${complemento.value}
${profissao.value} | ${empresa.value}
Renda: ${renda.value}
Referência: ${refNome.value} (${refGrau.value}) ${refTelefone.value}
Entrada: ${entrada.value}
Valor: ${valorEntrada.value || "Não informado"}
`;

    window.open(`https://wa.me/5512991791629?text=${encodeURIComponent(msg)}`,"_blank");
});