import { Link } from "react-router-dom";
import useFormAndValidation from "../hooks/useFormAndValidation";

function Register({ handleRegister }) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    const { password, email } = values;
    handleRegister(password, email);
  }

  return (
    <div className="auth">
      <h3 className="auth__title">Регистрация</h3>
      <form
        name="form-auth"
        method="post"
        className="auth__form auth__form_func_registration"
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
          className="auth__field auth__field_value_name"
          minLength="2"
          maxLength="100"
          value={values.email || ""}
          onChange={handleChange}
        />
        <span
          className={`auth__field-error name-field-error ${!isValid && "auth__field-error_active"}`}
        >
          {errors.email}
        </span>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Пароль"
          required
          className="auth__field auth__field_value_info"
          minLength="2"
          maxLength="30"
          value={values.password || ""}
          onChange={handleChange}
        />
        <span
          className={`auth__field-error info-field-error ${!isValid && "auth__field-error_active"}`}
        >
          {errors.password}
        </span>
        <button type="submit" className="auth__button-save">
          Зарегистрироваться
        </button>
        <span className="auth__question">
          Уже зарегистрированы?
          <Link className="opacity-hover" to="/sign-in">
            {" "}
            Войти
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Register;
