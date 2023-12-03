import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Home from './pages/home';
import List from './pages/list';
import Tour from './pages/tour';
import Contact from './pages/contact';
import NotFound from './pages/notFound';
import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx';
import Footer from './components/footer';
import Fav from './pages/fav.jsx';

function App() {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSelectedRoute(location.pathname);
    setIsSubscribing(location.pathname === '/login' || location.pathname === '/signup');
  }, [location.pathname]);

  return (
    <div className="App">
      {isSubscribing ? '' : <Navbar />}
      <Routes>
        <Route index element={<Home />} />
        <Route path='/recipesList' element={<List />} />
        <Route path='/foodTour' element={<Tour />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/fav' element={<Fav />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
      {isSubscribing ? '' : <Footer />}
    </div>
  );
}
export default App;
