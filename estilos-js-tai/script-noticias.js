const article = document.querySelector("#content");
const button = document.querySelector("#botao-mais");

button.addEventListener ("click", mostrarMais);

function mostrarMais() {
    if (article.className == "open"){
        article.className = "";
        button.innerHTML= "Ler mais";
    } else {
        article.className = "open";
        button.innerHTML = "Mostrar menos";
    }
}