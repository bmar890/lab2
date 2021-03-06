document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=5f7b3f971f10145e95896900de044910";
   fetch(url)
     .then(function(response) {
       return response.json();
     }).then(function(json) {
        let results = "";
        results += '<h2 class="weatherLocation">Weather in ' + json.name + "</h2>";
        console.log(json)
        for (let i=0; i < json.weather.length; i++) {
	         results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
         }
         results += '<h2>' + json.main.temp + " &deg;F</h2>"
         results += "<p>Feels like "
         results += json.main.feels_like;
         results += "</p>"

         results += "<p>Humidity: "
         results += json.main.humidity
         results += "%</p>"

         results += "<p>"
         for (let i=0; i < json.weather.length; i++) {
	          results += json.weather[i].description
	           if (i !== json.weather.length - 1)
	            results += ", "
        }
        results += "</p>";

        results += "<p>Air Pressure: "
        results += json.main.pressure;
        results += " millibars</p>"
        document.getElementById("weatherResults").innerHTML = results;
     });
     const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=5f7b3f971f10145e95896900de044910";
     fetch(url2)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        let forecast = "<h2>5-Day Forecast</h2>";
       for (let i=0; i < json.list.length; i++) {
         forecast += "<h3>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h3>";
         forecast += "<p>Temperature: " + json.list[i].main.temp + "</p>";
         forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
         forecast += "<br/><br/>"
       }
       document.getElementById("forecastResults").innerHTML = forecast;
      });
});
