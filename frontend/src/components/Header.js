import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ userData }) {
  const location = useLocation();
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("token");
    navigate("/sign-in");
  }

  return (
    <>
      <header className="header">
        <img className="logo" src={logo} alt="логотип" />
        {location.pathname === "/sign-up" && (
          <Link to="/sign-in" className="header__button opacity-hover">
            Войти
          </Link>
        )}
        {location.pathname === "/sign-in" && (
          <Link to="sign-up" className="header__button opacity-hover">
            Регистрация
          </Link>
        )}
        {location.pathname === "/my-profile" && (
          <>
            <div className="header__container">
              <p className="header__email">{userData}</p>
              <button onClick={signOut} className="header__button opacity-hover">
                Выйти
              </button>
            </div>
          </>
        )}
      </header>
    </>
  );
}

export default Header;
