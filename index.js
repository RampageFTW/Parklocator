'use strict';

// put your own value below!
const api_key = 'odFc4yhVfVwzBbZffLGNC59T6ZYljEjzYLKaFZsS'; 

function getParks(query, maxResults=10) {
  let queryOutput = "api_key=" + api_key + "&maxResults=" + maxResults;
  console.log(query);
  //if there are no commas add one state code
  if (query.indexOf(",") < 0) {
    queryOutput += "&stateCode=" + $.trim(query);
  }
  //if there are commas.. 
  else {
    //.. create an array of the states 
    let querySplit = query.split(",");
    //for every element in the array..
    for (let i = 0; i < querySplit.length; i++) {
      //.. verify if the state name is not empty..
      if ($.trim(querySplit[i]) != "") {
        //.. add multiple states to the state code
        queryOutput += "&stateCode=" + $.trim(querySplit[i]);
      }
    }
  }
  const searchURL = `https://developer.nps.gov/api/v1/parks`;
  const url = searchURL + '?' + queryOutput;

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