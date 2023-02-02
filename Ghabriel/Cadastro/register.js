const btn_cadastrar = document.querySelector('.btn-cadastrar')


btn_cadastrar.addEventListener('click', validation)

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
        register()
    }
}



function register(){
    const email = form.email().value;
    const password = form.password().value
    showLoading()
    firebase.auth().createUserWithEmailAndPassword(
        email, password
    ).then( () => {
        window.location = "../../henrique oliveira/home.html"
    }).catch(error => {
        hidenLoading()
        getErrorMessage(error);
    })
}

function getErrorMessage(error){
    if(error.code === "auth/email-already-in-use"){
        return Swal.fire({
            iconColor: '#FF0B0B',
            confirmButtonColor: '#FF0B0B',
            icon: 'error',
            title: 'Este e-mail já está em uso',
        });
    }
    return error.message;
}

const form = {
    email  : () => document.getElementById('email'),
    password : () => document.getElementById('password')
}


