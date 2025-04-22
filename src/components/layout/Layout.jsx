import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';

const Layout = ({ children, title }) => {
    return (
        <div className='main'>
            <div className='sidebar'>
                <Sidebar />
            </div>
            <div className="layout">
                <div className="layout-content">
                    <Header title={title} />
                    <main className="main-content">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Layout;