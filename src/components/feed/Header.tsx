import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import './Header.module.css';

interface HeaderProps {
  content: string;
}

const Header: React.FC<HeaderProps> = ({ content }) => {
  return (
    <div className="header-container">
      <FaUserCircle className="user-icon" />
      <p className="content-text">Conteúdo: {content}</p>
    </div>
  );
};

export default Header;
