// import logo from './logo.svg';
import './App.css';
import LoginForm from './components/auth/Login';
import DashboardLayout from './components/dashboard/Dashboard';
import FileUpload from './components/document/document';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import {Login, LoginResponse} from './actions/auth';
import { ToastContainer } from 'react-toastify';

function App() {

  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

	const role = JSON.parse(localStorage.getItem("role"))
	// useNavigate()

  return (
    <Router>
      <ToastContainer/>
      <Routes>
        {token && role ? (
            <Route path = '/*' element = {<FileUpload/>} />
        ):(
            <Route path = '/*' element = {<LoginForm/>} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
