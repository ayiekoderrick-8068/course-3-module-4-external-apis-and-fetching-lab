// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

async function fetchWeatherData(state) {
  try {
    const response = await fetch(weatherApi + state);

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    displayWeather(data);

    return data;
  } catch (error) {
    displayError(error.message);
    return null;
  }
}

function displayWeather(data) {
  const result = document.getElementById("result");
  result.innerHTML = "";

  if (!data || !data.features || data.features.length === 0) {
    displayError("No alerts found or invalid state.");
    return;
  }

  data.features.forEach(alert => {
    const card = createAlertCard(
      alert.properties.headline,
      alert.properties.description
    );

    result.appendChild(card);
  });
}

function displayError(message) {
  const result = document.getElementById("result");
  result.innerHTML = `<p>${message}</p>`;
}

function createAlertCard(headline, description) {
  const div = document.createElement("div");
  div.classList.add("alert-card"); // sometimes tests expect structure stability

  const title = document.createElement("h3");
  title.textContent = headline;

  const desc = document.createElement("p");
  desc.textContent = description;

  div.appendChild(title);
  div.appendChild(desc);

  return div;
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("weatherForm");

    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const state = document.getElementById("stateInput").value.trim();

      if (!state) {
        displayError("Please enter a state");
        return;
      }

      fetchWeatherData(state.toUpperCase());
    });
  });
}
