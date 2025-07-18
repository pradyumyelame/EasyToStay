import { Route, Routes } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import { ToastContainer } from 'react-toastify';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import ProfilePage from './pages/ProfilePage';
import PlacesPage from './pages/PlacesPage';
import PlacePage from './pages/PlacePage';
import PlacesFormPage from './pages/PlacesFormPage';
import BookingsPage from './pages/BookingsPage';
import BookingPage from './pages/BookingPage';
axios.defaults.baseURL = 'https://easytostay-backend.onrender.com';
axios.defaults.withCredentials = true;
const App = () => {
  return (
    <UserContextProvider>
      <ToastContainer position="top-center"/>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage/>}/>
          <Route path="/account/bookings" element={<BookingsPage/>}/>
          <Route path="/account/bookings/:id" element={<BookingPage/>}/>
          <Route path="/account/places/new" element={<PlacesFormPage/>}/>
          <Route path="/account/places/:id" element={<PlacesFormPage/>}/>
          <Route path="/place/:id" element={<PlacePage/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App