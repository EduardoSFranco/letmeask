import { useHistory } from 'react-router-dom'
import { database } from '../services/FireBase';
import { FormEvent, useState } from 'react';

import { Button } from '../components/Button';

import illustrationImg from '../assets/images/illustration.svg';
import logoImage from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import toast, { Toaster } from 'react-hot-toast';

import { useAuth } from '../hooks/useAuth'

import '../styles/auth.scss';


export function Home(){
    const history = useHistory();
    const {user, signInWithGoogle} = useAuth();
    const [roomCode, setRoomCode] = useState('');

    async function HandleCreateRoom(){
        if( !user){
            await signInWithGoogle();
        }

        history.push('/rooms/new');
        }

        async function handleJoinRoom(event: FormEvent){
            event.preventDefault();

            if(roomCode.trim() === ''){
                return;
            }
            
            const roomRef = await database.ref(`/rooms/${roomCode}`).get();
            
            if(!roomRef.exists()){ 
                
                toast.error('Sala não encontrada, tente outro código.');
                return;
            }

            if(roomRef.val().closedAt){

                toast.error('Esta sala foi fechada.');
                return;
                
            }

            history.push(`/rooms/${roomCode}`);
        
        }

    return (
        <div id="page-auth">
            <aside>
                <img src={ illustrationImg } alt="Ilustração simbolizando oerguntas e respostas" />
                <h1><strong>Crie salas de Q&amp;A ao-vivo</strong></h1>
                <p>Tire as duvidas de sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImage} alt="Letmeask" />
                    <Button onClick={HandleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </Button>
                    <div className="separator">Ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                        <Toaster />
                    </form>
                </div>
            </main>
            <div>
     
    </div>
        </div>
    )
}