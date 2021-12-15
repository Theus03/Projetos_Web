import { Link } from 'react-router-dom';

import logoImg  from '../assets/images/logo.png';
import bannerImg from '../assets/images/img-banner.jpg';
import houseImgNY from '../assets/images/img-ny.jpg';
import houseImgUK from '../assets/images/img-uk.jpg';
import houseImgBH from '../assets/images/img-bh.jpg';
import serviceImgOne from '../assets/images/service-one.png';
import serviceImgTwo from '../assets/images/service-two.png';
import serviceImgThree from '../assets/images/service-three.png';

import '../styles/home.scss';

import { useAuth } from '../hooks/useAuth';
import toast, { Toaster } from 'react-hot-toast';

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
                        <Link className="link" to="/"><li>SERVIÇOS</li></Link>
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
                <div className="box-house"><img src={houseImgNY} alt="Imagem de uma casa em Nova Iorque" /></div>
                <div className="box-house"><img src={houseImgUK} alt="Imagem de uma casa no Reino Unido" /></div>
                <div className="box-house"><img src={houseImgBH} alt="Imagem de uma casa em Belo Horizonte" /></div>
            </section>
            <section id="section-three">
                <div className="box-services">
                    <div className="content-box-services">
                        <img src={serviceImgOne} className="imgService" alt="Ícone do serviço de aquitetura externa" />
                        <div className="text-services">
                            <h2>TRABALHO EXTERNO DE ARQUITETURA</h2>
                            <span>Desenhamos toda a parte externa de sua casa de um jeito rápido e da forma que você quiser.</span>
                        </div>
                        <img src={serviceImgTwo} alt="Ícone do serviço de Trabalho completo de arquitetura" />
                        <div className="text-services">
                            <h2>TRABALHO COMPLETO DE ARQUITETURA</h2>
                            <span>Venha construir sua planta do zero até o fim conosco.</span>
                        </div>
                        <img src={serviceImgThree} alt="Ícone do serviço de aquitetura externa" />
                        <div className="text-services">
                            <h2>ANÁLISE DE ARQUITETURA</h2>
                            <span>Fazemos um levantamento de todos os requisitos para que você possa prosseguir da melhor forma com seu projeto.</span>
                        </div>
                    </div>
                    <div className="group-circles">
                        <div className="circle one">1</div>
                        <div className="circle two">2</div>
                        <div className="circle three">3</div>
                    </div>
                </div>
            </section>
            <footer>
                <img src={logoImg} alt="Logo da MyHouse" />
                <hr />
                <span>@myhouse</span>
            </footer>
        </div>
    )
}