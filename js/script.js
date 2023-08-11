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

// Componentes Tela Add
const valoresAddMo = document.querySelectorAll('#valorAddMo');
const valoresAddYr = document.querySelectorAll('#valorAddYr');
const checkService = document.querySelector('#checkService');
const checkStorage = document.querySelector('#checkStorage');
const checkProfile = document.querySelector('#checkProfile');

// Componentes Tela Finishing
const planoEscolhido = document.querySelector('#planoEscolhido');
const valorPlano = document.querySelector('#valorPlano');
const periodoEscolhido = document.querySelector('#periodoEscolhido');
const periodoTotal = document.querySelector('#periodoTotal');
const periodoPlano = document.querySelectorAll('#periodoPlano');
const addService = document.querySelector('#addService');
const addStorage = document.querySelector('#addStorage');
const addProfile = document.querySelector('#addProfile');
const valorAddService = document.querySelector('#valorAddService');
const valorAddStorage = document.querySelector('#valorAddStorage');
const valorAddProfile = document.querySelector('#valorAddProfile');
const valorTotal = document.querySelector('#valorTotal');
const btnReinicio = document.querySelector('#btnReinicio');

// Variáveis Globais;
let indice = 0;
let janela = 0;

let nome, email, fone, plano, valor, soma;
let periodo = 'Monthly';
let periodoMin = 'month';
let periodoAbreviado = 'mo';
let service, storage, profile, valorService, valorStorage, valorProfile;

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

    if(janela == 0 || janela == 4) {
        btnBack.classList.remove('active');
        // if(janela == 4) {
        //     btnNext.classList.add('remove');
        // }
    } else {
        btnBack.classList.add('active');
    }

    sidebarIndices[step].classList.add('active');
    telasContente[tela].classList.add('active');

    telaInfo();
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

    if(janela < 4) {
        btnNext.innerHTML = 'Next Step';
        btnNext.classList.remove('confirm');
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

const telaPlan = () => {
    
    textoErro.classList.remove('active');

    checkPeriodo.addEventListener('click', () => {
        btnArcade.classList.remove('active');
        btnAdvanced.classList.remove('active');
        btnPro.classList.remove('active');
        valor = 0;
        plano = '';
    
        if(checkPeriodo.checked) {
            planoAnual.forEach((plano) => {
                plano.classList.add('active');
                textoPlano[1].classList.add('active');
                periodo = 'Yearly';
                periodoMin = 'year';
                periodoAbreviado = 'yr';
            });
            planoMensal.forEach((plano) => {
                plano.classList.remove('active');
                textoPlano[0].classList.remove('active');
            });
        } else {
            planoAnual.forEach((plano) => {
                plano.classList.remove('active');
                textoPlano[1].classList.remove('active');
                periodo = 'Monthly'
                periodoMin = 'month';
                periodoAbreviado = 'mo';
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

        if(periodo == 'Monthly') {
            valor = 9;
        } else if (periodo == 'Yearly') {
            valor = 90;
        }
    });

    btnAdvanced.addEventListener('click', () => {
        plano = 'Advanced';
        btnAdvanced.classList.add('active');
        btnArcade.classList.remove('active');
        btnPro.classList.remove('active');

        if(periodo == 'Monthly') {
            valor = 12;
        } else if (periodo == 'Yearly') {
            valor = 120;
        }
    });

    btnPro.addEventListener('click', () => {
        plano = 'Pro';
        btnPro.classList.add('active');
        btnArcade.classList.remove('active');
        btnAdvanced.classList.remove('active');

        if(periodo == 'Monthly') {
            valor = 15;
        } else if (periodo == 'Yearly') {
            valor = 150;
        }
    });
    
    
    
    btnNext.addEventListener('click', () => {

        if(plano == '' || plano == null) {
            textoErro.classList.add('active');
        } else {
            inicio(2, 2);
            telaAdd();
        }
    });
    
};

const telaAdd = () => {
    if(periodo == 'Monthly') {
        valorService = 1;
        valorStorage = 2;
        valorProfile = 2;

        valoresAddMo.forEach((item) => {
            item.classList.add('active');
        });

        valoresAddYr.forEach((item) => {
            item.classList.remove('active');
        });
    } else if (periodo = 'Yearly') {
        valorService = 10;
        valorStorage = 20;
        valorProfile = 20;

        valoresAddMo.forEach((item) => {
            item.classList.remove('active');
        });

        valoresAddYr.forEach((item) => {
            item.classList.add('active');
        });
    }

    btnNext.addEventListener('click', () => {

        if(checkService.checked) {
            service = true;
        } else {
            service = false;
        }

        if(checkStorage.checked) {
            storage = true;
        } else {
            storage = false;
        }

        if(checkProfile.checked) {
            profile = true;
        } else {
            profile = false;
        }

        inicio(3, 3);
        telaFinishing();
    });
};

const telaFinishing = () => {

    btnNext.classList.add('confirm');
    btnNext.innerHTML = 'Confirm';

    planoEscolhido.innerHTML = plano;
    periodoEscolhido.innerHTML = periodo;
    periodoTotal.innerHTML = periodoMin;

    valorPlano.innerHTML = valor;
    valorAddService.innerHTML = valorService;
    valorAddStorage.innerHTML = valorStorage;
    valorAddProfile.innerHTML = valorProfile;

    soma = valor;
    
    periodoPlano.forEach((item) => {
        item.innerHTML = periodoAbreviado;
    });

    if(service) {
        addService.classList.add('active');
        soma += valorService;
    } else {
        addService.classList.remove('active');
    }

    if(storage) {
        addStorage.classList.add('active');
        soma += valorStorage;
    } else {
        addStorage.classList.remove('active');
    }

    if(profile) {
        addProfile.classList.add('active');
        soma += valorProfile;
    } else {
        addProfile.classList.remove('active');
    }

    valorTotal.innerHTML = soma;

    btnReinicio.addEventListener('click', charge);

    btnNext.addEventListener('click', () => {
        inicio(3, 4);
        telaThanks();
    });
    
};

const telaThanks = () => {
    btnNext.classList.add('remove');
};

const charge = () => {
    location.reload(true);
};

// Execução do programa;
inicio(0, 0);