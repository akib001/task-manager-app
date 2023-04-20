import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/ui/Navbar";
import AddEditPage from "./pages/AddEditPage";


function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/add" element={<AddEditPage/>}/>
                <Route path="/edit/:id" element={<AddEditPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
