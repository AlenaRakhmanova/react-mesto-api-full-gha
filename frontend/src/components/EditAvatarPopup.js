import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormAndValidation from "../hooks/useFormAndValidation";


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, textButton }) {
  // const avatarRef = useRef();
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();


  function handleSubmitAvatar(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: values.picture,
    });
  }

  useEffect(() => {
    if (isOpen) {
      resetForm();
      // avatarRef.current.value = "";
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name={"update-avatar"}
      title={"Обновить аватар"}
      textButton={textButton ? "Сохранение..." : "Сохранить"}
      typeButton={"submit"}
      method={"post"}
      onSubmit={handleSubmitAvatar}
      isValid={isValid}
    >
      <input
        type="url"
        id="picture"
        name="picture"
        placeholder="Ссылка на картинку"
        required
        className="popup__field popup__field_value_picture"
        value={values.picture || ''}
        onChange={handleChange}
        // ref={avatarRef}
      />
      <span className={`popup__field-error place-field-error ${
          !isValid && "popup__field-error_active"
        }`}>{errors.picture}</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
