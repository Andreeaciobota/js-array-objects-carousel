const games = [
  {
      image: 'img/01.webp',
      title: 'Marvel\'s Spiderman Miles Morale',
      text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
  }, {
      image: 'img/02.webp',
      title: 'Ratchet & Clank: Rift Apart',
      text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
  }, {
      image: 'img/03.webp',
      title: 'Fortnite',
      text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
  }, {
      image: 'img/04.webp',
      title: 'Stray',
      text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
  }, {
      image: 'img/05.webp',
      title: "Marvel's Avengers",
      text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
  }
];
console.log(extractElement(games));
//estraiamo e salviamo in una variabile l'elemento della pagina dove inseriremo questi elementi
const itemsContainer = document.querySelector(".items-container")

const preview = document.querySelector(".preview")


//inseriamo le immagini-elementi nella pagina attraverso un loop e un template literal
for(let i=0; i<games.length; i++){
const game = games[i];
const thumbPic = game.image;
  const box =    `<div class="item">
                      <img src="${game.image}" alt="${game.title}"> 
                      <span class="infos-game"> 
                          <h2>${game.title}</h2>
                          <p>${game.text}</p>
                      </span>
                  </div>`

  const thumbBox =`<img class="thumb" src="${thumbPic}" alt="landscape">`;
  itemsContainer.innerHTML += box;
  preview.innerHTML += thumbBox;

}


//salviamo gli elementi freccia in variabili
const prevArrw = document.querySelector(".prev")
const nextArrw = document.querySelector(".next")
//creiamo una variabile che tenga conto dell'indice attuale, quindi inizialmente di valore 0
let position = 0;
/*avendo tutti gli elementi display:none; in CSS, creo un'altra classe in CSS che abbia display block, in modo 
da rendere visibile l'elemento-immagine che ha quella classe*/
const items = document.getElementsByClassName("item");

const thumbs = document.getElementsByClassName("thumb");

//estraiamo più elementi contemporaneamente dalla pagina e li salviamo in una variabile come fosse un array
items[position].classList.add("active");

thumbs[position].classList.add("thumb-active");


nextArrw.addEventListener("click", function(){
  //creiamo un controllo che impedisca di reiterare la funzione quando si raggiunga l'indice oltre il quale l'array finisce
  if(position < items.length -1){ //-1 perchè l'incremento va fermato al penultimo elemento, altrimenti ultimo+1 = sforiamo l'array
      //al click rimuoviamo la classe active dall'attuale elemento visibile
      items[position].classList.remove("active"); //essendo comandi comuni sia a if che a else avremmo potuto metterli anche fuori dalla condizione
      thumbs[position].classList.remove("thumb-active"); 

      //incrementiamo di 1 l'indice per passare al successivo elemento-immagine
      position++;

      //aggiungiamo la classe active al nuovo attuale elemento (con indice maggiorato di 1)
      items[position].classList.add("active"); //essendo comandi comuni sia a if che a else avremmo potuto metterli anche fuori dalla condizione
      thumbs[position].classList.add("thumb-active"); 


  } //Altrimenti l'array riparte dalla prima immagine
  else { 
      items[position].classList.remove("active");
      thumbs[position].classList.remove("thumb-active")


      position = 0;

      items[position].classList.add("active");
      thumbs[position].classList.add("thumb-active")


  }
}) 

prevArrw.addEventListener("click", function(){
  if(position > 0){ //non ">=" perchè il decremento va fermato prima dello zero altrimenti con 0-1 sforiamo l'array.
      items[position].classList.remove("active");
      thumbs[position].classList.remove("thumb-active");


      position--;

      items[position].classList.add("active");
      thumbs[position].classList.add("thumb-active");


  } //altrimenti l'array riparte dall'ultima immagine
      else {
          items[position].classList.remove("active");
          thumbs[position].classList.remove("thumb-active")


          position = items.length-1;

          items[position].classList.add("active");
          thumbs[position].classList.add("thumb-active")


      }
})

//spostiamo l'immagine al click sulla miniatura
//creo un ciclo all'interno del quale si ridefinisca la nuova attuale posizione per un nuovo evento: il click sulle miniature
for(let i=0; i < thumbs.length; i++){
  const clickedThumb = thumbs[i];

  clickedThumb.addEventListener("click", function(){
      items[position].classList.remove("active");
      thumbs[position].classList.remove("thumb-active");

      //aggiorno attuale posizione
      position = i;

      items[position].classList.add("active");
      thumbs[position].classList.add("thumb-active")
  })
}



// FUNCTION

function extractElement(array){
  let element;
  for(let i = 0; i<array.length; i++){
      element = array[i];
  }
  return element
}


// funzione per scorrimento automatico 
function moveToNext() {
  // Rimuovi la classe active d
  items[position].classList.remove("active");
  thumbs[position].classList.remove("thumb-active");

  // posizione per passare al elemento succesivo 
  position++;


  if (position >= items.length) {
      position = 0;
  }

  // Aggiungo la classe active all'elemento successivo
  items[position].classList.add("active");
  thumbs[position].classList.add("thumb-active");
}

// ioposto intervallo di scorrimento 2 secondi 
const autoScrollInterval = setInterval(moveToNext, 2000);

// click sul pulsante "Avanti"
nextArrw.addEventListener("click", function () {
  moveToNext();
});

// click sul pulsante "Indietro"
prevArrw.addEventListener("click", function () {
  // Rimuoviola classe active dall'elemento corrente
  items[position].classList.remove("active");
  thumbs[position].classList.remove("thumb-active");


  position--;

  if (position < 0) {
      position = items.length - 1;
  }

  // Do la classe active al elemento precedente 
  items[position].classList.add("active");
  thumbs[position].classList.add("thumb-active");
});

// ciclo per par passare la miniature dal immagine corrente alla succesiva 

for (let i = 0; i < thumbs.length; i++) {
  const clickedThumb = thumbs[i];

  clickedThumb.addEventListener("click", function () {
      items[position].classList.remove("active");
      thumbs[position].classList.remove("thumb-active");

      // Aggiorno la posizione corrente
      position = i;

      items[position].classList.add("active");
      thumbs[position].classList.add("thumb-active");
  });
}

// ...
