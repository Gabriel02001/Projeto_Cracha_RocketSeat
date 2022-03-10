/// Script da pagina inicial

// captura o valor do input e faz uma requisição a api do github
function Send(){

  let massege_http = ""
  const valorCampo = document.querySelector('input').value
  const url = `https://api.github.com/users/${valorCampo}`;                                                 
  fetch(url) 
  .then(response => response.json())
  .then(data => {
      
    // verifica se o User existe usando a propria mensagem da api 
    // caso ele existe, o User será salvo no localstorage e o usuario será redirecionado para pagina do cracha
       massege_http = data.message
       console.log(massege_http)
       if(massege_http == "Not Found"){   
         alert("Não encontrado")
       }else{                    
         alert("Decolandooooooo")
          localStorage.setItem("key", valorCampo); 
          window.location.href = "indexCracha.html"

       }
  })
}
 
 
 /// Script da pagina do cracha
 
 // essa função é executada assim que a pagina for carregada
 function init(){
   Getgithubinfo()
   ChangeLink(Links)
 }

// adiciona o link das redes sociais
function ChangeLink(texto){
 
var lis = document.querySelectorAll('li')

lis.forEach( item => {
  const social = item.getAttribute('class')
  console.log(item.querySelector('a').href = `https://${social}.com/${Links[social]}`)     // 
  })
}

const Links = {
 youtube: "youtube",
 facebook: "facebook",
 instagram: "instagram",
 twitter: "twitter"
}


// pega as informações do github do usuario 
function Getgithubinfo(){
 
  const user = localStorage.getItem("key");
  const url = `https://api.github.com/users/${user}`;                                                   
                                       
  fetch(url)
  .then(response => response.json())
  
  .then(data => {
  // vinculando as informaçoes do json com a pagina 
  const img = document.getElementById('avatar_url')
  img.src = data.avatar_url
  document.getElementById('name_user').textContent = data.name
  document.getElementById('html_url').href = data.html_url
  //
  document.getElementById('gitName').textContent = data.login
  document.getElementById('descr').textContent = data.bio
  
  })
 
  }



// obs: 
// template string:  trocamos as aspas duplas por crase, e envolvemos a variavel por chaves e acrescentamos um cifrão antes da primeira chave

 const p = "Muito bem-vindo ao Gerador de Crachá informe seu Username do github para gerarmos seu crachá "

 const letras = p.split('') 
 const letrasCorrect = letras.reverse()
 

function TypeText() {
    let umaLetra = letrasCorrect.pop()
  
   if(typeof(umaLetra)!= "undefined"){
const paragrafo = document.querySelector('#prg')
 paragrafo.innerHTML +=  umaLetra
   }else{
     clearInterval(intervalo);
   }
    // Função a ser executada a cada 1 segundo
}

// Variável com o intervalo do setInterval()
var intervalo = setInterval( TypeText, 55 );


// redireciona para pagina principal
function Back(){
  window.location.href = "index.html"
}



// Adicione um evento de clique ao elemento <button>
document.querySelector('#enviar').addEventListener('click', Send)
