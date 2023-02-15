const article = document.querySelector("#content");
const button = document.querySelector("#botao-mais");

const img = document.querySelector(".familia-cozinhando");

button.addEventListener("click", lerMais);

function lerMais() {
  
    if (article.className == "conteudo" ){
        
        article.className = "";
        
        article.classList.add("open");
         
        img.className= "";
        
        img.classList.add("img-gone") 
                
        button.innerHTML= "Mostrar menos";
    }

    else if(article.className == "open")  { 

        article.classList.remove("open");
        
        article.classList.add("conteudo" ); 
        
        img.classList.remove("img-gone");

        img.classList.add("familia-cozinhando")
          
        button.innerHTML = "Ler mais";
       
    }
}
