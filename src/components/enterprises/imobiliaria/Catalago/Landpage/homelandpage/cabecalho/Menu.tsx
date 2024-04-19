import Link from 'next/link';
import { IconBrandGoogle } from '@tabler/icons-react';

export default function Menu() {
  return (
    <div className="flex ">
      <div className="flex gap-2">
        <Link href="/enterprises"> {/* Substitua '/sua-rota-aqui' pela rota desejada */}
          <a className="bg-gradient-to-r  from-indigo-600 to-cyan-600">
            <div className="flex items-center gap-2">
              <IconBrandGoogle size={12} />
              <span>Entre em contato</span>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}
