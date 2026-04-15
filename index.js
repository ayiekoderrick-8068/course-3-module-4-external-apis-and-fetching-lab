document.addEventListener("DOMContentLoaded", function() {
  var stateInput = document.getElementById("state-input");
  var fetchButton = document.getElementById("fetch-alerts");
  var alertsDisplay = document.getElementById("alerts-display");
  var errorMessage = document.getElementById("error-message");

  fetchButton.addEventListener("click", function() {
    var state = stateInput.value.trim();
    stateInput.value = "";

    fetch("https://api.weather.gov/alerts/active?area=" + state)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        errorMessage.textContent = "";
        errorMessage.classList.add("hidden");

        alertsDisplay.innerHTML = "<p>" + data.title + ": " + data.features.length + "</p>";

        data.features.forEach(function(alert) {
          var p = document.createElement("p");
          p.textContent = alert.properties.headline;
          alertsDisplay.appendChild(p);
        });
      })
      .catch(function(err) {
        errorMessage.textContent = err.message;
        errorMessage.classList.remove("hidden");
      });
  });
});
