import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-300 text-sm">
          &copy; {new Date().getFullYear()} ShareEat
        </p>
      </div>
    </footer>
  );
};

export default Footer;