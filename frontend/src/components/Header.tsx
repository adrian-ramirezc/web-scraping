import logo from '../imgs/Mines_Paris.png'
import "./Header.css"

interface Props {
    title: String
    description : String
}

function Header(props : Props) {
    const {title, description} = props
    return (
        <div className='Header'>
            <h1>{title} </h1>
            <p> 
                <em>{description}</em>
            </p>
            <img 
                className="Logo"
                alt="Mines Paris logo"
                src={logo}   
            />
            <p></p>
        </div>
    )
}

export default Header