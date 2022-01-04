import { Link } from 'react-router-dom';

import logoImg  from '../assets/images/logo.png';
import bannerImg from '../assets/images/img-banner.jpg';

import '../styles/home.scss';

import { useAuth } from '../hooks/useAuth';
import toast, { Toaster } from 'react-hot-toast';
import { BoxHouse } from '../components/BoxHouse';
import { BoxServices } from '../components/BoxServices';

async function Contact() {
    toast('Telefone: 11 36542126',  {
        icon: '📞',
    });
    toast('E-mail: myhouse@gmail.com',  {
        icon: '📩',
    });
}

export function Home() {
    const { user } = useAuth();

    return(

        <div className="page-home">
        <Toaster></Toaster>
         
            <header>
                <nav>
                    <ul>
                        <a href="#section-three" className="link"><li>SERVIÇOS</li></a>
                        <Link className="link" to="/"><img src={logoImg} className="logo" alt="Logo da MyHouse" /></Link>
                        { user ? (
                            <div>
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                                <Link className="link" to="/login"><li>SAIR</li></Link>
                            </div>
                        ) : (
                            <Link className="link sign" to="/login"><span>Entrar</span></Link>
                        )}
                    </ul>
                </nav>
            </header>
            <section id="section-one">
                <img src={bannerImg} alt="Imagem do Banner" />
                <div className="box-banner">
                    <h2>FAREMOS DE SUA CASA,<br/> UM LOCAL PERFEITO<br/> PARA MORAR.</h2>
                    <button className="button-contact" onClick={Contact}>Entrar em Contato</button>
                </div>
            </section>
            <section id="section-two">
                <BoxHouse></BoxHouse>
            </section>
            <section id="section-three">
                <BoxServices></BoxServices>
            </section>
            <hr /> 
            <footer>
                <img src={logoImg} alt="Logo da MyHouse" />
                <hr />
                <span>@myhouse</span>
            </footer>
        </div>
    )
}