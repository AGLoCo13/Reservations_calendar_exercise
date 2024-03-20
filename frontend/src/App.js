import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router , Route , Routes } from 'react-router-dom'
import ReservationCalendar from './components/ReservationCalendar';

function App() {
  return (
   <Router>
    <Routes>
      <Route path='/' element={<ReservationCalendar/>} />
    </Routes>
   </Router>
  );
}

export default App;
