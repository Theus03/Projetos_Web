import { Routes, Route } from 'react-router-dom';

import { Login } from './pages/Login';
import { Home } from './pages/Home';

import { AuthContextProvider } from './contexts/AuthContext'


function App() {
    return(
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/pages/login" element={ <Login/> } />
          <Route path="/pages/home" element={ <Home/> } />
          <Route path="/pages/home/:nome" element={ <Home/> } />
        </Routes>
      </AuthContextProvider>
    );
}

export default App;
