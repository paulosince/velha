import { IoCloseSharp, IoEllipseOutline } from 'react-icons/io5';

export function Square(props){
    let content = {
        null: '',
        'X': <IoCloseSharp className="iconX" />,
        'O': <IoEllipseOutline className="iconO" />
    }
    return (
        <button 
            className="square"  
            onClick={props.squareClick}           
        >
            {content[props.value]}
        </button>
    );
}