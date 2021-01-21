const body = document.querySelector(".container");
const imageId = sessionStorage.imgID; // Gets the id of the clicked image from session storage
// Elements in the body
const div = document.createElement('div');
const main = document.createElement('main');
const figure = document.createElement('figure');
const more_info = document.createElement('div');
const footer = document.createElement('footer');

more_info.setAttribute('id','more_i');

// Elements for the dropdown list
//holder
const drop_down_holder = document.createElement('div');
drop_down_holder.setAttribute('id','drop_down_holder');
//button
const drop_down_button = document.createElement('button');
drop_down_button.setAttribute('id','drop_down_button');
drop_down_button.innerHTML = 'Different size on image';
drop_down_holder.appendChild(drop_down_button);
// Links holder
const drop_down_links = document.createElement('div');
drop_down_links.setAttribute('id','drop_down_links');
drop_down_holder.appendChild(drop_down_links);

//map
const map_i = document.createElement('div');
const navigoi = document.createElement("a");
navigoi.setAttribute("target","_blank");
navigoi.className = "hidden";
navigoi.innerHTML = "<button type='button' id='navigoi'>Navigate</button>";
map_i.className= "hidden";

map_i.setAttribute("id", "map");
div.setAttribute('id','profile_info');

more_info.innerHTML = `<p>Image id: ${imageId}</p>`;

