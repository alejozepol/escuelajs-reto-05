const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';
var next = ''
var prev = ''
var contador = 0
const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      next = response.info.next
      prev =  response.info.prev
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

const loadData = () => {
  if ( contador < 1) {
    getData(API);
    console.log('if ' + contador)
    contador +=1;

  } else if(next !== '') {
    getData(next);
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