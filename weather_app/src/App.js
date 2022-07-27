import './App.css';
import { Current } from './components/Current';
import { Search } from './components/Search';
import './styles/styles.scss';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Weather App</h1>
        <Search />
      </header>
      <section>
        <Current />
      </section>
    </div>
  );
}

export default App;
