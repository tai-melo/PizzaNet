firebase.auth().onAuthStateChanged(user => {
    if(user){
        const buttonSuaConta = document.querySelector('.buttonSuaConta')
        buttonSuaConta.addEventListener('click', () => {
            window.location.href = '../../Ghabriel/DadosUsuarios/dadosUsuarios.html?uid=' + uidUser.uid
        })
        console.log('usuário existe', user)
        usersInfo(user)
    }
})

function logout(){
    buttonSair.addEventListener('click', logout)
    firebase.auth().signOut().then( () => {
        window.location.href = '../../Ghabriel/login/index.html';
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
            const inforUsers = snapshot.docs.map(doc => ({
                ...doc.data(),
                uid: doc.id
            }))
            getNameUser(inforUsers)
            uidUser(inforUsers)
        })
}

function uidUser(inforUsers){
    inforUsers.forEach(uidUser => {
        console.log(uidUser.uid)
        const buttonSuaConta = document.querySelector('.buttonSuaConta')
        buttonSuaConta.addEventListener('click', () => {
            window.location.href = '../Ghabriel/DadosUsuarios/dadosUsuarios.html?uid=' + uidUser.uid
        })
    })

}
