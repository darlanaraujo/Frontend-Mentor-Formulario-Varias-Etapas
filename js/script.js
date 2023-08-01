const sidebarIndices = document.querySelectorAll('#sidebarIndice');
const telasContente = document.querySelectorAll('#telaContente');
const linhasForm = document.querySelectorAll('#linhaForm');
const getInputs = document.querySelectorAll('#getInput');
const btnNext = document.querySelector('#btnNext');
const btnBack = document.querySelector('#btnBack');

let indice = 0;
let janela = 0;

let nome, email, fone;

const inicio = (step, tela) => {
    indice = step;
    janela = tela;

    sidebarIndices.forEach((pos) => {
        pos.classList.remove('active');
    });

    telasContente.forEach((telas) => {
        telas.classList.remove('active');
    });

    if(janela == 0) {
        btnBack.classList.remove('active');
    } else {
        btnBack.classList.add('active');
    }

    sidebarIndices[step].classList.add('active');
    telasContente[tela].classList.add('active');
};
inicio(0, 0);

const validaEmail = (email) => {
    let regex = /\S+@\S+\.\S+/;
    return regex.test(email);
};

btnBack.addEventListener('click', () => {
    if(janela > 0) {
        janela--;
    }

    if(indice > 0) {
        indice--;
    }

    inicio(indice, janela);
});

btnNext.addEventListener('click', () => {

    nome = '';
    email = '';
    fone = '';

    if(janela == 0){
        
        linhasForm.forEach((linha) => {
            linha.classList.remove('erro');
        });

        getInputs.forEach((input, pos) => {
            
            // Verifica se a caixa está vazia;
            if(input.value == '') {
                linhasForm[pos].classList.add('erro');
            } else {
                if(pos == 0) {
                    nome = input.value;
                } else if(pos == 2) {
                    fone = input.value;
                }
            }

            // Verifica se o e-mail é valido;
            if(pos == 1) {
                
                if(!validaEmail(input.value)) {
                    linhasForm[pos].classList.add('erro');
                } else {
                    email = input.value;
                }
            }
            
        });

        if(nome != '' && email != '' && fone != '') {
            inicio(1, 1);
        }

    }
});