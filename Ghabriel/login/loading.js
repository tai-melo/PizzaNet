const fundoDesativo = document.querySelector('.desativo')
const icone = document.querySelector('.icone-desativo')



function showLoading(){
    fundoDesativo.classList.remove('desativo')
    fundoDesativo.classList.add('loading')
    icone.classList.remove('icone-desativo')
    icone.classList.add('icone-pizza')
}

function hidenLoading(){
    fundoDesativo.classList.add('desativo')
    fundoDesativo.classList.remove('loading')
    icone.classList.add('icone-desativo')
    icone.classList.remove('icone-pizza')
}