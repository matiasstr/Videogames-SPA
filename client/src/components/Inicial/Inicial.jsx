import {Link} from 'react-router-dom'
import '../Inicial/Inicial.css'

const Inicial = () => {


  return (
    <div className='Inicial'>
      <div className='InicialButton'>
        <Link to={'/home'}><button className='homeButton'>Home</button></Link>
      </div>
    </div>
  );
};

export default Inicial;
