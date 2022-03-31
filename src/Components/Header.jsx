import './Style/Header.scss';
import { Link} from "react-router-dom"
import Button from "./Button"
export default function Header() {
    return (
      <header>
        <img src="logo.svg"/>
        <div className='links'>
            <Link  to="/">Главная</Link>
            <Link className='Active' to="/PageProduct">Продукты</Link>
            <Link  to="/PagePharmacy">Аптеки</Link>
        </div>
        <Button>Личный кабинет</Button>
      </header>
    );
  }