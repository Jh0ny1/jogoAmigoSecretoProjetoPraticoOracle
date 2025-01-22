let listaAmigos = [];

function adicionarAmigo() {
    const input = document.getElementById("amigo");
    const nome = input.value.trim();
    const lista = document.getElementById("listaAmigos");

    if (nome === "") {
        alert("Digite um nome válido!");
        return;
    }

    if (listaAmigos.includes(nome)) {
        alert("Este nome já foi adicionado!");
        return;
    }

    listaAmigos.push(nome);
    
    const item = document.createElement("li");
    item.textContent = nome;
    lista.appendChild(item);

    input.value = "";
    input.focus();
}

function sortearAmigo() {
    if (listaAmigos.length < 2) {
        alert("Adicione pelo menos dois amigos para realizar o sorteio!");
        return;
    }
    
    let sorteio = [...listaAmigos];
    let resultado = {};
    let tentativa = 0;
    let maxTentativas = 1000;
    let sucesso = false;

    while (!sucesso && tentativa < maxTentativas) {
        sucesso = true;
        let copiaLista = [...listaAmigos];
        let copiaSorteio = [...sorteio];
        resultado = {};
        
        for (let amigo of copiaLista) {
            let possiveis = copiaSorteio.filter(nome => nome !== amigo);
            
            if (possiveis.length === 0) {
                sucesso = false;
                break;
            }
            
            let sorteado = possiveis[Math.floor(Math.random() * possiveis.length)];
            resultado[amigo] = sorteado;
            copiaSorteio = copiaSorteio.filter(nome => nome !== sorteado);
        }
        tentativa++;
    }
    
    if (sucesso) {
        exibirResultado(resultado);
    } else {
        alert("Não foi possível realizar o sorteio. Tente novamente.");
    }
}

function exibirResultado(resultado) {
    const listaResultado = document.getElementById("resultado");
    listaResultado.innerHTML = "";
    
    for (const [amigo, sorteado] of Object.entries(resultado)) {
        const item = document.createElement("li");
        item.textContent = `${amigo} tirou ${sorteado}`;
        listaResultado.appendChild(item);
    }
}

//Chat gpt was here