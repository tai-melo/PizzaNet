const buttonEsqueciSenha = document.getElementById('btn-esqueci-senha')

buttonEsqueciSenha.addEventListener('click', validation)
const inputEsqueciSenha = document.getElementById('inputEsqueciSenha')


function validateEmail(){
    const expression = /\S+@\S+\.\S+/;
    
    return expression.test(inputEsqueciSenha.value)
}


function validation(){    
    if(inputEsqueciSenha.value === '' || inputEsqueciSenha.value === 0){
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
    else{
        resetSenha()
    }
}



function resetSenha(){
    showLoading()
    firebase.auth().sendPasswordResetEmail(inputEsqueciSenha.value).then(function() {
          // Password reset email sent.
            hidenLoading()
            return Swal.fire({
            iconColor: '#00c434',
            confirmButtonColor: '#00c434',
            icon: 'success',
            title: 'E-mail enviado com sucesso',
        });
        })
        .catch(function(error) {
          // Error occurred. Inspect error.code.
          hidenLoading()
          getErrorMessagePassword(error);
        });
}




function getErrorMessagePassword(error){
    if(error.code === "auth/user-not-found"){
        return Swal.fire({
            iconColor: '#FF0B0B',
            confirmButtonColor: '#FF0B0B',
            icon: 'error',
            title: 'usuário não encontrado',
        });
    }
}
