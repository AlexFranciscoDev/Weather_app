import './App.css';
import { Current } from './components/Current';
import { Search } from './components/Search';
import './styles/styles.scss';
import { useState } from 'react';

function App() {
  const [location, setLocation] = useState("");

  const getSearchHandler = (receivedLocation) => {
    setLocation(receivedLocation);
    console.log("my location: " + location);
  }

  const handleSearch = (search) => {
    setLocation(search);
  }
  
  return (
    <div className="App">
      <header>
        <h1>Weather App</h1>
        <Search handleSearch={handleSearch}/>
      </header>
      <div>
        <Current location={location}/>
      </div>
    </div>
  );
}

export default App;
