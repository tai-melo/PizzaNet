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

const buttonSair = document.querySelector('#buttonSair')

buttonSair.addEventListener('click', logout)


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
        if(user){
            console.log('usuário existe', user)
            usersInfo(user)
            const disableLogin = document.querySelector('.activeLogin')
            const disableCadastro = document.querySelector('.activeCadastro')
            disableLogin.classList.add('desativado')
            disableCadastro.classList.add('desativado')
        }else{
            buttonSair.classList.add('desativado')
        }
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
            getNameUser(inforUsers)
        })
}

function getNameUser(inforUsers){
    inforUsers.forEach(dadosUsuario => {

        const userName = document.querySelector('.userName')

        userName.innerHTML = 'Olá, ' + dadosUsuario.nome
        console.log(dadosUsuario.nome)
        console.log(inforUsers)
    });
}

function logout(){
    firebase.auth().signOut().then( () => {
        window.location.href = '../../Ghabriel/login/index.html';
        console.log('deu certo')
    }).catch( () =>{
        alert('Erro ao sair')
    })
}


function addTransaction(infoUsers){


    infoUsers.forEach(infoUsers => {

        const uidUser = infoUsers.user.uid
        console.log(uidUser)
        if(uidUser !== ''){
            openModalButton.classList.remove('open-modal')
            openModalButton.classList.add('dadosCadastrado')

        }else{
            console.log('uid não existe')
        }
        
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

[openModalButton, buttonSaveTransaction, fade, closeModalButton].forEach((el) => {
    el.addEventListener('click', () => toggleModal())
})




function saveTransaction(){
    const infoUsers = creatInfoDados();
    firebase.firestore()
    .collection('infoUsers')
    .add(infoUsers)
    .then( () => {
        // hidenLoading();
        window.location.href = "../../henrique oliveira/home.html";
    }).catch( () => {
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



