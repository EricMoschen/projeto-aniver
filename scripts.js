const envelope = document.getElementById("envelope");
const texto = document.getElementById("texto");
const botao = document.getElementById("botaoAbrir");
const carta = document.getElementById("carta");

const mensagem = `
<strong>Suzana</strong> 💖<br><br>

Feliz aniversário, Susy 💛<br><br>

<div id="ursinhos">
<img src="ursinhos.gif">
</div>

Com todo meu carinho,<br>
<strong>Eric</strong>
`;

botao.addEventListener("click", () => {

envelope.classList.add("aberto");

setTimeout(()=>{

texto.classList.add("mostrar");

digitacao(texto,mensagem);

explodirConfetes();

let contador=0;

const intervalo=setInterval(()=>{

criarCoracao();

contador++;

if(contador>15) clearInterval(intervalo);

},800);

},900);

});


function digitacao(elemento,html){

let i=0;

elemento.innerHTML="";

const cursor=document.createElement("span");

cursor.className="cursor";

cursor.textContent="|";

elemento.appendChild(cursor);

function digitar(){

if(i<html.length){

if(html[i]==="<"){

let tag="";

while(html[i]!==">"){

tag+=html[i];
i++;

}

tag+=">";
i++;

cursor.insertAdjacentHTML("beforebegin",tag);

digitar();

return;

}

cursor.insertAdjacentText("beforebegin",html[i]);

i++;

carta.scrollTop=carta.scrollHeight;

let tempo=Math.random()*70+20;

setTimeout(digitar,tempo);

}

else{

cursor.remove();

const u=document.getElementById("ursinhos");

if(u) u.classList.add("mostrar");

}

}

digitar();

}


function explodirConfetes(){

for(let i=0;i<40;i++){

const p=document.createElement("div");

p.innerHTML=["❤️","✨","💖"][Math.floor(Math.random()*3)];

p.className="confete";

p.style.left="50%";
p.style.top="50%";

const angulo=Math.random()*Math.PI*2;

const vel=Math.random()*200+100;

p.style.setProperty("--dx",`${Math.cos(angulo)*vel}px`);
p.style.setProperty("--dy",`${Math.sin(angulo)*vel}px`);

carta.appendChild(p);

setTimeout(()=>p.remove(),2000);

}

}


function criarCoracao(){

const h=document.createElement("div");

h.innerHTML="💖";

h.style.position="absolute";

h.style.left=(Math.random()*80+10)+"%";

h.style.bottom="20px";

h.style.fontSize="22px";

h.style.animation="flutuar 2s forwards";

carta.appendChild(h);

setTimeout(()=>h.remove(),2000);

}