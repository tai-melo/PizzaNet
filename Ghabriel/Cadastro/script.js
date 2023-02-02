const eyes = document.querySelectorAll('.buttonShow').forEach((element) => {
  element.addEventListener('click', () => {
    if (element.id === 'senha') {
      const eye = document.getElementById('eye')
      const password = document.getElementById('password')
      if (eye.classList == 'bi-eye-slash') {
        eye.classList.remove('bi-eye-slash')
        eye.classList.add('bi-eye')
        password.type = 'text'
      } else {
        eye.classList.remove('bi-eye')
        eye.classList.add('bi-eye-slash')
        password.type = 'password'
      }
    } else if (element.id === 'confirmar') {
      const eyeConfirmation = document.getElementById('eyeConfirmar')
      const passwordConfirmation = document.getElementById('passwordConfirmar')

      if (eyeConfirmation.classList == 'bi-eye-slash') {
        eyeConfirmation.classList.remove('bi-eye-slash')
        eyeConfirmation.classList.add('bi-eye')
        passwordConfirmation.type = 'text'
      } else {
        eyeConfirmation.classList.remove('bi-eye')
        eyeConfirmation.classList.add('bi-eye-slash')
        passwordConfirmation.type = 'password'
      }
    }
  })
})
