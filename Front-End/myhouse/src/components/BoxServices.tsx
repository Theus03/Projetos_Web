import serviceImgOne from '../assets/images/service-one.png';
import serviceImgTwo from '../assets/images/service-two.png';
import serviceImgThree from '../assets/images/service-three.png';

import '../styles/boxServices.scss';

function changeService() {
    alert("deu")
}

export function BoxServices() {
    return(
        <div className="container-services">
            <div className="box-services">
                <div className="content-box-services">
                    <img src={serviceImgOne} className="imgService" alt="Ícone do serviço de aquitetura externa" />
                    <div className="text-services one">
                        <h2>TRABALHO EXTERNO <br/> DE ARQUITETURA</h2>
                        <span>Desenhamos toda a parte externa de sua casa de um jeito rápido e da forma que você quiser.</span>
                    </div>
                    <img src={serviceImgTwo} alt="Ícone do serviço de Trabalho completo de arquitetura" />
                    <div className="text-services">
                        <h2>TRABALHO COMPLETO DE ARQUITETURA</h2>
                        <span>Venha construir sua planta do zero até o fim conosco.</span>
                    </div>
                    <img src={serviceImgThree} alt="Ícone do serviço de aquitetura externa" />
                    <div className="text-services three">
                        <h2>ANÁLISE DE ARQUITETURA</h2>
                        <span>Fazemos um levantamento de todos os requisitos para que você possa prosseguir da melhor forma com seu projeto.</span>
                    </div>
                </div>
                <div className="group-circles">
                    <div className="circle one" onClick={changeService}><div className="selected active"></div></div>
                    <div className="circle two" onClick={changeService}><div className="selected"></div></div>
                    <div className="circle three" onClick={changeService}><div className="selected"></div></div>
                </div>
            </div>  
            
        </div>
    )
}