import { Route } from 'react-router-dom';
import Welcome from "./Components/Welcome/Welcome.js"
import Home from './Components/Home/Home.js';
import newActivity from "./Components/NewActivity/NewActivity.js"
import CountryDetail from "./Components/CountryDetail/CountryDetail.js"
import About from './Components/About/About.js';
import Gallery from './Components/Gallery/Gallery.js';

function App() {
  
  
  return (
    <div>
      <Route exact path="/" component={Welcome} />
      <Route path="/home" exact component={Home} />
      <Route path="/newActivity" exact component={newActivity} />
      <Route path="/gallery" exact component={Gallery} />
      <Route path="/about" exact component={About} />
      <Route path="/coutry/:id" component={CountryDetail} />
      
      
     
    </div>
  );
}

export default App;
