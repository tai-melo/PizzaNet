const iconeAtivo = document.querySelector('.iconeAtivo')
const iconeDesativo = document.querySelector('.iconeDesativo')

const iconeTituloAtivo = document.querySelector('.iconeTituloAtivo')
const iconeTituloDesativo = document.querySelector('.iconeTituloDesativo')

const openModalButton = document.querySelector('.open-modal')
const closeModalButton = document.querySelector('#close-modal')
const modal = document.querySelector('#modal')
const fade = document.querySelector('#fade')

const userData = document.querySelector('.UserData')
const containerbutton = document.querySelector('.containerButton')
const formulario = document.querySelector('.formulario')

const buttonSaveTransaction = document.querySelector('.saveTransaction')

buttonSaveTransaction.addEventListener('click', saveTransaction)


iconeTituloDesativo.addEventListener('click', ativarIconeDesativo)
iconeTituloAtivo.addEventListener('click', ativarIconeAtivo)


function ativarIconeDesativo(){
    iconeAtivo.classList.remove('ativo')
    iconeDesativo.classList.add('ativo')

    userData.classList.add('desativado')
    containerbutton.classList.add('desativado')
    formulario.classList.remove('desativado')
}

function ativarIconeAtivo(){
    iconeAtivo.classList.add('ativo')
    iconeDesativo.classList.remove('ativo')

    userData.classList.remove('desativado')
    containerbutton.classList.remove('desativado')
    formulario.classList.add('desativado')
}

function getEmailUser(user){
    const userLabel = document.querySelector('.EmailUser')

    userLabel.innerHTML = "Email: " + user.email
}






firebase.auth().onAuthStateChanged(user => {
    if(user){
        // console.log('usuário: ', user.uid)
        usersInfo(user)
        getEmailUser(user)
    }
})


function usersInfo(user){
    firebase.firestore()
        .collection('infoUsers')
        .where('user.uid', '==', user.uid)
        .get()
        .then(snapshot => {
            const inforUsers = snapshot.docs.map(doc => doc.data())
            addTransaction(inforUsers)
            validateUid(inforUsers)

        })
}


function addTransaction(infoUsers){


    infoUsers.forEach(infoUsers => {

        const nome = document.getElementById('nomeFire')
        const sobrenome = document.getElementById('sobrenomeFire')
        const bairro = document.getElementById('bairroFire')
        const rua = document.getElementById('ruaFire')
        const numero = document.getElementById('numeroFire')
        const telefone = document.getElementById('telefoneFire')

        nome.innerHTML = infoUsers.nome
        sobrenome.innerHTML = infoUsers.sobrenome
        bairro.innerHTML = infoUsers.bairro
        rua.innerHTML = infoUsers.rua
        numero.innerHTML = infoUsers.numero
        telefone.innerHTML = infoUsers.telefone

    });

}

const toggleModal = () => {
    [modal, fade].forEach((el) => el.classList.toggle("hide"))
}

[openModalButton, closeModalButton, fade].forEach((el) => {
    el.addEventListener('click', () => toggleModal())
})




function saveTransaction(){
    showLoading()
    const infoUsers = creatInfoDados();
    firebase.firestore()
    .collection('infoUsers')
    .add(infoUsers)
    .then( () => {
        hidenLoading();
        window.location.href = "../DadosUsuarios/dadosUsuarios.html";
    }).catch( () => {
        hidenLoading()
        alert('Erro ao salvar seus dados')
    })
}


function creatInfoDados(){
    return {
        nome: form.nome().value,
        sobrenome: form.sobrenome().value,
        bairro: form.bairro().value,
        rua: form.rua().value,
        numero: Number(form.numero().value),
        telefone: Number(form.telefone().value),
        user: {
            uid: firebase.auth().currentUser.uid
        }

    }
}



const form = {
    nome: () => document.getElementById('name'),
    sobrenome: () => document.getElementById('lastName'),
    bairro: () => document.getElementById('bairro'),
    rua: () => document.getElementById('rua'),
    numero: () => document.getElementById('number'),
    telefone: () => document.getElementById('phone'),
}



