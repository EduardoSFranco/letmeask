
import { useRoom } from '../hooks/useRoom';

import { useHistory, useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answearImg from '../assets/images/answer.svg'

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';

import { database} from '../services/FireBase';

import '../styles/room.scss';




type RoomParams = {
    id: string;
}

export function AdminRoom(){
  //  const { user } = useAuth();
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;

    const {title, questions} = useRoom(roomId)

    async function handleCloseRoom(){
        await database.ref(`rooms/${roomId}`).update({
            closedAt: new Date(),
        });

        history.push('/');
    }

    async function handleCheckQuestionAsAnsweared(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswearded: true,
        })
    }

    async function handleHilghtedQuestion(questionId: string){

        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighLighted: true,
        })
    }
    
    async function handleDeleteQuestion(questionId: string){
        if(window.confirm('Tem certeza que deseja excluir esta pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={handleCloseRoom}>Encerra sala</Button>
                    </div>
                </div>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>Sala #{title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>
                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key ={question.id} 
                                content={question.content}
                                author={question.author}
                            >
                                <button
                                    type="button"
                                    onClick={() => handleCheckQuestionAsAnsweared(question.id)}
                                >
                                    <img src={checkImg} alt="Marcar pergunta como respondida" />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleHilghtedQuestion(question.id)}
                                >
                                    <img src={answearImg} alt="Destacar a pergunta" />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    );
}