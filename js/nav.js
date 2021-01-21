const unsplash = 'https://api.unsplash.com/'; // Main url for unsplash api
const search = 'search/photos/';
const random = 'photos/random/';
const accesKey = '?client_id=3cfa058d794390a086a37101e32c3c6c5fb86eb4b4617d74ad44fece82e3640e';
let nex;
let pre;
let totalP = '';
let currentP = 1;

const queryButton = document.querySelector('#nappi'); // query button on maintag page
//const mainUL = document.querySelector('#kuvalista'); // Main element on index

const nav = document.querySelector('header');
nav.innerHTML = `<nav>
                    <ul class="navbar">
                      <li class="logo"><a href="./index.html"><h3>Destination Seeker</h3></a></li>
                      <li class="haku"><input id="tophaku" type="text" placeholder="Searh for photos"></li>
                      <li class="hakunappi"><button id="topButton">Search</button></li>
                      <li class="ab"><a href="./about.html"><h3>About</h3></a> 
                           
                      </li>
                    </ul>
                 </nav>`;
let qText = document.getElementById('tophaku');
const nappi = document.querySelector('#topButton');

nappi.addEventListener('click', function() {
  loadI(1);
});

function loadI(page) {

  // Compability check for different pages
  try {
    main.classList.remove('details');
  } catch (e) {
    console.log(e);
  }
  try {
    footer.remove();
  } catch (e) {
    console.log(e);
  }
  try {
    container.classList.remove('users');
    userInfo.remove();
    main.classList.remove('about');
  } catch (e) {
    console.log(e);
  }

  main.innerHTML = '';
  main.innerHTML = '<ul id=\'kuvalista\'></ul><div id=\'buttons\'><button type=\'button\' class=\'hidden\' id=\'pre\'>Prev</button><button type=\'button\' id=\'nex\'>Next</button></div>';
  nex = document.querySelector('#nex');
  pre = document.querySelector('#pre');
  if (currentP === totalP) {
    nex.classList.add('hidden');
  }
  if (currentP > 1) {
    pre.classList.remove('hidden');
  }

  // Next button to load next page of images
  nex.addEventListener('click', function() {
    if (currentP < totalP) {
      currentP++;
      loadI(currentP);
    }
  });
// prev button to load previous page of images
  pre.addEventListener('click', function() {
    if (currentP>1) {
      currentP--;
      loadI(currentP);
    }
  });

  const mainUL = document.querySelector('#kuvalista');
  const haku = '&query=' + qText.value + '&per_page=30&page=' + page; // Gets the value of the search field
  console.log(unsplash + search + accesKey + haku);
  fetch(unsplash + search + accesKey + haku).then(function(response) {
    return response.json();
  }).then(function(json) {
    totalP = json.total_pages;
    if(currentP >= totalP){
      nex.classList.add('hidden');
    }
    console.log(json);
    let mainHTML = '';

    
    for (let i = 0; i < json.results.length; i++) {
      const img = json.results[i].urls.raw + '&fit=crop&w=200&h=300';
      mainHTML = `<li><a href="./details.html"><img src="${img}" id="${json.results[i].id}" class="details"></a></li>`;
      mainUL.innerHTML += mainHTML;
      try {
        main.classList.remove('hidden');
        footer.classList.remove('hidden');
      } catch (e) {
        console.log(e);
      }
    }

    // Sets an event listener for image links and stores image id to sessionstorage
    let imgLinks = document.getElementsByClassName('details');
    for (let i = 0; i < imgLinks.length; i++) {
      imgLinks[i].addEventListener('click', function(event) {
        sessionStorage.clear();
        sessionStorage.imgID = event.target.id;
        console.log(sessionStorage.imgID);
      });
    }
  });
}

function animateButton(x) {
  x.classList.toggle('change');
  document.getElementById('myDropdown').classList.toggle('show');
}

var topInput = document.getElementById('tophaku');
console.log(topInput)

topInput.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    console.log(event);
    document.getElementById('topButton').click();
    console.log('Enter haettu');
  }
});