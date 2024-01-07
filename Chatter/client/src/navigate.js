/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

//import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import App from './App';
import Chat from './home';
import Register from './register';

function Navigate(){
    return (
            <Router>
    <Routes>
    <Route path="/" element={<Register/>}/>
    <Route path="/login" element={<App/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="*" element={<Chat/>}/>       
    </Routes>
            </Router> 
           );
}

export default Navigate;