const express = require("express");
const axios = require("axios");
const router = express.Router();

// Mock weather data สำหรับการทดสอบ (ไม่ต้องใช้ API key)
const mockWeatherData = {
  กรุงเทพมหานคร: {
    temp: 32,
    humidity: 75,
    description: "เมฆบางส่วน",
    icon: "02d",
    wind: 5.2,
    pressure: 1013,
    visibility: 10,
  },
  เชียงใหม่: {
    temp: 28,
    humidity: 68,
    description: "อากาศแจ่มใส",
    icon: "01d",
    wind: 3.1,
    pressure: 1015,
    visibility: 15,
  },
  เชียงราย: {
    temp: 26,
    humidity: 72,
    description: "เมฆมาก",
    icon: "04d",
    wind: 2.8,
    pressure: 1016,
    visibility: 12,
  },
  ภูเก็ต: {
    temp: 30,
    humidity: 82,
    description: "ฝนเล็กน้อย",
    icon: "10d",
    wind: 6.5,
    pressure: 1010,
    visibility: 8,
  },
  พัทยา: {
    temp: 31,
    humidity: 78,
    description: "เมฆบางส่วน",
    icon: "02d",
    wind: 4.3,
    pressure: 1012,
    visibility: 9,
  },
  หัวหิน: {
    temp: 29,
    humidity: 76,
    description: "อากาศแจ่มใส",
    icon: "01d",
    wind: 3.7,
    pressure: 1014,
    visibility: 12,
  },
  เขาใหญ่: {
    temp: 24,
    humidity: 85,
    description: "เมฆมาก",
    icon: "04d",
    wind: 2.1,
    pressure: 1018,
    visibility: 7,
  },
  อยุธยา: {
    temp: 33,
    humidity: 71,
    description: "อากาศร้อน",
    icon: "01d",
    wind: 4.8,
    pressure: 1011,
    visibility: 11,
  },
  นครราชสีมา: {
    temp: 30,
    humidity: 69,
    description: "เมฆบางส่วน",
    icon: "02d",
    wind: 3.9,
    pressure: 1013,
    visibility: 10,
  },
  ขอนแก่น: {
    temp: 31,
    humidity: 73,
    description: "อากาศแจ่มใส",
    icon: "01d",
    wind: 4.1,
    pressure: 1012,
    visibility: 13,
  },
};

// Flag สำหรับเปิด/ปิดการใช้ Mock Data
const USE_MOCK_DATA = false;

// Thai provinces data for location selection
const thaiProvinces = [
  { name: "กรุงเทพมหานคร", en: "Bangkok", lat: 13.7563, lon: 100.5018 },
  { name: "เชียงใหม่", en: "Chiang Mai", lat: 18.7883, lon: 98.9853 },
  { name: "เชียงราย", en: "Chiang Rai", lat: 19.9105, lon: 99.8406 },
  { name: "ภูเก็ต", en: "Phuket", lat: 7.8804, lon: 98.3923 },
  { name: "พัทยา", en: "Pattaya", lat: 12.9236, lon: 100.8825 },
  { name: "หัวหิน", en: "Hua Hin", lat: 12.5706, lon: 99.9576 },
  { name: "เขาใหญ่", en: "Khao Yai", lat: 14.4297, lon: 101.3717 },
  { name: "อยุธยา", en: "Ayutthaya", lat: 14.3692, lon: 100.5877 },
  { name: "นครราชสีมา", en: "Nakhon Ratchasima", lat: 14.9799, lon: 102.0977 },
  { name: "ขอนแก่น", en: "Khon Kaen", lat: 16.4419, lon: 102.8359 },
];

// Get current weather by city name or coordinates
router.get("/current", async (req, res) => {
  try {
    const { city, lat, lon } = req.query;

    let weatherData;

    if (city) {
      // Find city in Thai provinces
      const province = thaiProvinces.find(
        (p) =>
          p.name.includes(city) ||
          p.en.toLowerCase().includes(city.toLowerCase())
      );

      if (province) {
        weatherData = await getWeatherByCoordinates(province.lat, province.lon);
        weatherData.location = province.name;
      } else {
        return res.status(404).json({ error: "ไม่พบข้อมูลจังหวัดที่ค้นหา" });
      }
    } else if (lat && lon) {
      weatherData = await getWeatherByCoordinates(
        parseFloat(lat),
        parseFloat(lon)
      );
    } else {
      // Default to Bangkok
      const bangkok = thaiProvinces[0];
      weatherData = await getWeatherByCoordinates(bangkok.lat, bangkok.lon);
      weatherData.location = bangkok.name;
    }

    res.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({
      error: "ไม่สามารถดึงข้อมูลสภาพอากาศได้",
      details: error.message,
    });
  }
});

