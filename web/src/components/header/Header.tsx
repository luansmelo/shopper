import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="fixed top-0 left-0 w-full bg-blue-600 py-4 flex justify-between items-center px-6 z-10">
            <Link to="/" className="text-3xl text-white font-bold">
                ShoTravel
            </Link>
        </header>
    );
};

export default Header;
