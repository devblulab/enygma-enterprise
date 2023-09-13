import BoasVindas from "../template/BoasVindas";
import MenuUsuario from "../template/MenuUsuario";

import BotoesNavegacao from "./BotoesNavegacao";

export default function Cabecalho() {
    return (
        <div className={`
            flex justify-between items-center
            p-7 border-b border-zinc-900
        `}>
            <BoasVindas />
            <BotoesNavegacao />
            <MenuUsuario />
        </div>
    )
}