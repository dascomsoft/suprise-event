import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home  from "./Pages/Home";
import About from "./Pages/About";
import Menu from "./Pages/Menu";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import Navbar from './Components/Navbar';








function App() {


  return (
      <Router>
         <Navbar/>
          <Routes>
            <Route path ="/" element = {<Home />}/>
            <Route path ="/About" element = {<About/>}/> 
            <Route path ="/Menu" element = {<Menu />}/>
            <Route path ="/Contact" element = {<Contact />}/>
            <Route path ="/Cart" element = {<Cart />}/>
          </Routes>
   </Router>
  );
}

export default App;
