'use strict';
const footer = document.querySelector('footer');
const main = document.querySelector('main');
let totalPages = '';
let currentPage = 1;
let input = document.getElementById('haku');

// creates a node structure for pictures
main.innerHTML = '<ul id=\'kuvalista\'></ul><div id=\'buttons\'><button type=\'button\' class=\'hidden\' id=\'prev\'>Prev</button><button type=\'button\' id=\'next\'>Next</button></div>';
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
qText.classList.add('hidden');
nappi.classList.add('hidden');

// Loads a ransom featured image as background
fetch(unsplash + random + accesKey + '&features').then(function(response) {
  return response.json();
}).then(function(json) {
  console.log(json.urls.full);
  document.querySelector(".bg").style.backgroundImage = 'url(\'' + json.urls.full + '\')';
});

// Next button to load next page of images
next.addEventListener('click', function() {
  try {
    prev.classList.remove('hidden');
  } catch (e) {
    console.log(e);
  }
  if (currentPage < totalPages) {
    currentPage++;
    loadImages(currentPage);
    if (currentPage === totalPages) {
      next.classList.add('hidden');
    }
  }
});

// prev button to load previous page of images
prev.addEventListener('click', function() {
  try {
    next.classList.remove('hidden');
  } catch (e) {
    console.log(e);
  }
  if (currentPage>1){
  currentPage--;

    loadImages(currentPage);
  }

  if (currentPage === 1) {
    prev.classList.add('hidden');
  }
});

// Starts the query to the api from clicking a search button
// Starts the query to the api from clicking a search button
queryButton.addEventListener('click', function() {
  document.querySelector('.search').style.display = 'none';
  document.querySelector(".bg").style.backgroundImage = "none";
  loadImages(1);
});

//Enter key works as the search button
input.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById('nappi').click();
  }
});

// Fetch function to load images from unsplash api
function loadImages(page) {
  const mainUL = document.querySelector('#kuvalista');
  mainUL.innerHTML = '';
  qText.classList.remove('hidden');
  nappi.classList.remove('hidden');

  const queryText = '&query=' + document.querySelector('#haku').value +
      '&per_page=30&page=' + page; // Gets the value of the search field
  console.log(unsplash + search + accesKey + queryText);
  fetch(unsplash + search + accesKey + queryText).then(function(response) {
    return response.json();
  }).then(function(json) {
    console.log(json);
    totalPages = json.total_pages;
    if(currentPage === totalPages || currentPage > totalPages){
      next.classList.add('hidden');
    }


    let mainHTML = '';
    // build the li elements with images
    for (let i = 0; i < json.results.length; i++) {
      const img = json.results[i].urls.raw + '&fit=crop&w=200&h=300';
      mainHTML = `<li><a href="./details.html"><img src="${img}" id="${json.results[i].id}" class="details"></a></li>`;
      mainUL.innerHTML += mainHTML;
      main.classList.remove('hidden');
      footer.classList.remove('hidden');
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
};



