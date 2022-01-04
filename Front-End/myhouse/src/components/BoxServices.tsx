import serviceImgOne from '../assets/images/service-one.png';
import serviceImgTwo from '../assets/images/service-two.png';
import serviceImgThree from '../assets/images/service-three.png';

import { useAuth } from '../hooks/useAuth';

import toast from 'react-hot-toast';

import '../styles/boxServices.scss';

export function BoxServices() { 
    const { user } = useAuth();

    function getService() {
        if(user) {
            toast.success('Solicitação enviada com sucesso!')
        } else {
            toast.error('Para realizar a solicitação você precisa entrar com um e-mail do Google.')
        }
    }
    return(
        <div className="container-services">
            <div className="box-services">
                <div className="content-box-services">
                    <h1 className="title-box-services">Serviços Oferecidos</h1>
                    <div className="content">
                        <img src={serviceImgOne}  className="imgService one" alt="Ícone do serviço de aquitetura externa" />
                        <div className="text-services one" >
                            <h2 id="title-service">TRABALHO EXTERNO <br/> DE ARQUITETURA</h2>
                            <span>Desenhamos toda a parte externa de sua casa de um jeito rápido e da forma que você quiser.</span>
                            <a href="#section-three" onClick={getService}>Solicitar Serviço</a>
                        </div>
                    </div>
                    <div className="content">
                        <img src={serviceImgTwo} className="imgService" alt="Ícone do serviço de Trabalho completo de arquitetura" />
                        <div className="text-services" id="service-two">
                            <h2>TRABALHO COMPLETO DE ARQUITETURA</h2>
                            <span>Venha construir sua planta do zero até o fim conosco.</span>
                            <a href="#section-three" onClick={getService}>Solicitar Serviço</a>
                        </div>
                    </div>
                   <div className="content">
                    <img src={serviceImgThree} className="imgService " alt="Ícone do serviço de aquitetura externa" />
                        <div className="text-services three">
                            <h2>ANÁLISE DE ARQUITETURA</h2>
                            <span>Fazemos um levantamento de todos os requisitos para que você possa prosseguir da melhor forma com seu projeto.</span>
                            <a href="#section-three" onClick={getService}>Solicitar Serviço</a>
                        </div>
                   </div>     
                </div>
            </div>  
        </div>
    )
}