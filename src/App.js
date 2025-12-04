import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home  from "./Pages/Home";
import About from "./Pages/About";
import Menu from "./Pages/Menu";
import Contact from "./Pages/Contact";
import Navbar from './Components/Navbar';
import Reservation from './Pages/Reservation';
import Connection from './Pages/Connection';
import Administrateur from './Pages/Administrateur';
import Client from './Pages/Client';
import EventBot from './Components/EventBot';
import Prix from './Pages/Prix'

function App() {


  return (
      <Router>
         <Navbar/>
         <EventBot/>
          <Routes>
            <Route path ="/" element = {<Home />}/>
            <Route path ="/About" element = {<About/>}/> 
            <Route path ="/Menu" element = {<Menu />}/>
            <Route path ="/Contact" element = {<Contact />}/>
            <Route path ="/Prix" element = {<Prix />}/>

            <Route path ="/Reservation" element = {<Reservation />}/>
            <Route path ="/Connection" element = {<Connection />}/>
            <Route path ="/Administrateur" element = {<Administrateur />}/>
            <Route path ="/Client" element = {<Client />}/>
          </Routes>
   </Router>
  );
}

export default App;
