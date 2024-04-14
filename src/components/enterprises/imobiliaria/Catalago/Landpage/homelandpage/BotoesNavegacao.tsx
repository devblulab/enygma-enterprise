import Link from 'next/link';
import { Menu } from 'antd';
import { FaHome, FaShoppingCart, FaUser, FaStore } from 'react-icons/fa';

const BotoesNavegacao = () => {
  const menuStyle = {
    width: '300px', // Set the desired width here
    position: 'fixed' as 'fixed', // Defina 'position' como 'fixed' explicitamente
    top: 0,
    zIndex: 1000, // Ensure menu stays on top of other content
  };

  const menuItemStyle = {
    borderRadius: '50px',
    border: '15px', // Corrigido de 'borde' para 'border'
    marginBottom: '3px'
  };

  return (
    <Menu mode="horizontal" style={{ ...menuStyle, ...menuItemStyle }}>
      
      <Menu.Item icon={<FaHome />} style={menuItemStyle}>
        <Link href="/enterprises/imobiliaria/">Início</Link>
      </Menu.Item>
      <Menu.Item icon={<FaShoppingCart />} style={menuItemStyle}>
        <Link href="/enterprises/imobiliaria/dashboard">DashBoard</Link>
      </Menu.Item>
      <Menu.Item icon={<FaUser />} style={menuItemStyle}>
        <Link href="/enterprises/imobiliaria/agenda">Agenda</Link>
      </Menu.Item>
      <Menu.Item icon={<FaStore />} style={menuItemStyle}>
        <Link href="/enterprises/imobiliaria/catalago">Catalago</Link>
      </Menu.Item>
      <Menu.Item icon={<FaStore />} style={menuItemStyle}>
        <Link href="/enterprises/imobiliaria/visor">Visor</Link>
      </Menu.Item>
      <style jsx>{`
        @media (max-width: 767px) {
          .ant-menu-horizontal {
            display: flex;
            justify-content: space-between;
          }
          .ant-menu-item {
            flex: 1;
            text-align: center;
            padding: 0;
          }
        }
      `}</style>
    </Menu>
  );
};

export default BotoesNavegacao;
