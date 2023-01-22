const article = document.querySelector("#content");
const button = document.querySelector("#botao-mais");

button.addEventListener("click", lerMais);

function lerMais() {
  
    if (article.className == "conteudo"){
        article.className = "";
        article.classList.add("open");
        button.innerHTML= "Mostrar menos";
    } 
    else if(article.className == "open") { 
        
        article.classList.remove("open");
        article.classList.add("conteudo");        
        button.innerHTML = "Ler mais";

    }
}
