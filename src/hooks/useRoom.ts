import { useState, useEffect } from 'react';
import { database } from '../services/FireBase';
import { useAuth } from './useAuth';

type firebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isHighLighted: boolean;
    isAnswearded: boolean;
    likes: Record<string, {
        authorId: string;
    }>
}>

type QuestionType = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isHighLighted: boolean;
    isAnswearded: boolean;
    likeCount: number;
    likeId: string | undefined;
}

export function useRoom(roomId: string){
    const { user } = useAuth();
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [title, setTitle] =useState('');
    
    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => {
            console.log(room.val());

            const databaseRoom = room.val();
            const firebaseQuestions: firebaseQuestions = databaseRoom.questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => { 
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswearded: value.isAnswearded,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
                }
            })
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions)
        })

        return () => {
            roomRef.off('value');
        }
    }, [roomId, user?.id]);

    return {questions, title}
}