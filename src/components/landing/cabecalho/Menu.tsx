import MenuItem from './MenuItem';

export default function Menu() {
  return (
    <div className="flex">
      <div className="flex gap-2">
        {/* Exemplo de botão de menu genérico (pode ser removido ou adaptado) */}
        <MenuItem className="bg-gray-200 text-gray-800">
          <span>Menu</span>
        </MenuItem>
      </div>
    </div>
  );
}
