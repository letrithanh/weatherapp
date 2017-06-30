/**
 * Created by ltthanh on 6/20/17.
 */
var apiKeyWeahter = "593beecc69c07f226e7483b56508589a";
var cityFld = "London";
var countryFld = "UK";
var urlWeatherJSON = "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityFld + "," + countryFld + "&APPID=" +
    apiKeyWeahter;

var degreeCel = "&#x2103;";
var degreeFah = "&#x2109;";

var temp = 30;

function getWeather()
{
    var inputText = document.getElementById("input-weather").value;
    var temp = inputText.split(", ");

    if(inputText.length <= 0 || temp.length !== 2)
    {
        alert("Can't find your location!");
    }
    inputText = inputText.split(", ");

    cityFld = inputText[0];
    countryFld = inputText[1];

    urlWeatherJSON = "http://api.openweathermap.org/data/2.5/weather?q=" +
        cityFld + "," + countryFld + "&APPID=" +
        apiKeyWeahter;

    $.getJSON(urlWeatherJSON, function(data)
    {
        temp = (data.main.temp * 1.8) - 459.67;
        var tempP;
        if(document.getElementById("checkboxCel").checked)
        {
            temp = Math.round(changeToC(temp), 1);
            tempP = "<p id='tempP'>"+ temp + degreeCel+"</p>"
        }
        else
        {
            temp = Math.round(temp, 1);
            tempP = "<p id='tempP'>"+ temp + degreeFah+"</p>";
        }

        var imageBackground = "./image/" + data.weather[0].icon + ".jpeg";

        $(".bg").css("background-image", "url("+imageBackground+")");

        document.getElementById("temperature").innerHTML =
            "<img src='http://openweathermap.org/img/w/"+ data.weather[0].icon +
            ".png'/>" + tempP;

        document.getElementById("where").innerHTML =
            "<p>"+ cityFld + ", " + countryFld +"</p>";

        document.getElementById("describe").innerHTML =
            "<p>"+ data.weather[0].description +"</p>";

        document.getElementById("wind").innerHTML =
            "<p>"+ data.wind.speed +"m/s</p>";
    });
}

function changeToC(num)
{
    return (num - 32)/1.8;
}

function defaultWeather()
{
    var inputText = document.getElementById("input-weather").value;

    cityFld = "Can Tho";
    countryFld = "VN";

    urlWeatherJSON = "http://api.openweathermap.org/data/2.5/weather?q=" +
        cityFld + "," + countryFld + "&APPID=" +
        apiKeyWeahter;

    $.getJSON(urlWeatherJSON, function(data)
    {
        temp = (data.main.temp * 1.8) - 459.67;
        var tempP;
        if(document.getElementById("checkboxCel").checked)
        {
            temp = Math.round(changeToC(temp), 1);
            tempP = "<p id='tempP'>"+ temp + degreeCel+"</p>"
        }
        else
        {
            temp = Math.round(temp, 1);
            tempP = "<p id='tempP'>"+ temp + degreeFah+"</p>";
        }

        document.getElementById("temperature").innerHTML =
            "<img src='http://openweathermap.org/img/w/"+ data.weather[0].icon +
            ".png'/>" + tempP;

        document.getElementById("where").innerHTML =
            "<p>"+ cityFld + ", " + countryFld +"</p>";

        document.getElementById("describe").innerHTML =
            "<p>"+ data.weather[0].description +"</p>";

        document.getElementById("wind").innerHTML =
            "<p>"+ data.wind.speed +"m/s</p>";
    });
}

function clickCel()
{
    var tempP;
    var temperature = temp;
    if(document.getElementById("checkboxCel").checked)
    {
        temperature = Math.round(changeToC(temp), 1);
        tempP = "<p id='tempP'>"+ temperature + degreeCel+"</p>"
    }
    else
    {
        temperature = Math.round(temp, 1);
        tempP = "<p id='tempP'>"+ temperature + degreeFah+"</p>";
    }

    document.getElementById("tempP").innerHTML = tempP;
}