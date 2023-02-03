// função para o usuário pode sair da conta dele
const buttonSair = document.querySelector('#buttonSair')

buttonSair.addEventListener('click', logout)

const dropdown = document.querySelector('.dropdown')





firebase.auth().onAuthStateChanged(user => {
    if(user){
        console.log('usuário existe', user)
        usersInfo(user)
        const disableLogin = document.querySelector('.activeLogin')
        const disableCadastro = document.querySelector('.activeCadastro')
        disableLogin.classList.add('desativado')
        disableCadastro.classList.add('desativado')
        dropdown.classList.remove('desativado')
    }else{
        buttonSair.classList.add('desativado')
        dropdown.classList.add('desativado')
    }
})

function logout(){
    firebase.auth().signOut().then( () => {
        window.location.href = '../Ghabriel/login/index.html';
        console.log('deu certo')
    }).catch( () =>{
        alert('Erro ao sair')
    })
}

function usersInfo(user){
    firebase.firestore()
        .collection('infoUsers')
        .where('user.uid', '==', user.uid)
        .get()
        .then(snapshot => {
            const inforUsers = snapshot.docs.map(doc => doc.data())
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


