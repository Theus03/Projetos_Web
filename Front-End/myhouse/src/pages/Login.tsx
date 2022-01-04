import { useNavigate } from 'react-router-dom'

import logoImg from '../assets/images/logo.png';
import imgLogin from '../assets/images/img-login.jpg';
import iconGoogle from '../assets/images/icon-google.svg';

import '../styles/login.scss';


import { useAuth } from '../hooks/useAuth';
import { FormEvent } from 'react';


export function Login() {
    const navigate = useNavigate();
    const { user, signInWithGoogle } = useAuth();
    
    async function loginWithGoogle() {
        if(!user) 
            await signInWithGoogle();
        
        navigate('/pages/home');
    }

    async function loginWithName(event: FormEvent) {
        event.preventDefault();
    }

    return (
        <div id="page-auth">
            <main>
                <img src={logoImg} alt="Logo - MyHouse" />
                <span>ENTRA E CONHEÇA UM POUCO MAIS SOBRE NOSSA CORRETORA. </span>
                <form onSubmit={loginWithName}>
                    <button onClick={loginWithGoogle} className="button-google">
                        <img src={iconGoogle} alt="Icon Google" />
                        ENTRE COM O GOOGLE
                    </button>     
                </form>
            </main>
            <aside>
                <img src={imgLogin} alt="Imagem do Login" />
            </aside>
        </div>
    )
}