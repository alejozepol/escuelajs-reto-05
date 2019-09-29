const $app = document.getElementById('app');
const $characters = document.getElementById('characters');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';

var contador = 0

/* const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
     localStorage.setItem('next_fetch',response.info.next) 
      const characters = response.results;
      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}
 */

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
                  <h2>${character.name}<span>${character.species}</span></h2>
                </article>`    
  newItem(output)
}

function newItem(output){
  $characters.classList.add('Items')
  let newItem = document.createElement('div');
      newItem.innerHTML = output;
      $characters.appendChild(newItem);
}

const loadData = () => {
 const next_fetch = localStorage.getItem("next_fetch")


  if ( contador < 1) {
    getData(API);
    console.log('if ' + contador)
    contador +=1;

  } else if(next_fetch !== '') {
    getData(next_fetch);
    contador +=1;
    console.log('else' + contador)

  } else{
    console.log('no hay mas datos')
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