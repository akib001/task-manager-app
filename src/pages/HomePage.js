import React from 'react';
import Sidebar from "../components/ui/Sidebar";
import MainBlock from "../components/ui/MainBlock";

const HomePage = () => {
    return (
        <div className="container relative">
            <Sidebar/>
            <MainBlock/>
        </div>
    );
};

export default HomePage;