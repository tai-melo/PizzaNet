firebase.auth().onAuthStateChanged(user => {
    if(user){
        // window.location = '../../henrique oliveira/home.html'
        // window.location = '../../henrique oliveira/home.html'
    }
})




const email = document.getElementById('email')
const password = document.getElementById('password')

const btnSumit = document.getElementById('btn-submit')
btnSumit.addEventListener('click', validation)

const form = {
    email  : () => document.getElementById('email'),
    senha : () => document.getElementById('password')
}

// Criando expressão regular para validar formulário
// Exemplo: teste@teste.com
function validateEmail(){
    const expression = /\S+@\S+\.\S+/;
    
    return expression.test(email.value)
}



function validation(){    
    if(email.value === '' || email.value === 0){
        return Swal.fire({
            iconColor: '#FF0B0B',
            confirmButtonColor: '#FF0B0B',
            icon: 'error',
            title: 'Email invalido',
            text: 'Campo de e-mail vazio...'
        });
    }
    else if(validateEmail() === false){
        return Swal.fire({
            iconColor: '#FF0B0B',
            confirmButtonColor: '#FF0B0B',
            icon: 'error',
            title: 'Email invalido',
            text: 'Exemplo: teste@gmail.com'
        });
    }
    else if(password.value === '' || password.value === 0){
        return Swal.fire({
            iconColor: '#FF0B0B',
            confirmButtonColor: '#FF0B0B',
            icon: 'error',
            title: 'Senha invalido',
            text: 'Campo de senha vazio. Preencha'
        });
    }
    else{
        login()
    }
}




function login(){
    showLoading()
    firebase.auth().signInWithEmailAndPassword(form.email().value, form.senha().value).then(Response => {
      window.location = '../../henrique oliveira/home.html'
      hidenLoading()
      usersInfo(users)
    }).catch(error =>{
        hidenLoading()
        getErrorMessage(error)
    })
}


function getErrorMessage(error){
    if(error.code === "auth/user-not-found"){
        return Swal.fire({
            iconColor: '#FF0B0B',
            confirmButtonColor: '#FF0B0B',
            icon: 'error',
            title: 'usuário não encontrado',
        });
    }else if(error.code === "auth/wrong-password"){
        return Swal.fire({
            iconColor: '#FF0B0B',
            confirmButtonColor: '#FF0B0B',
            icon: 'error',
            title: 'senha invalida',
        });
    }else if(error.code === "auth/missing-email"){
        alert(error.code)
    }
    return error.message;
}








