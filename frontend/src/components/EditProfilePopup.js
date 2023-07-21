import { useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import useFormAndValidation from "../hooks/useFormAndValidation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, textButton }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, setValues } = useFormAndValidation();

  useEffect(() => {
    if (isOpen) {
      setValues({
        name: currentUser.name,
        about: currentUser.about,
      });
    }
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name={"edit"}
      title={"Редактировать профиль"}
      textButton={textButton ? "Сохранение..." : "Сохранить"}
      typeButton={"submit"}
      method={"post"}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Имя"
        required
        className="popup__field popup__field_value_name"
        minLength="2"
        maxLength="40"
        value={values.name || ""}
        onChange={handleChange}
      />
      <span
        className={`popup__field-error place-field-error ${
          !isValid && "popup__field-error_active"
        }`}
      >
        {errors.name}
      </span>
      <input
        type="text"
        id="about"
        name="about"
        placeholder="О себе"
        required
        className="popup__field popup__field_value_info"
        minLength="2"
        maxLength="200"
        value={values.about || ""}
        onChange={handleChange}
      />
      <span
        className={`popup__field-error place-field-error ${
          !isValid && "popup__field-error_active"
        }`}
      >
        {errors.about}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
