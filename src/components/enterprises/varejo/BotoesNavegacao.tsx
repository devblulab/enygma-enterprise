import Link from 'next/link';
import { Menu } from 'antd';
import {  FaHome, FaShoppingCart, FaUser, FaStore } from 'react-icons/fa';

const BotoesNavegacao = () => {
  const menuStyle = {
    width: '350px', // Set the desired width here
  };

  const menuItemStyle = {
    borderRadius: '50px',
    borde: '15px',
    marginBottom: '3px'
  };

  return (
    <Menu mode="horizontal" style={{ ...menuStyle, ...menuItemStyle }}>
      
      <Menu.Item icon={<FaHome />} style={menuItemStyle}>
        <Link href="/enterprises/varejo">Início</Link>
      </Menu.Item>
      <Menu.Item icon={<FaShoppingCart />} style={menuItemStyle}>
        <Link href="/enterprises/varejo/caixa">Caixa</Link>
      </Menu.Item>
      <Menu.Item icon={<FaUser />} style={menuItemStyle}>
        <Link href="/enterprises/varejo/atendente">Atendente</Link>
      </Menu.Item>
      <Menu.Item icon={<FaStore />} style={menuItemStyle}>
        <Link href="/enterprises/varejo/pacote">Pacote</Link>
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
