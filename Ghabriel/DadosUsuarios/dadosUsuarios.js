
function getUserUid(){
    const urlParams =  new URLSearchParams(window.location.search);
    return urlParams.get('uid')
}

function newUser(){
    return getUserUid() ? false : true
}

function findUserUid(uid){

    firebase.firestore()
        .collection("infoUsers")
        .doc(uid)
        .get()
        .then(doc => {
            if(doc.exists){
                console.log(doc.data())
            }else{
                alert('documento não encontrado')
            }
        })
        .catch( () => {
            alert('Erro ao recuperar documento')
        })
}




const iconeAtivo = document.querySelector('.iconeAtivo')
const iconeDesativo = document.querySelector('.iconeDesativo')

const iconeTituloAtivo = document.querySelector('.iconeTituloAtivo')
const iconeTituloDesativo = document.querySelector('.iconeTituloDesativo')

const openModalButton = document.querySelector('.open-modal')
const closeModalButton = document.querySelector('#close-modal')
const modal = document.querySelector('#modal')
const fade = document.querySelector('#fade')
const textoAlert = document.querySelector('.textoAlert')
const inputCadastro = document.querySelectorAll('#modal-body input')


const userData = document.querySelector('.UserData')
const containerbutton = document.querySelector('.containerButton')
const formulario = document.querySelector('.formulario')

const buttonSaveTransaction = document.querySelector('.saveTransaction')
const buttonChangeTransaction = document.querySelector('.changeTransaction')
const tituloModal = document.querySelector('.header-modal h1')