// Get weather forecast
router.get("/forecast", async (req, res) => {
  try {
    const { city, lat, lon } = req.query;

    let coordinates;

    if (city) {
      const province = thaiProvinces.find(
        (p) =>
          p.name.includes(city) ||
          p.en.toLowerCase().includes(city.toLowerCase())
      );

      if (province) {
        coordinates = {
          lat: province.lat,
          lon: province.lon,
          name: province.name,
        };
      } else {
        return res.status(404).json({ error: "ไม่พบข้อมูลจังหวัดที่ค้นหา" });
      }
    } else if (lat && lon) {
      coordinates = {
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        name: "ตำแหน่งที่เลือก",
      };
    } else {
      const bangkok = thaiProvinces[0];
      coordinates = { lat: bangkok.lat, lon: bangkok.lon, name: bangkok.name };
    }

    const forecastData = await getForecastByCoordinates(
      coordinates.lat,
      coordinates.lon
    );
    forecastData.location = coordinates.name;

    res.json(forecastData);
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    res.status(500).json({
      error: "ไม่สามารถดึงข้อมูลพยากรณ์อากาศได้",
      details: error.message,
    });
  }
});

// Get list of Thai provinces
router.get("/provinces", (req, res) => {
  res.json(thaiProvinces);
});

// Helper function to get weather by coordinates
async function getWeatherByCoordinates(lat, lon) {
  // ใช้ Mock Data หากเปิดใช้งาน
  if (USE_MOCK_DATA) {
    return getMockWeatherData(lat, lon);
  }

  // ใช้ OpenWeatherMap API
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error("OpenWeatherMap API key ไม่ได้ถูกตั้งค่า");
  }

  const url = `${process.env.OPENWEATHER_API_URL}/weather`;
  const params = {
    lat: lat,
    lon: lon,
    appid: apiKey,
    units: "metric",
    lang: "th",
  };

  const response = await axios.get(url, { params });
  const data = response.data;

  return {
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    windSpeed: data.wind.speed,
    windDirection: data.wind.deg,
    visibility: data.visibility ? data.visibility / 1000 : null,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    main: data.weather[0].main,
    coordinates: { lat, lon },
    sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString("th-TH"),
    sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString("th-TH"),
    timestamp: new Date().toISOString(),
  };
}

// Helper function สำหรับ Mock Weather Data
function getMockWeatherData(lat, lon) {
  // หาจังหวัดที่ใกล้เคียงที่สุดจากพิกัด
  let closestProvince = thaiProvinces[0]; // default เป็นกรุงเทพ
  let minDistance = Infinity;

  thaiProvinces.forEach((province) => {
    const distance = Math.sqrt(
      Math.pow(lat - province.lat, 2) + Math.pow(lon - province.lon, 2)
    );
    if (distance < minDistance) {
      minDistance = distance;
      closestProvince = province;
    }
  });

  const mockData = mockWeatherData[closestProvince.name];

  // สร้างข้อมูลสภาพอากาศจำลอง
  const currentTime = new Date();
  const sunrise = new Date(currentTime);
  sunrise.setHours(6, 30, 0); // 6:30 AM
  const sunset = new Date(currentTime);
  sunset.setHours(18, 45, 0); // 6:45 PM

  return {
    temperature: mockData.temp,
    feelsLike: mockData.temp + (Math.random() * 4 - 2), // ±2 องศา
    humidity: mockData.humidity,
    pressure: mockData.pressure,
    windSpeed: mockData.wind,
    windDirection: Math.floor(Math.random() * 360),
    visibility: mockData.visibility,
    description: mockData.description,
    icon: mockData.icon,
    main: getMainWeatherFromIcon(mockData.icon),
    coordinates: { lat, lon },
    sunrise: sunrise.toLocaleTimeString("th-TH"),
    sunset: sunset.toLocaleTimeString("th-TH"),
    timestamp: new Date().toISOString(),
  };
}

