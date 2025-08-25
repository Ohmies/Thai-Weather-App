class WeatherApp {
  constructor() {
    this.currentLocation = null;
    this.provinces = [];
    this.init();
  }

  async init() {
    await this.loadProvinces();
    this.setupEventListeners();
    await this.loadDefaultWeather();
    this.hideLoading();
    this.updateLastUpdateTime();
  }

  async loadProvinces() {
    try {
      const response = await fetch("/api/weather/provinces");
      this.provinces = await response.json();
      this.populateProvinceSelect();
    } catch (error) {
      console.error("Error loading provinces:", error);
      this.showError("ไม่สามารถโหลดข้อมูลจังหวัดได้");
    }
  }

  populateProvinceSelect() {
    const select = document.getElementById("provinceSelect");
    select.innerHTML = '<option value="">เลือกจังหวัด...</option>';

    this.provinces.forEach((province) => {
      const option = document.createElement("option");
      option.value = province.name;
      option.textContent = province.name;
      option.dataset.lat = province.lat;
      option.dataset.lon = province.lon;
      select.appendChild(option);
    });
  }

  setupEventListeners() {
    // Search button
    document.getElementById("searchBtn").addEventListener("click", () => {
      this.searchWeather();
    });

    // Province select change
    document
      .getElementById("provinceSelect")
      .addEventListener("change", (e) => {
        if (e.target.value) {
          this.searchWeather();
        }
      });

    // Refresh button
    document.getElementById("refreshBtn").addEventListener("click", () => {
      this.refreshCurrentWeather();
    });

    // Location button
    document.getElementById("locationBtn").addEventListener("click", () => {
      this.getCurrentLocation();
    });

    // Enter key support for search
    document
      .getElementById("provinceSelect")
      .addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.searchWeather();
        }
      });
  }

  async loadDefaultWeather() {
    // Load Bangkok weather as default
    await this.getWeather("กรุงเทพมหานคร");
  }

  async searchWeather() {
    const select = document.getElementById("provinceSelect");
    const selectedProvince = select.value;

    if (!selectedProvince) {
      this.showError("กรุณาเลือกจังหวัด");
      return;
    }

    await this.getWeather(selectedProvince);
  }

  async getWeather(city) {
    try {
      this.showLoading();

      // Get current weather
      const weatherResponse = await fetch(
        `/api/weather/current?city=${encodeURIComponent(city)}`
      );
      if (!weatherResponse.ok) {
        throw new Error("ไม่สามารถดึงข้อมูลสภาพอากาศได้");
      }
      const weatherData = await weatherResponse.json();

      // Get forecast
      const forecastResponse = await fetch(
        `/api/weather/forecast?city=${encodeURIComponent(city)}`
      );
      if (!forecastResponse.ok) {
        throw new Error("ไม่สามารถดึงข้อมูลพยากรณ์อากาศได้");
      }
      const forecastData = await forecastResponse.json();

      this.displayCurrentWeather(weatherData);
      this.displayForecast(forecastData);
      this.currentLocation = city;
      this.updateLastUpdateTime();
      this.hideError();
    } catch (error) {
      console.error("Error getting weather:", error);
      this.showError(error.message || "เกิดข้อผิดพลาดในการดึงข้อมูล");
    } finally {
      this.hideLoading();
    }
  }

  async getWeatherByCoordinates(lat, lon) {
    try {
      this.showLoading();

      // Get current weather
      const weatherResponse = await fetch(
        `/api/weather/current?lat=${lat}&lon=${lon}`
      );
      if (!weatherResponse.ok) {
        throw new Error("ไม่สามารถดึงข้อมูลสภาพอากาศได้");
      }
      const weatherData = await weatherResponse.json();

      // Get forecast
      const forecastResponse = await fetch(
        `/api/weather/forecast?lat=${lat}&lon=${lon}`
      );
      if (!forecastResponse.ok) {
        throw new Error("ไม่สามารถดึงข้อมูลพยากรณ์อากาศได้");
      }
      const forecastData = await forecastResponse.json();

      this.displayCurrentWeather(weatherData);
      this.displayForecast(forecastData);
      this.currentLocation = "ตำแหน่งปัจจุบัน";
      this.updateLastUpdateTime();
      this.hideError();
    } catch (error) {
      console.error("Error getting weather by coordinates:", error);
      this.showError(error.message || "เกิดข้อผิดพลาดในการดึงข้อมูล");
    } finally {
      this.hideLoading();
    }
  }

  displayCurrentWeather(data) {
    // Update location
    document.getElementById("currentLocation").textContent =
      data.location || "ไม่ทราบตำแหน่ง";

    // Update time
    document.getElementById("currentTime").textContent =
      new Date().toLocaleString("th-TH", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

    // Update weather icon
    const iconElement = document.getElementById("weatherIcon");
    const iconCode = data.icon;
    iconElement.className = this.getWeatherIconClass(iconCode);

    // Update temperature and description
    document.getElementById(
      "temperature"
    ).textContent = `${data.temperature}°C`;
    document.getElementById("weatherDescription").textContent =
      data.description;
    document.getElementById("feelsLike").textContent = data.feelsLike;

    // Update weather details
    document.getElementById("visibility").textContent = data.visibility
      ? `${data.visibility} กม.`
      : "ไม่ทราบ";
    document.getElementById("humidity").textContent = `${data.humidity}%`;
    document.getElementById("pressure").textContent = `${data.pressure} hPa`;
    document.getElementById(
      "windSpeed"
    ).textContent = `${data.windSpeed} ม./วินาที`;
    document.getElementById("sunrise").textContent = data.sunrise;
    document.getElementById("sunset").textContent = data.sunset;

    // Show current weather section
    document.getElementById("currentWeather").classList.remove("hidden");
  }

  displayForecast(data) {
    const container = document.getElementById("forecastContainer");
    container.innerHTML = "";

    data.forecasts.forEach((forecast) => {
      const forecastCard = document.createElement("div");
      forecastCard.className = "forecast-card";

      forecastCard.innerHTML = `
                <div class="text-white text-sm font-medium mb-2">${
                  forecast.date
                }</div>
                <div class="weather-icon mb-3">
                    <i class="${this.getWeatherIconClass(
                      forecast.icon
                    )} text-3xl text-yellow-300"></i>
                </div>
                <div class="text-white text-lg font-semibold mb-1">${
                  forecast.temperature.max
                }°</div>
                <div class="text-white text-opacity-70 text-sm mb-2">${
                  forecast.temperature.min
                }°</div>
                <div class="text-white text-opacity-80 text-xs">${
                  forecast.description
                }</div>
                <div class="text-white text-opacity-60 text-xs mt-1">
                    <i class="fas fa-droplet mr-1"></i>${forecast.humidity}%
                </div>
            `;

      container.appendChild(forecastCard);
    });

    // Show forecast section
    document.getElementById("forecastSection").classList.remove("hidden");
  }

  getWeatherIconClass(iconCode) {
    const iconMap = {
      "01d": "fas fa-sun", // clear sky day
      "01n": "fas fa-moon", // clear sky night
      "02d": "fas fa-cloud-sun", // few clouds day
      "02n": "fas fa-cloud-moon", // few clouds night
      "03d": "fas fa-cloud", // scattered clouds
      "03n": "fas fa-cloud",
      "04d": "fas fa-clouds", // broken clouds
      "04n": "fas fa-clouds",
      "09d": "fas fa-cloud-rain", // shower rain
      "09n": "fas fa-cloud-rain",
      "10d": "fas fa-cloud-sun-rain", // rain day
      "10n": "fas fa-cloud-moon-rain", // rain night
      "11d": "fas fa-bolt", // thunderstorm
      "11n": "fas fa-bolt",
      "13d": "fas fa-snowflake", // snow
      "13n": "fas fa-snowflake",
      "50d": "fas fa-smog", // mist
      "50n": "fas fa-smog",
    };

    return iconMap[iconCode] || "fas fa-question";
  }

  async getCurrentLocation() {
    if (!navigator.geolocation) {
      this.showError("เบราว์เซอร์ไม่รองรับการหาตำแหน่ง");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await this.getWeatherByCoordinates(latitude, longitude);
      },
      (error) => {
        console.error("Geolocation error:", error);
        this.showError("ไม่สามารถหาตำแหน่งได้ กรุณาอนุญาตการเข้าถึงตำแหน่ง");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }

  async refreshCurrentWeather() {
    if (this.currentLocation) {
      await this.getWeather(this.currentLocation);
    } else {
      await this.loadDefaultWeather();
    }
  }

  showLoading() {
    document.getElementById("loading").classList.remove("hidden");
  }

  hideLoading() {
    document.getElementById("loading").classList.add("hidden");
  }

  showError(message) {
    document.getElementById("errorText").textContent = message;
    document.getElementById("errorMessage").classList.remove("hidden");

    // Auto hide error after 5 seconds
    setTimeout(() => {
      this.hideError();
    }, 5000);
  }

  hideError() {
    document.getElementById("errorMessage").classList.add("hidden");
  }

  updateLastUpdateTime() {
    const now = new Date().toLocaleString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    document.getElementById("lastUpdate").textContent = now;
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new WeatherApp();
});
