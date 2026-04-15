// wait for the page to fully load before doing anything
document.addEventListener("DOMContentLoaded", function () {
  const stateInput = document.getElementById("state-input");
  const fetchButton = document.getElementById("fetch-alerts");
  const alertsDisplay = document.getElementById("alerts-display");
  const errorMessage = document.getElementById("error-message");

  fetchButton.addEventListener("click", async function () {
    const state = stateInput.value.trim();
    stateInput.value = "";

    try {
      const response = await fetch("https://api.weather.gov/alerts/active?area=" + state);
      const data = await response.json();

      // clear any old error and show the new results
      errorMessage.textContent = "";
      errorMessage.classList.add("hidden");

      alertsDisplay.innerHTML = "<p>" + data.title + ": " + data.features.length + "</p>";

      data.features.forEach(function (alert) {
        const p = document.createElement("p");
        p.textContent = alert.properties.headline;
        alertsDisplay.appendChild(p);
      });

    } catch (err) {
      errorMessage.textContent = err.message;
      errorMessage.classList.remove("hidden");
    }
  });
});
