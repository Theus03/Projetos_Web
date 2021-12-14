import { useNavigate } from 'react-router-dom'

import logoImg from '../assets/images/logo.png';
import imgLogin from '../assets/images/img-login.jpg';
import iconGoogle from '../assets/images/icon-google.svg';

import '../styles/login.scss';


import { Button } from '../components/Button'

import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';


export function Login() {
    const navigate = useNavigate();
    const { user, signInWithGoogle } = useAuth();
    const [ nome, setNome ] = useState('');
    
    async function loginWithGoogle() {
        if(!user) 
            await signInWithGoogle();
        
        navigate('/pages/home');
    }

    async function loginWithName(event: FormEvent) {
        event.preventDefault();

        if (nome.trim() === ''){
            return;
        }
        navigate(`/pages/home/${nome}`)
    }

    return (
        <div id="page-auth">
            <main>
                <img src={logoImg} alt="Logo - MyHouse" />
                <span>ENTRA E CONHEÇA UM POUCO MAIS SOBRE NOSSA CORRETORA. </span>
                <form onSubmit={loginWithName}>
                    <input 
                        type="text"
                        placeholder='Digite seu Nome'
                        onChange={event => setNome(event.target.value)}
                        value={nome}
                    />
                    <Button type="submit">
                        Entrar com o meu nome
                    </Button>
                    <button onClick={loginWithGoogle} className="button-google">
                        <img src={iconGoogle} alt="Icon Google" />
                        ENTRAR COM O GOOGLE
                    </button>     
                </form>
            </main>
            <aside>
                <img src={imgLogin} alt="Imagem do Login" />
            </aside>
        </div>
    )
}