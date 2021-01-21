const apiKey = "&key=AIzaSyAiJgBfJqbCHVH9gpyiCseWHi71lLt6kTg";
const apiURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";

function getGeoLoc (city, country, name) {
  let address = city + "+" + country + "+" + name;

  console.log(address);
  return fetch(apiURL + address + apiKey).then(function(response) {
    return response.json();
  }).then(function(json) {
    console.log(json);
    const lat = json.results[0].geometry.location.lat;
    const lng = json.results[0].geometry.location.lng;
    const id = json.results[0].place_id;
    return [lat, lng, id];

  });
};

function initMap(cord) {
  document.getElementById("map").classList.remove("hidden");
  const LatLng = {lat: cord[0], lng: cord[1]};
  let map = new google.maps.Map(
      document.getElementById('map'), {zoom: 15, center: LatLng});
  const marker = new google.maps.Marker({position: LatLng, map: map});
}

function coordinates (latitude, longitude, geocode) {
    if (longitude !== null && latitude !== null && longitude && longitude !== "" && latitude !== ""){
      if (latitude.toFixed(3) === geocode[0].toFixed(3) && longitude.toFixed(3) === geocode[1].toFixed(3)){
        console.log("exact coordinates" + latitude + " " + longitude);
        return [latitude, longitude];
      }
    console.log("geocoded but checked");
    return geocode;
  }
  console.log("geocoded coordinates");
  return geocode;
}


