import copyImg from '../assets/images/copy.svg';
import '../styles/roomCode.scss'
import {toast} from 'react-hot-toast'
 
type RoomCodeProps = {

        code: string;
    }

export function RoomCode(props: RoomCodeProps){
    function copyRoomCodeToClipboard(){
        navigator.clipboard.writeText(props.code);
        
        toast.success('Código da sala copiado.');
    }

    return (
        <button id="room-code" onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copy" />
            </div>
            <span>Sala #{props.code}</span>
            
        </button>
    )
}