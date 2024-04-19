import React from 'react';
import classnames from 'classnames';
import { useMediaQuery } from 'react-responsive';
import { IconBrandGoogle } from '@tabler/icons-react';
import Link from 'next/link'; // Importa o Link do Next.js
import MenuItem from '../cabecalho/MenuItem';
import AutenticacaoContext from '@/data/contexts/AutenticacaoContext';
import { useContext } from 'react';

export default function Logo() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const { loginGoogle } = useContext(AutenticacaoContext);

  const enygmaClasses = classnames('text-3xl', {
    'text-2xl': isMobile,
  });

  return (
    <div className={enygmaClasses}>
      <div className="flex items-center gap-1"> {/* Contêiner flexível para alinhar horizontalmente */}
        <span className="font-black">GM</span>
        <span className="text-zinc-400 font-thin">Agente Imobiliário</span>
      </div>
      <span className="font-black">Seu sonhos aqui!!</span>
      <Link href="/enterprises" passHref> {/* Substitua "/sua-rota-de-login-aqui" pela rota desejada */}
        <MenuItem className="bg-gradient-to-r  from-indigo-600 to-cyan-600">
          <div className="flex items-center gap-2">
            <IconBrandGoogle size={12} />
            <span>Entre em contato</span>
          </div>
        </MenuItem>
      </Link>
    </div>
  );
}
