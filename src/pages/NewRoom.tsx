
import { Link, useHistory } from 'react-router-dom'
import { FormEvent } from 'react'

import illustrationImg from '../assets/images/illustration.svg';
import logoImage from '../assets/images/logo.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react';
import { database } from '../services/FireBase';

export function NewRoom(){
    const { user } = useAuth();
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');

    async function handlecreateRoom(event: FormEvent){
        event.preventDefault();

        if(newRoom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        history.push(`/rooms/${firebaseRoom.key}`);
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <h1><strong>Crie salas de Q&amp;A ao-vivo</strong></h1>
                <p>Tire as duvidas de sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImage} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handlecreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value ={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">cliue aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}