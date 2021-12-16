import houseImgNY from '../assets/images/img-ny.jpg';
import houseImgUK from '../assets/images/img-uk.jpg';
import houseImgBH from '../assets/images/img-bh.jpg';
import iconMap from '../assets/images/icon-map.svg';

import '../styles/boxHouse.scss';

export function BoxHouse() {
    return(
        <div className="boxContainer">
            <div className="box-house">
                <img src={houseImgNY} alt="Imagem de uma casa em Nova Iorque" />
                <div className="title-box">
                    <img src={iconMap} alt="ícone de Localização" />
                    <span>New York - NY</span>
                </div>    
            </div>
            <div className="box-house">
                <img src={houseImgUK} alt="Imagem de uma casa no Reino Unido" />
                <div className="title-box">
                    <img src={iconMap} alt="ícone de Localização" />
                    <span>Poole - UK</span>
                </div>    
            </div>
            <div className="box-house">
                <img src={houseImgBH} alt="Imagem de uma casa em Belo Horizonte" />
                <div className="title-box">
                    <img src={iconMap} alt="ícone de Localização" />
                    <span>Minas Gerais - BH</span>
                </div>    
            </div>
        </div>
    )
}