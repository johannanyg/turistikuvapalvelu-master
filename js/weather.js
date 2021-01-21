const weatherHeader = document.createElement('h4');
const weather_pack = document.createElement('div');
const weather_ul = document.createElement('ul');
weather_ul.className= 'wheater_list';
weather_pack.className = 'weather';

// Time settings
const d = new Date();
let day = underten(d.getDate());
let weekdays =["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Fetching the Weather api
function weather(lat,lon) {
  let address= `http://api.openweathermap.org/data/2.5/forecast?lat=${Math.round(lat)}&lon=${Math.round(lon)}&APPID=259ea2adef52be3484a5a772b77f10a1`;
  return fetch(address)
  .then(function(resp) {
    return resp.json();
  })
  .then(function(json) {
    let con = json;
    console.log('contentW', con);

    for( let i=0; i<37; i++){
      try{
        // Date
        let contentList = json.list;
        let date = contentList[i].dt_txt;
        if (date == null){
          date='';
        }
        //weather description
        let weatherlist = contentList[i].weather;
        let description = weatherlist[0].description;
        if (description == null){
          description='';
        }
        // Taking temperature (kelvin) and converting it to celcius.
        let tempKelvin = contentList[i].main.temp;
        let tempCelcius = tempKelvin-273.15;
        let roundCelcius = Math.round(tempCelcius);
        if (roundCelcius == null){
          roundCelcius='';
        }
        //icons
        let icon =weatherlist[0].icon;
        let iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
        print_to_page(date,iconurl,roundCelcius,description,contentList[0].dt_txt);

      }catch (error) {
        console.log('problem with date');
        weather_ul.innerHTML += ``
      }

    }
    let weatherlocation = json.city.name;
    // Header for the wearher forcast thing.
    weatherHeader.innerHTML=`Weather in ${weatherlocation}`;

    weather_pack.appendChild(weatherHeader);
    weather_pack.appendChild(weather_ul);
    footer.appendChild(weather_pack);
    body.appendChild(footer);

  })
  .catch(function(error) {
    console.log("fetch error ", error.message);
  });
}

//checking that the time values allways has two digits
function underten(i) {
  if (i< 10){
    i = "0" + i;
  }
  return i;
}
// function to compare the dates from api with javascript dates and from that getting the weekdays
function dateIndex(date) {
  // comparing the date with the apis date
  let y = date.charAt(0)+date.charAt(1)+date.charAt(2)+date.charAt(3);
  let mth = date.charAt(5)+date.charAt(6);
  let num = date.charAt(8)+date.charAt(9);

  // putting it to the date what converts it to weekdays.
  let together = y+','+mth+','+num;
  const mydate = new Date(together);
  console.log('mydate',mydate);
  let week = weekdays[mydate.getDay()];
  return week;
}
// printing the info to html
function print_to_page(date,iconurl,roundCelcius,description,content){
  if(date.includes('12:') && !date.includes('-'+day+' ')){
    console.log('date got here', date);
    weather_ul.innerHTML += `<li class="page"><h5 class="date">${dateIndex(date)}</h5><p class="description">${description}</p><img src="${iconurl}" alt='' class="icon"><p class="temp">${roundCelcius}°C</p></li>`;
  } else if (date.includes('-'+day+' ') && date.includes(content)) {
    console.log('date got here1', date);
    weather_ul.innerHTML += `<li class="page"><h5 class="date">${dateIndex(date)}</h5><p class="description">${description}</p><img src="${iconurl}" alt='' class="icon"><p class="temp">${roundCelcius}°C</p></li>`;
  }
}