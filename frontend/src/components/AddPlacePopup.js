import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormAndValidation from "../hooks/useFormAndValidation";

function AddPlacePopup({ isOpen, onClose, onAddPlace, textButton }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  function handleSubmitNewPlace(e) {
    e.preventDefault();
    onAddPlace({ name: values.place, link: values.photo });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name={"add"}
      title={"Новое место"}
      textButton={textButton ? "Сохранение..." : "Сохранить"}
      typeButton={"submit"}
      method={"post"}
      onSubmit={handleSubmitNewPlace}
      isValid={isValid}
    >
      <input
        type="text"
        id="place"
        name="place"
        placeholder="Название"
        required
        className="popup__field popup__field_value_place"
        minLength="2"
        maxLength="30"
        value={values.place || ""}
        onChange={handleChange}
      />
      <span
        className={`popup__field-error place-field-error ${
          !isValid && "popup__field-error_active"
        }`}
      >
        {errors.place}
      </span>
      <input
        type="url"
        id="photo"
        name="photo"
        placeholder="Ссылка на картинку"
        required
        className="popup__field popup__field_value_photo"
        value={values.photo || ""}
        onChange={handleChange}
      />
      <span
        className={`popup__field-error place-field-error ${
          !isValid && "popup__field-error_active"
        }`}
      >
        {errors.photo}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