buttonSaveTransaction.addEventListener('click', saveTransaction)
buttonChangeTransaction.addEventListener('click', changeTransaction)


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
            const inforUsers = snapshot.docs.map(doc => ({
                ...doc.data(),
                uid: doc.id
            }))
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
        console.log(infoUsers)
        if(uidUser !== ''){
            tituloModal.innerHTML = "Altere seus dados"
            buttonSaveTransaction.classList.remove('saveTransaction')
            buttonSaveTransaction.classList.add('desativado')
            buttonChangeTransaction.classList.remove('desativado')
            openModalButton.innerHTML = "Alterar seus dados"
            // openModalButton.classList.add('dadosCadastrado')

            // textoAlert.classList.remove('desativado')
            // textoAlert.innerHTML = "Dados do usuário já cadastrado"
            // inputCadastro.forEach((item) => item.classList.add('desativado'))
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

[openModalButton, fade, closeModalButton].forEach((el) => {
    el.addEventListener('click', () => toggleModal())
})



const formError = {
    nomeError: () => document.getElementById('errorNome'),
    sobrenomeError: () => document.getElementById('errorSobrenome'),
    bairroError: () => document.getElementById('errorBairro'),
    ruaError: () => document.getElementById('errorRua'),
    numeroError: () => document.getElementById('errorNumero'),
    telefoneError: () => document.getElementById('errorTelefone'),
}
const form = {
    nome: () => document.getElementById('name'),
    sobrenome: () => document.getElementById('lastName'),
    bairro: () => document.getElementById('bairro'),
    rua: () => document.getElementById('rua'),
    numero: () => document.getElementById('number'),
    telefone: () => document.getElementById('phone'),
}

function findInfoUserScreen(infoUsers){
    form.nome().value = infoUsers.nome
    form.sobrenome().value = infoUsers.sobrenome
    form.bairro().value = infoUsers.bairro
    form.rua().value = infoUsers.rua
    form.numero().value = infoUsers.numero
    form.telefone().value = infoUsers.telefone
}

function saveTransaction(){
    validatedFormModal()
}


function changeTransaction(){

    // validatedFormModalRename()
    firebase.firestore()
    .collection('infoUsers')
    .doc(getUserUid())
    .update({nome: form.nome().value, sobrenome: form.sobrenome().value, bairro: form.bairro().value, rua: form.rua().value,
        numero: form.numero().value, telefone: form.telefone ().value})
    .then(() => {
    window.location.href = '../../melissa gouveia/home.html'
}).catch(e => {
    console.log('documento não atualizado', e)
})

    // firebase.firestore()
    //     .collection('infoUsers')
    //     .doc('Mm2zSs6GxADUbWiDovpD')
    //     .update({nome: 'Lucas da Silva'})
    //     .then( () =>{
    //         console.log('documento atualizado')
    //     })
    //     .catch(e =>{
    //         console.log('erro ao atualizar document', e)
    //     })


}



function validatedFormModal(){

    if(form.nome().value === '' || form.nome() < 2){
        // Swal.fire('Campo nome vazio, preencha para proseguir')
        return Swal.fire({
            confirmButtonColor: '#FF0B0B',
            text: 'Campo nome vazio, preencha para proseguir'
        });
    }else if(form.sobrenome().value === ''){
        return Swal.fire({
            confirmButtonColor: '#FF0B0B',
            text: 'Campo sobrenome vazio, preencha para proseguir'
        });
    }else if(form.bairro().value === ""){
        return Swal.fire({
            confirmButtonColor: '#FF0B0B',
            text: 'Campo bairro vazio, preencha para proseguir'
        });
    }else if(form.rua().value === ''){
        return Swal.fire({
            confirmButtonColor: '#FF0B0B',
            text: 'Campo rua vazio, preencha para proseguir'
        });
    }else if(form.numero().value === "e" || form.numero().value === ''){
        return Swal.fire({
            confirmButtonColor: '#FF0B0B',
            text: 'Digite apenas números ou o campo número está vazio'
        });
    }else if(form.telefone().value === '' || form.telefone().value === "e"){
        return Swal.fire({
            confirmButtonColor: '#FF0B0B',
            text: 'Digite apenas números ou o campo telefone está vazio'
        });
    }else{
        const infoUsers = creatInfoDados();
        firebase.firestore()
        .collection('infoUsers')
        .add(infoUsers)
        .then( () => {
            // hidenLoading();
            window.location.href = "../../melissa gouveia/home.html";
        }).catch( () => {
            alert('Erro ao salvar seus dados')
        })
    }
}

function validatedFormModalRename(){

    if(form.nome().value === '' || form.nome() < 2){
        // Swal.fire('Campo nome vazio, preencha para proseguir')
        return Swal.fire({
            confirmButtonColor: '#FF0B0B',
            text: 'Campo nome vazio, preencha para proseguir'
        });
    }else if(form.sobrenome().value === ''){
        return Swal.fire({
            confirmButtonColor: '#FF0B0B',
            text: 'Campo sobrenome vazio, preencha para proseguir'
        });
    }else if(form.bairro().value === ""){
        return Swal.fire({
            confirmButtonColor: '#FF0B0B',
            text: 'Campo bairro vazio, preencha para proseguir'
        });
    }else if(form.rua().value === ''){
        return Swal.fire({
            confirmButtonColor: '#FF0B0B',
            text: 'Campo rua vazio, preencha para proseguir'
        });
    }else if(form.numero().value === "e" || form.numero().value === ''){
        return Swal.fire({
            confirmButtonColor: '#FF0B0B',
            text: 'Digite apenas números ou o campo número está vazio'
        });
    }else if(form.telefone().value === '' || form.telefone().value === "e"){
        return Swal.fire({
            confirmButtonColor: '#FF0B0B',
            text: 'Digite apenas números ou o campo telefone está vazio'
        });
    }else{

    }
}


function creatInfoDados(){
    return {
        nome: form.nome().value,
        sobrenome: form.sobrenome().value,
        bairro: form.bairro().value,
        rua: form.rua().value,
        numero: form.numero().value,
        telefone: form.telefone().value,
        user: {
            uid: firebase.auth().currentUser.uid
        }

    }
}