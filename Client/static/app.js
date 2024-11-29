function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for (var i = 0; i < uiBathrooms.length; i++) {
      if (uiBathrooms[i].checked) {
          return parseInt(uiBathrooms[i].value); // Assuming radio buttons have meaningful values
      }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for (var i = 0; i < uiBHK.length; i++) {
      if (uiBHK[i].checked) {
          return parseInt(uiBHK[i].value); // Assuming radio buttons have meaningful values
      }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");

  var url = `${window.location.origin}/predict_home_price`;

  $.post(url, {
      total_sqft: parseFloat(sqft.value),
      bhk: bhk,
      bath: bathrooms,
      location: location.value
  })
  .done(function (data) {
      console.log(data.estimated_price);
      estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
  })
  .fail(function (xhr, status, error) {
      console.error("Error:", error);
      alert("Something went wrong! Please try again later.");
  });
}

function onPageLoad() {
  console.log("document loaded");
  var url = `${window.location.origin}/get_location_names`;

  $.get(url, function (data, status) {
      console.log("got response for get_location_names request");
      if (data) {
          var locations = data.locations;
          var uiLocations = document.getElementById("uiLocations");
          $('#uiLocations').empty();
          for (var i = 0; i < locations.length; i++) {
              var opt = new Option(locations[i]);
              $('#uiLocations').append(opt);
          }
      }
  }).fail(function (xhr, status, error) {
      console.error("Error loading locations:", error);
      alert("Failed to load locations. Please try again later.");
  });
}

// Initialize the page
$(document).ready(onPageLoad);