// fetching the api url
const url = 'https://api.unsplash.com/photos/'+imageId+'?client_id=3cfa058d794390a086a37101e32c3c6c5fb86eb4b4617d74ad44fece82e3640e';
console.log('url', url);
// fetching...
fetch(url)
.then(function(vastaus) {
  return vastaus.json();
})
.then(function(json){
  // Fetching succeeded and now we can bring info from thig page.
  let m  = json;
  console.log('m',m);
  details = json;

  // Searching for this different attributes and checking if their value is null or if there occured an error.
  try{
    let title = json.location.title;
    if(title === null){
      title="";
    } else {
      main.innerHTML += "<h1>" +title+ "</h1>";
    }

  }catch(error){
    console.log('problem occurd at title');
  }

  try{
    let cordLongitude = json.location.position.longitude;
    if(cordLongitude === null){
      cordLongitude="";
    } else {
      console.log('longitude' , cordLongitude);
    }
    //maintag.innerHTML += "<p>Longitude: " + cordLongitude + "</p>";
  }catch(error){
    console.log('problem occurd at longitude');
  }

  try{
    let cordLatitude = json.location.position.latitude;
    if(cordLatitude === null){
      cordLatitude="";
    } else {
      console.log('latitude' , cordLatitude);
    }
    //maintag.innerHTML += "<p>Latitude: " + cordLatitude+ "</p>" + '';

  }catch(error){
    console.log('problem occurd at latitude');
  }


  try{
    let city = json.location.city;
    if(city === null){
      city="";
    } else {
      more_info.innerHTML += "<p>City: " +city+ "</p>" + '';
    }

  }catch(error){
    console.log('problem occurd at city');
  }

  try{
    let country = json.location.country;
    if(country === null){
      country="";
    } else {
     more_info.innerHTML += "<p>Country: " +country+ "</p>" + '';
    }

  }catch(error){
    console.log('problem occurd at country');
  }

  try{
    let location_name = json.location.name;
    if(location_name === null){
      location_name="";
    } else {
      more_info.innerHTML += "<p>Location name: " +location_name+ "</p>" + '';
    }
  }catch(error){
    console.log('problem occurd at location_name');
  }

  //  Main big Picture
  try{
    let picture = json.urls.raw + '&fit=crop&w=1120';
    let descriptiion = json.description;
    figure.innerHTML =`<img src="${picture}" id="${imageId}" alt="${descriptiion}"></a>`;
   if(descriptiion === null){
     descriptiion="";
   } else {
     figure.innerHTML += "<figcaption>" +descriptiion+ "</figcaption>";
   }
  }catch (error) {
    console.log('problem occurd at picture');
  }
  //button for the pics

  try{
    let pic_small = json.urls.small;
    let pic_medium = json.urls.regular;
    let pic_large = json.urls.full;
    let pic_xsmal = json.urls.thumb;
    let pic_raw = json.urls.raw;
    drop_down_links.innerHTML +=`<a href="${pic_large}" target="_blank">Large (width: 5073 pix)</a><a href="${pic_medium}" target="_blank">Mediuim (width: 1080 pix) </a><a href="${pic_small}" target="_blank">Small (width: 400 pix)</a><a href="${pic_xsmal}" target="_blank">Extra-small(width: 200 pix)</a><a href="${pic_raw}" target="_blank">Raw size</a>`;
  }catch (error) {
    console.log('problem with image button');
  }

  try {
    let name= json.user.first_name;
    let last_name = json.user.last_name;
    if(name === null && last_name === null){
      name="";
      last_name ="";
    } else if( last_name === null) {
      div.innerHTML += "<p id='name' class='user'>" +name+ "</p>";
    } else if(name === null){
      div.innerHTML += "<p id='name' class='user'>"+last_name+"</p>";
    } else {
     div.innerHTML += "<p id='name' class='user'>" +name+ " "+last_name+"</p>";
    }
  }catch (error) {
    console.log('problem occurd last_name');
  }

  try {
    let user_name = json.user.username;
    if(user_name === null){
      user_name="";
    }else {
      div.innerHTML += "<a href='./user.html'><p id='user_name' class='user'>"+user_name+"</p></a>"
    }
  }catch (error) {
    console.log('problem occurd at user_name');
  }

  try{
    let profileImg= json.user.profile_image.large;
    //profile_image.src = profileImg;
    //profile_image.alt ="profile_picture";
    div.innerHTML+=`<img src="${profileImg}" alt="profile_picture" class="profile_img" id="profile_im">`;
  }catch (error) {
    div.innerHTML += "<p id='user_name' class='user'>picture: no picture</p>";
  }

try{
  if (json.location !== null) {
    getGeoLoc(json.location.city, json.location.country, json.location.name).then(function(cord) {


      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(pos) {
            navigoi.classList.remove("hidden");
            navigoi.href = `https://www.google.com/maps/dir/?api=1&origin=${pos.coords.latitude},${pos.coords.longitude}&destination=${cord[0]},${cord[1]}&travelmode=driving`;
            //window.open(`https://www.google.com/maps/dir/?api=1&origin=${pos.coords.latitude},${pos.coords.longitude}&destination=${cord[0]},${cord[1]}&travelmode=driving`);
          })
        } else {
          alert("Did not get permission for current location. Navigation disabled");
      }


      initMap(coordinates(json.location.position.latitude, json.location.position.longitude, cord));
      console.log (cord);

      weather(cord[0],cord[1]);

    });
  }
}catch (error) {
  console.log('no citys available');
}
  // Elements into some parent element.

  main.appendChild(div);
  main.appendChild(figure);
  main.appendChild(drop_down_holder);
  main.appendChild(more_info);
  main.appendChild(map_i);
  main.appendChild(navigoi);
  body.appendChild(main);
  main.classList.add("details");
  //saving to sessionstorage when clickt on username.
  let saveUserName= document.getElementById('user_name');
  saveUserName.addEventListener('click',function(send) {
   sessionStorage.removeItem(imageId);
    sessionStorage.removeItem('user');
    sessionStorage.setItem('user', json.user.username);
    console.log('user',sessionStorage.user);

  });

}) // If there occurs an error during fetching we get an msg.
    .catch(function(error) {
      console.log("fetch error ", error.message);
      // Elements into some parent element.
      main.appendChild(div);
      main.appendChild(figure);
      main.appendChild(drop_down_holder);
      main.appendChild(more_info);
      main.appendChild(map_i);
      body.appendChild(main);
      main.classList.add("details");


    });

