# Escuelajs-reto-05
Reto 5 Septiembre 28: Curso de Fundamentos de JavaScript

# 100tifi.co

![100tifico](https://github.com/alejozepol/escuelajs-reto-05/blob/master/public/page.PNG)

Somos un directorio de personajes de la serie animada "Rick and Morty". Estamos por lanzar nuestra implementación y necesitamos resolver los problemas que presenta nuestra aplicación.

https://100tifi.co tiene un Bug, al llegar al final del listado de personajes se realiza una petición a la API ya que implementamos un "intersection observer" pero vuelve a obtener los mismos personajes y necesitamos cargar la lista completa de 468 personajes conforme hagamos scroll.

### Debug

Visita el sitio web: https://100tifi.co

### Instalación

```
npm install
```

### Ejecución

```
npm run start
```

### Documentación

#### Variables Globales
- Variable llamada $characters donde haremos render de nuestra app.
- Variable llamada $observe es el elemento del DOM que sera Observado.
- Variable llamada $end es el elemento del DOM que sevira como contenedor de mensaje final cuando no existan mas personajes.
- Variable llamada inicio el cual nos ayuda a identificar si es el primer cargue
- Constante 'API': Utilizamos la API de Rick and Morty.

```javascript
const $characters = document.getElementById('characters');
const $observe = document.getElementById('observe');
const $end = document.getElementById('end');
const API = 'https://rickandmortyapi.com/api/character/';
var inicio = true
```

#### Función getData
Función llamada 'getData' que se encarga de hacer Fetch a una API.

```javascript
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
```

#### Función template
Función que construye el template (tarjetas) donde se mostrara la informacion

```javascript
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
```

#### Función newItem
Función que construye el contenedor para las tarjetas e inserta cada uno de los items como tarjeta

```javascript
function newItem(output){
  $characters.classList.add('Items')
  let newItem = document.createElement('div')
      newItem.innerHTML = output;
      $characters.appendChild(newItem);
}
```

#### Función noMasDatos
Función encargada insertar un mensaje para informar al usuario que ya no existen mas personajes

```javascript
function noMasDatos(){
  let p = document.createElement('p')
  let template = `No existen más personajes`
  p.innerHTML = template;
  $end.classList.add('bg-end')
  $end.appendChild(p);
}
```

#### Función loadData
Función encargada de hacer Fetch de los personajes y validar si es el primer cargue e identificar cuando es el ultimo.

```javascript
async function loadData(){
  const next_fetch = localStorage.getItem("next_fetch")

  if (inicio) {
  let datos = await getData(API);
    inicio = false;

  } else if(next_fetch !== '') {
    let datos = await getData(next_fetch);

  } else{
    storage.removeItem(keyName);
    $observe.remove('next_fetch')
    noMasDatos()
  }
}
```

#### Función Intersection Observer
Función encargada de Observar cuando el scroll llega al final de la pagina para lanzar la ejecucion del siguiente llamado al API

```javascript

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
```


## RETO

### Primer problema

1. Guarda en localStorage la URL de la siguiente petición de personajes obtenida en la primera llamada a la API.
2. Utiliza el nombre para la llave: 'next_fetch'.
3. Comprueba que se ha guardado el valor 'next_fetch' en localStorage.

### Segundo Problema

1. Obten los datos almacenados en localStorage de la llave: 'next_fetch'.
2. Valida que exista un valor en 'next_fetch' o regresa el primer llamado de la API.
3. Actualiza la función loadData() a Async/Await.

### Tercer Problema

Cuando cerramos la pestaña o recargamos la pagina se debe de volver a mostrar los primeros 20 personajes.

1. Mostrar los primeros 20 personajes al recargar
2. Eliminar el localStorage.

### Cuarto Problema (Opcional)

La API utilizada "RickAndMortyApi.com" tiene 25 paginas de 20 personajes cada una, cuando la ultima petición sea ejecutada y el valor 'next' no sea entregado debes de mostrar un mensaje "Ya no hay personajes", a su vez debes de destruir el intersection observer.

1. Implementar mensaje: "Ya no hay personajes...".
2. Deja de observar el elemento "observe".

### Enviar solución de reto

Debes de crear un "Fork" de este proyecto, revolver los problemas y crear un Pull Request hacia este repositorio.

### Contribuir
Si alguien quiere agregar o mejorar algo, lo invito a colaborar directamente en este repositorio: [escuelajs-reto-05](https://github.com/platzi/escuelajs-reto-05/)

### Licencia
escuelajs-reto-05 se lanza bajo la licencia [MIT](https://opensource.org/licenses/MIT).
