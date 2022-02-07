import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home/Home'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import Navbar from './components/Navbar'
import { useAuthContext } from './hooks/useAuthContext'

function App() {
  const { authIsReady, user } = useAuthContext()

  return (

    <div className="App">
      {authIsReady &&
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={user ? <Home /> : <Login />} />
            <Route path="/login" element={(!user ? <Login /> : <Navigate replace to="/" />)} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate replace to="/" />} />
          </Routes>
        </BrowserRouter>
      }
    </div>

  );
}

export default App
