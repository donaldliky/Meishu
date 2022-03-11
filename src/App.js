import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'

// import Home from './features/home/Home';

import Navbar from './pages/navbar/Navbar';
import Home from './pages/home/Home';
import Staking from './pages/staking/Staking';
import Detail from './pages/staking/detail/Detail';
import Footer from './pages/footer/Footer';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        {/* <Home/> */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/staking" element={<Staking />} />
        {/* <Route exact path="/nft_staking" element={<Nft_staking />} /> */}
        <Route exact path='/detail/:tokenId' element={<Detail />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