// Helper function เพื่อแปลง icon เป็น main weather
function getMainWeatherFromIcon(icon) {
  const iconMap = {
    "01d": "Clear",
    "01n": "Clear",
    "02d": "Clouds",
    "02n": "Clouds",
    "03d": "Clouds",
    "03n": "Clouds",
    "04d": "Clouds",
    "04n": "Clouds",
    "09d": "Rain",
    "09n": "Rain",
    "10d": "Rain",
    "10n": "Rain",
    "11d": "Thunderstorm",
    "11n": "Thunderstorm",
    "13d": "Snow",
    "13n": "Snow",
    "50d": "Mist",
    "50n": "Mist",
  };
  return iconMap[icon] || "Clear";
}

// Helper function to get forecast by coordinates
async function getForecastByCoordinates(lat, lon) {
  // ใช้ Mock Data หากเปิดใช้งาน
  if (USE_MOCK_DATA) {
    return getMockForecastData(lat, lon);
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error("OpenWeatherMap API key ไม่ได้ถูกตั้งค่า");
  }

  const url = `${process.env.OPENWEATHER_API_URL}/forecast`;
  const params = {
    lat: lat,
    lon: lon,
    appid: apiKey,
    units: "metric",
    lang: "th",
  };

  const response = await axios.get(url, { params });
  const data = response.data;

  // Group forecast by days (next 5 days)
  const dailyForecasts = [];
  const processedDates = new Set();

  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dateStr = date.toDateString();

    if (!processedDates.has(dateStr) && dailyForecasts.length < 5) {
      processedDates.add(dateStr);

      dailyForecasts.push({
        date: date.toLocaleDateString("th-TH", {
          weekday: "long",
          day: "numeric",
          month: "long",
        }),
        temperature: {
          min: Math.round(item.main.temp_min),
          max: Math.round(item.main.temp_max),
          avg: Math.round(item.main.temp),
        },
        humidity: item.main.humidity,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        windSpeed: item.wind.speed,
        timestamp: item.dt,
      });
    }
  });

  return {
    forecasts: dailyForecasts,
    coordinates: { lat, lon },
    timestamp: new Date().toISOString(),
  };
}

// Helper function สำหรับ Mock Forecast Data
function getMockForecastData(lat, lon) {
  // หาจังหวัดที่ใกล้เคียงที่สุด
  let closestProvince = thaiProvinces[0];
  let minDistance = Infinity;

  thaiProvinces.forEach((province) => {
    const distance = Math.sqrt(
      Math.pow(lat - province.lat, 2) + Math.pow(lon - province.lon, 2)
    );
    if (distance < minDistance) {
      minDistance = distance;
      closestProvince = province;
    }
  });

  const baseMockData = mockWeatherData[closestProvince.name];
  const forecasts = [];

  // สร้างพยากรณ์ 5 วัน
  for (let i = 1; i <= 5; i++) {
    const forecastDate = new Date();
    forecastDate.setDate(forecastDate.getDate() + i);

    // สร้างความแปรผันของสภาพอากาศ
    const tempVariation = Math.random() * 6 - 3; // ±3 องศา
    const humidityVariation = Math.floor(Math.random() * 20 - 10); // ±10%

    const weatherIcons = ["01d", "02d", "03d", "04d", "10d"];
    const weatherDescriptions = [
      "อากาศแจ่มใส",
      "เมฆบางส่วน",
      "เมฆมาก",
      "เมฆมาก",
      "ฝนเล็กน้อย",
    ];
    const randomIndex = Math.floor(Math.random() * weatherIcons.length);

    forecasts.push({
      date: forecastDate.toLocaleDateString("th-TH", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }),
      temperature: {
        min: Math.round(baseMockData.temp + tempVariation - 3),
        max: Math.round(baseMockData.temp + tempVariation + 3),
        avg: Math.round(baseMockData.temp + tempVariation),
      },
      humidity: Math.max(
        30,
        Math.min(90, baseMockData.humidity + humidityVariation)
      ),
      description: weatherDescriptions[randomIndex],
      icon: weatherIcons[randomIndex],
      windSpeed: baseMockData.wind + (Math.random() * 2 - 1), // ±1 m/s
      timestamp: Math.floor(forecastDate.getTime() / 1000),
    });
  }

  return {
    forecasts: forecasts,
    coordinates: { lat, lon },
    timestamp: new Date().toISOString(),
  };
}

module.exports = router;
