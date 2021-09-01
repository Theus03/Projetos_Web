/*======== STYLE ===========*/

const styleForm = [
    nome = document.getElementById('nome'),
    tipo = document.getElementById('tipo'),
    genero = document.getElementById('genero'),
    plataforma = document.getElementById('plataforma'),
    
    nome.addEventListener('keypress', function(){
        document.querySelector('.sr-only.nome').style.visibility = 'visible';
    }),

    tipo.addEventListener('keypress', function(){
        document.querySelector('.sr-only.tipo').style.visibility = 'visible';
    }), 

    genero.addEventListener('keypress', function(){
        document.querySelector('.sr-only.genero').style.visibility = 'visible';
    }), 
    
    plataforma.addEventListener('keypress', function(){
        document.querySelector('.sr-only.plataforma').style.visibility = 'visible';
    }), 

]