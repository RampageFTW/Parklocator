'use strict';

// put your own value below!
const api_key = 'odFc4yhVfVwzBbZffLGNC59T6ZYljEjzYLKaFZsS'; 


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}


function getParks(query, maxResults=10) {
  const searchURL = `https://developer.nps.gov/api/v1/parks`;
  const params = {
    api_key: api_key,
    stateCode: query,
    maxResults
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

//Render GET Request Results to the Dom
function displayResults(jsonInput) {
  console.log(jsonInput.data);
  let htmlOutput = '';
  for(let i = 0; i < jsonInput.data.length; i++) {
    console.log(jsonInput.data[i].name);
    console.log(jsonInput.data[i].url);
    console.log(jsonInput.data[i].description);
    htmlOutput += `<li><a href="${jsonInput.data[i].url}">${jsonInput.data[i].name}</a><br>${jsonInput.data[i].description} <br><br> <span>Address</span>${jsonInput.data[i].directionsInfo}</li>`;
  }
  $('#results').removeClass('hidden')
  $("#results-list").html(htmlOutput)
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchState = $("#js-state").val();
    const maxResults = $('#js-max-results').val();
    getParks(searchState, maxResults);
  });
}

$(watchForm);