// Componentes Gerais
const sidebarIndices = document.querySelectorAll('#sidebarIndice');
const telasContente = document.querySelectorAll('#telaContente');
const btnNext = document.querySelector('#btnNext');
const btnBack = document.querySelector('#btnBack');

// Componentes Tela Info
const linhasForm = document.querySelectorAll('#linhaForm');
const getInputs = document.querySelectorAll('#getInput');

// Componentes Tela Plan
const btnArcade = document.querySelector('#btnArcade');
const btnAdvanced = document.querySelector('#btnAdvanced');
const btnPro = document.querySelector('#btnPro');
const textoErro = document.querySelector('#textoErro');
const checkPeriodo = document.querySelector('#checkPeriodo');
const planoMensal = document.querySelectorAll('#planoMensal');
const planoAnual = document.querySelectorAll('#planoAnual');
const textoPlano = document.querySelectorAll('#textoPlano');

// Variáveis Globais;
let indice = 0;
let janela = 0;

let nome, email, fone, plano;
let periodo = 'monthly';
let valor = 0;

// Funções
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

const telaInfo = () => {

    nome = '';
    email = '';
    fone = '';

    btnNext.addEventListener('click', () => {
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
            telaPlan();
        }
    });

    
};
telaInfo();

const telaPlan = () => {
    
    textoErro.classList.remove('active');

    checkPeriodo.addEventListener('click', () => {
    
        if(checkPeriodo.checked) {
            planoAnual.forEach((plano) => {
                plano.classList.add('active');
                textoPlano[1].classList.add('active');
                periodo = 'yearly';
            });
            planoMensal.forEach((plano) => {
                plano.classList.remove('active');
                textoPlano[0].classList.remove('active');
            });
        } else {
            planoAnual.forEach((plano) => {
                plano.classList.remove('active');
                textoPlano[1].classList.remove('active');
                periodo = 'monthly'
            });
            planoMensal.forEach((plano) => {
                plano.classList.add('active');
                textoPlano[0].classList.add('active');
            });
        }
    });

    btnArcade.addEventListener('click', () => {
        plano = 'Arcade';
        btnArcade.classList.add('active');
        btnAdvanced.classList.remove('active');
        btnPro.classList.remove('active');
    });

    btnAdvanced.addEventListener('click', () => {
        plano = 'Advanced';
        btnAdvanced.classList.add('active');
        btnArcade.classList.remove('active');
        btnPro.classList.remove('active');
    });

    btnPro.addEventListener('click', () => {
        plano = 'Pro';
        btnPro.classList.add('active');
        btnArcade.classList.remove('active');
        btnAdvanced.classList.remove('active');
    });
    
    
    btnNext.addEventListener('click', () => {

        if(plano == '' || plano == null) {
            textoErro.classList.add('active');
            

        } else {
            inicio(2, 2);
        }
    });
    
    
};

inicio(0, 0);
// btnNext.addEventListener('click', () => {

//     if(janela == 0){
//         telaInfo();
//     } else if(janela == 1) {
//         telaPlan();
//     }
// });

// setTimeout(() => {
//     telaInfo()
//     telaPlan();
// }, 1);