import logoImg from '../assets/images/logo.png';
import imgLogin from '../assets/images/img-login.jpg';
import iconGoogle from '../assets/images/icon-google.svg';

import { Button } from '../components/Button'

import '../styles/login.scss';



export function Login() {
    return (
        <div id="page-auth">
            <main>
                <img src={logoImg} alt="Logo - MyHouse" />
                <span>ENTRA E CONHEÇA UM POUCO MAIS SOBRE NOSSA EMPRESA. </span>
                <form>
                    <input type="text" placeholder='Endereço de e-mail'/>
                    <Button type="submit">
                        Entrar com o meu e-mail
                    </Button>
                    <button className="button-google">
                        <img src={iconGoogle} alt="Icon Google" />
                        ENTRAR COM O GOOGLE
                    </button>     
                </form>
            </main>
            <aside>
                <img src={imgLogin} alt="" />
            </aside>
        </div>
    )
}