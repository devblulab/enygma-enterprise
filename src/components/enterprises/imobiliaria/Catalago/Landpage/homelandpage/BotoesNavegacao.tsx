import Link from 'next/link';
import { Menu } from 'antd';
import { FaHome, FaShoppingCart, FaUser, FaStore } from 'react-icons/fa';

const BotoesNavegacao = () => {
  const menuStyle = {
    width: '100%', // Alterado para ocupar toda a largura
    display: 'flex',
    justifyContent: 'space-around', // Alterado para distribuir igualmente os itens
   
    top: 0, // Posiciona o menu no topo
    zIndex: 1000, // Ajusta a ordem de empilhamento para ficar acima de outros elementos
    backgroundColor: '#fff', // Adiciona cor de fundo para melhorar a visibilidade
  };

  const menuItemStyle = {
    borderRadius: '50px',
    marginBottom: '3px'
  };

  return (
    <Menu mode="horizontal" style={{ ...menuStyle }}>
      <Menu.Item icon={<FaHome />} style={menuItemStyle}>
        <Link href="/homelandpage">Início</Link>
      </Menu.Item>
      <Menu.Item icon={<FaUser />} style={menuItemStyle}>
        <Link href="/contatos">Contatos</Link>
      </Menu.Item>
      <Menu.Item icon={<FaShoppingCart />} style={menuItemStyle}>
        <Link href="/enterprises/imobiliaria/agenda">Catalago</Link>
      </Menu.Item>
      <Menu.Item icon={<FaStore />} style={menuItemStyle}>
        <Link href="/enterprises/imobiliaria/catalago">Quem Sou</Link>
      </Menu.Item>

      <style jsx>{`
        @media (max-width: 767px) {
          .ant-menu-horizontal {
            flex-direction: column;
            align-items: center;
          }
          .ant-menu-item {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </Menu>
  );
};

export default BotoesNavegacao;
