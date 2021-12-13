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
                <span>ENTRE COM O CÓDIGO DA SALA E FAÇA PERGUNTAS SOBRE SEU FUTURO LAR.</span>
                <form>
                    <input type="text" placeholder='Código da Sala'/>
                    <Button type="submit">
                        Entrar na Sala
                    </Button>
                    <button className="button-google">
                        <img src={iconGoogle} alt="Icon Google" />
                        CRIAR SALA COM O GOOGLE
                    </button>     
                </form>
            </main>
            <aside>
                <img src={imgLogin} alt="" />
            </aside>
        </div>
    )
}