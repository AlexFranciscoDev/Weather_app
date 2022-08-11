import './App.css';
import { Current } from './components/Current';
import { Search } from './components/Search';
import './styles/styles.scss';
import { useState } from 'react';
import { Forecast } from './components/Forecast';

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
        <h1>Weather App</h1>
        <Search handleSearch={handleSearch}/>
      </header>
      <div>
        <Current location={location} handleMeasure={handleMeasure}/>
        <Forecast isCelsius={isCelsius} location={location}/>
      </div>

    </div>
  );
}

export default App;
