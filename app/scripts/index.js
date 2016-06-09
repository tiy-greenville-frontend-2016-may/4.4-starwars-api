var $ = require('jquery');
var handlebars = require('handlebars');

var githubtoken = require('./githubapikey.js');

if(githubtoken !== undefined){
  $.ajaxSetup({
    headers: {
      'Authorization': 'token' + githubtoken
    }
  });
}

var baseUrl = 'http://swapi.co/api/';
var planetListItemTemplate = $('#planet-list-item-template').html();
var template = handlebars.compile(planetListItemTemplate);

$('.js-planets-button').on('click', function(event){
  event.preventDefault();

  getPlanets();
});

function getPlanets(){
  var planetsUrl = baseUrl + 'planets/';

  $.ajax(planetsUrl).done(function(planetList){
    planetList.results.forEach(function(planet){
      displayPlanet(planet);
    });
  });
}

function displayPlanet(planet){
  var html = template(planet)
  $('.js-planet-list').append(html);

  $.ajax(planet.url).done(function(planetDetails){
    $('#' + planetDetails.name).append('<span> :: ' + planetDetails.climate + '</span>');
  });
}
