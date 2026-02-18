# 🌤 Weather App

A React-based weather application that fetches real-time weather data from an external API and displays dynamic weather information based on user input.

This project focuses on API integration, asynchronous JavaScript handling and dynamic UI updates.

---

## 🛠 Technologies

- React (Create React App)
- JavaScript (ES6+)
- REST API (Weather API)
- CSS
- Fetch API

---

## ✨ Features

- Search weather by city name
- Display current temperature and a range of temperatures every 3 hours from current time
- Change between Farenheit and Celsius
- Show weather condition and icon
- Dynamic UI updates based on search
- Loading state handling
- ❌ Basic error handling for invalid searches

---

## 🌐 API Integration

The application consumes data from a public weather API.

Weather data is fetched dynamically using asynchronous requests and rendered based on React state.

---

## 🧠 The Process

The app was built focusing on:

- Managing asynchronous API calls using async/await
- Updating UI dynamically based on user search
- Handling loading and error states
- Structuring a small React application using reusable components

One of the main challenges was ensuring proper error handling and preventing UI crashes when the API response was invalid.

---

## 📚 What I Learned

- Working with external REST APIs
- Managing asynchronous operations in React
- Conditional rendering
- Improving user experience with loading states

---

## 🔮 Improvements

- Add 5-day forecast
- Add geolocation support
- Improve error UI feedback
- Add unit tests
- Migrate to TypeScript
- If city is not found, don't display anything, because right now it displays the data from the default city, which is "Barcelona"

---

## ▶️ Running the Project

Clone the repository:

```bash
git clone https://github.com/AlexFranciscoDev/Weather_app.git
```

Install dependencies:
```
npm install
```

Run locally:
```
npm start
```

The app will be available at:

http://localhost:3000

## 🎥 Preview

![Weather-App-Demo](https://raw.githubusercontent.com/AlexFranciscoDev/Weather_app/main/public/weather-app.gif)


