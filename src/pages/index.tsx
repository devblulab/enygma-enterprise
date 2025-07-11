import Financas from "@/components/financas";
import Landing from "@/app/app/page";
import Carregando from "@/components/template/Carregando";
import AutenticacaoContext from "@/data/contexts/AutenticacaoContext";
import { useContext } from "react";

export default function Home() {
    const { usuario, carregando } = useContext(AutenticacaoContext)

    if(carregando) return <Carregando />
    return usuario ? <Financas /> : <Landing />  
}
