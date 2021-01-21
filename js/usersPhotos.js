const photosUl = document.createElement('ul');
const button_holder = document.createElement('div');
const main = document.querySelector('main');
const container = document.querySelector(".container");
const userInfo = document.createElement('div');
const user_details = document.createElement('div');
const user_profile_img = document.createElement('div');
user_details.setAttribute('id','user_details');
user_profile_img.setAttribute('id','user_profile_img');
const pics = document.createElement('div');
userInfo.className="user_info";

// next and forth buttons
button_holder.innerHTML+= '<ul id=\'kuvalista\'></ul><div id=\'buttons\'><button type=\'button\' class=\'hidden\' id=\'previ\'>Prev</button><button type=\'button\' id=\'nexti\'>Next</button></div>';
//Elements
userInfo.appendChild(user_profile_img);
userInfo.appendChild(user_details);
main.appendChild(pics);
main.appendChild(photosUl);
main.appendChild(button_holder);
container.appendChild(userInfo);
container.appendChild(main);

const next = document.querySelector('#nexti');
const prev = document.querySelector('#previ');
let totalPages = '';
let currentPage = 1;

usersPhoto(currentPage);

// Next button to load next page of images
next.addEventListener('click', function() {
  try {
    prev.classList.remove('hidden');
  } catch (e) {
    console.log(e);
  }


  if (currentPage < totalPages) {
    console.log('got here<');
    currentPage++;
    picture_update(currentPage);
    if (currentPage === totalPages || totalPages === 1 ) {
      next.classList.add('hidden');
    }}
});
// prev button to load previous page of images
prev.addEventListener('click', function() {
  if (currentPage>1){
    currentPage--;
    picture_update(currentPage);
    if (currentPage === 1) {
      prev.classList.add('hidden');
    }
  }
  try {
    next.classList.remove('hidden');
  } catch (e) {
    console.log(e);
  }


});


function usersPhoto(page) {
  let user_name = sessionStorage.user;
  console.log(user_name);
  let address= `https://api.unsplash.com/users/${user_name}/photos/?&page=${page}&per_page=30&client_id=3cfa058d794390a086a37101e32c3c6c5fb86eb4b4617d74ad44fece82e3640e`;
  console.log('address',address);
  return fetch(address)
  .then(function(resp) {
    return resp.json();
  })
  .then(function(json) {
    let contentUser = json;
    // counting the total amount of pages
    let total_pic = json[0].user.total_photos;
      totalPages= Math.ceil(total_pic/30);
      console.log('totalpage_',totalPages);
    if(currentPage === totalPages){
      next.classList.add('hidden');
    }



    console.log('user coontent', contentUser);
    // user name
    try {
      let name= json[0].user.first_name;
      let last_name = json[0].user.last_name;
      if(name === null && last_name === null){
        name="";
        last_name ="";
      } else if( last_name === null) {
        user_details.innerHTML += "<h1 id='name' class='user'>" +name+ "</h1>";
      } else if(name === null){
        user_details.innerHTML += "<h1 id='name' class='user'>"+last_name+"</h1>";
      } else {
        user_details.innerHTML += "<h1 id='name' class='user'>" +name+ " "+last_name+"`s picures</h1>";
      }
    }catch (error) {
      console.log('problem occurd last_name');
    }

    //profile image
    try{
      let profile_picture = json[0].user.profile_image.large;
      user_profile_img.innerHTML += `<img src="${profile_picture}" alt="profile_picture" class="profile_img" id="profile_i"><br>`;
    }catch (error) {
     console.log('no pic');
    }
    console.log(json);
    //External links
    user_profile_img.innerHTML +=`${externalLink("https://twitter.com/", json[0].user.twitter_username, "Twitter")}
    ${externalLink("https://www.instagram.com/", json[0].user.instagram_username, "Instagram")}`;

    // user location

    try {
      let loc = json[0].user.location;
      if(loc === null){
        loc="";
      }else {
        user_details.innerHTML += "<p id='user_location' class='user'>"+loc+"</p>"
      }
    }catch (error) {
      console.log('problem occurd at user_location');
    }

    //bio
    try {
      let bio = json[0].user.bio;
      if(bio === null){
        bio="";
      }else {
        user_details.innerHTML += "<p id='user_name' class='user'>"+bio+"</p>"
      }
    }catch (error) {
      console.log('problem occurd at user_name');
    }
    // total pictures
    try {
     let total_pic= json[0].user.total_photos
      if(total_pic === null){
        total_pic="";
      }else {
       pics.innerHTML += "<p id='user_name' class='user'>"+total_pic+" Photos</p>"
      }
    }catch (error) {
      console.log('problem occurd at user_name');
    }

    //img
    try{
    for (let i = 0; i < json.length; i++) {
      const img = json[i].urls.raw + '&fit=crop&w=200&h=300';
      photosUl.innerHTML += `<li><a href="./details.html"><img src="${img}" id="${json[i].id}" class="details"></a></li>`;
    }
    }catch (error) {
      console.log('problem with image');
    }
    //Elements
    userInfo.appendChild(user_profile_img);
    userInfo.appendChild(user_details);
    main.appendChild(pics);
    main.appendChild(photosUl);
    main.appendChild(button_holder);
    container.appendChild(userInfo);
    container.appendChild(main);

    //save the id in sessionstorage
    for (let i = 0; i < json.length; i++) {
      let ImageId = document.getElementsByClassName('details');
      ImageId[i].addEventListener('click', function() {
        sessionStorage.clear();
        console.log('check me :', json[i].id);
        sessionStorage.setItem('imgID', json[i].id);

      });
    }
//if error occures in fetching.
  }).catch(function(error) {
    console.log("fetch error ", error.message);

    //Elements
    userInfo.appendChild(user_profile_img);
    userInfo.appendChild(user_details);
    main.appendChild(pics);
    main.appendChild(photosUl);
    main.appendChild(button_holder);
    container.appendChild(userInfo);
    container.appendChild(main);
  });
}

// creates an external link
function externalLink(service, link, linkName) {
  console.log(service + link + linkName);
  if (link !== null && link !== "") {
    return `<a href="${service}${link}">${linkName}</a>`;
  } else {
    return "";
  }
}

// Change page updates
function picture_update(page) {
  photosUl.innerHTML='';
  let user_name = sessionStorage.user;
  console.log(user_name);
  let address = `https://api.unsplash.com/users/${user_name}/photos/?&page=${page}&per_page=30&client_id=3cfa058d794390a086a37101e32c3c6c5fb86eb4b4617d74ad44fece82e3640e`;
  console.log('address', address);
  return fetch(address).then(function(resp) {
    return resp.json();
  }).then(function(json) {
    let contentUser = json;
    let total_pic = json[0].user.total_photos;
      totalPages= Math.ceil(total_pic/30);
      console.log('totalp',totalPages);
    //img
    try{
      for (let i = 0; i < json.length; i++) {
        const img = json[i].urls.raw + '&fit=crop&w=200&h=300';
        photosUl.innerHTML += `<li><a href="./details.html"><img src="${img}" id="${json[i].id}" class="details"></a></li>`;
      }
    }catch (error) {
      console.log('problem with image');
    }

    //save the id in sessionstorage
    for (let i = 0; i < json.length; i++) {
      let ImageId = document.getElementsByClassName('details');
      ImageId[i].addEventListener('click', function() {
        sessionStorage.clear();
        console.log('check me :', json[i].id);
        sessionStorage.setItem('imgID', json[i].id);

      });
  }
});}