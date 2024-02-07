
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Login} from "./pages/login";
import {Home} from "./pages/home";
import {Navigation} from './component/navigation';
import {Logout} from './pages/logout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Register } from './pages/register';
import { DisplayClub } from './pages/displayClub';
import { DisplaySession } from './pages/displaySession';
import { DisplayMatch } from './pages/displayMatch';
import { DisplayPlayers } from './pages/displayPlayers';
import { DisplaySinglePlayer } from './pages/displaySinglePlayer';



function App() {
  return (
    <BrowserRouter>
        <Navigation></Navigation>
        <Routes>
          
          
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          
          <Route path="/:username/:clubName" element={<DisplayClub/>}/>
          <Route path="/:username/:clubName/players" element={<DisplayPlayers/>}/>
          <Route path="/:username/:clubName/players/:playername" element={<DisplaySinglePlayer/>}/>
          <Route path="/:username/:clubName/:year/:month/:day" element={<DisplaySession/>}/>
          <Route path="/:username/:clubName/:year/:month/:day/:matchid" element={<DisplayMatch/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
