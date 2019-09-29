const $characters = document.getElementById('characters');
const $observe = document.getElementById('observe');
const $end = document.getElementById('end');
const API = 'https://rickandmortyapi.com/api/character/';

var contador = true

const getData = api  => {
  fetch(api)
  .then(response => response.json())
  .then(response => {
    localStorage.setItem('next_fetch',response.info.next) 
     var characters = response.results
     var output = characters.map(character => {
      characters = template(character)
      }).join('');
  })
  .catch(error => console.log(error));
}

function template(character){
  let output = `<article class="Card">
                  <img src="${character.image}"/>
                  <div class="card__header">
                    <h2>${character.name}</h2>
                    <span>${character.species}</span>
                  </div>
                </article>`    
  newItem(output)
}

function newItem(output){
  $characters.classList.add('Items')
  let newItem = document.createElement('div')
      newItem.innerHTML = output;
      $characters.appendChild(newItem);
}

function noMasDatos(){
  let p = document.createElement('p')
  let template = `No existen más personajes`
  p.innerHTML = template;
  $end.classList.add('bg-end')
     $end.appendChild(p);
}

async function loadData(){
  const next_fetch = localStorage.getItem("next_fetch")

  if (contador) {
  let datos = await getData(API);
    contador = false;

  } else if(next_fetch !== '') {
    let datos = await getData(next_fetch);

  } else{
    $observe.remove()
    noMasDatos()
  }
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);