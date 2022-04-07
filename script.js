$(document).ready(function() {
    $("#form-sub").submit(function(event) { 
        performSearch(event); });
  });

  function performSearch(event) {
    var request;
    event.preventDefault();
    $("#city-name").text("Searching ...");
    $("#city-temp").text("");
    $("img").attr('src', "");
    $("#city-weather").text("");
  
    // Send the request
    // http://api.weatherapi.com/v1/current.json?key=7638bd1e0ef94e4ebbf131428220704&q=10001
    // http://api.weatherapi.com/v1/current.json
    request = $.ajax({
        url: 'http://api.weatherapi.com/v1/current.json',
        type: "GET",
        data: { q: $("#city").val(), 
                key: '7638bd1e0ef94e4ebbf131428220704', // put your appid
                units: 'metric'}
    });
  
    // Callback handler for success
    request.done(function (response){
        formatSearchResults(response);
    });
    
    // Callback handler for failure
    request.fail(function (){
        $("#city-name").text("Please try again, incorrect input!");
        $("#city-temp").text("");
        $("img").attr('src', "");
        $("#city-weather").text("");
    });
  
  }

 function formatSearchResults(jsonObject) 
  {
  
    console.log('jsonObject.current.location.name : ', jsonObject.location.name)
    var city_name = jsonObject.location.name;
    city_name = city_name + ", " + jsonObject.location.country;
    var city_weather = jsonObject.current.condition.text;
    var city_temp = jsonObject.current.temp_c;
    var imgurl  = `https:${jsonObject.current.condition.icon}`;

    console.log("jsonObject.current.condition.icon : ", jsonObject.current.condition.icon)

    $("img").attr('src', imgurl);
    $("#city-name").text(city_name);
    $("#city-weather").text(city_weather);
    $("#city-temp").text(city_temp+" Celsius");  
  }

  document.addEventListener('DOMContentLoaded', () => {

    const selectDrop = document.querySelector('#countries');
    // const selectDrop = document.getElementById('countries');
  
  
    fetch('https://restcountries.com/v3.1/all').then(res => {
      return res.json();
    }).then(data => {
      let output = "";
      data.forEach(country => {
        output += `
        
        <option value="${country.name.common}">${country.name.common}</option>`;
      })
  
      selectDrop.innerHTML = output;
    }).catch(err => {
      console.log(err);
    })
  
  
  });

  $(document).ready(function () {
    // Send Search Text to the server
    $("#search").keyup(function () {
      
    });

    let searchText = $(this).val();
      if (searchText != "") {
        
      } else {
        $("#show-list").html("");
      }

      $.ajax({
        url: "action.php",
        method: "post",
        data: {
          query: searchText,
        },
        success: function (response) {
          $("#show-list").html(response);
        },
      });
    // Set searched text in input field on click of search button
    $(document).on("click", "a", function () {
      $("#search").val($(this).text());
      $("#show-list").html("");
    });
  });