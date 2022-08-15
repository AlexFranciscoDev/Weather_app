import './App.css';
import { Current } from './components/Current';
import { Search } from './components/Search';
import './styles/styles.scss';
import { useState } from 'react';
import { Forecast } from './components/Forecast';
import { Footer } from './components/Footer';

function App() {
  const [location, setLocation] = useState("");
  const [isCelsius, setIsCelsius] = useState(true);

  const getSearchHandler = (receivedLocation) => {
    setLocation(receivedLocation);
  }

  const handleSearch = (search) => {
    setLocation(search);
  }

  const handleMeasure = (measure) => {
    setIsCelsius(!measure);
  }
  
  return (
    <div className="App">
      <header>
        <h1 className="weather_title">Weather App</h1>
        <Search handleSearch={handleSearch}/>
      </header>
      <div className="current_container">
        <Current location={location} handleMeasure={handleMeasure}/>
        <Forecast isCelsius={isCelsius} location={location}/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
