import {Link} from 'react-router-dom'
import '../Inicial/Inicial.css'

const Inicial = () => {


  return (
    <div className='Inicial'>
      <div className='InicialButton'>
        <Link to={'/home'}><button>Home</button></Link>
        <h1>Henry Videogames</h1>
      </div>
    </div>
  );
};

export default Inicial;
