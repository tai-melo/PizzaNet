document.getElementById('buttonShow').addEventListener('click', () => {
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
})