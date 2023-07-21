import Popup from "./Popup";

function PopupWithForm({
  isOpen,
  onClose,
  name,
  title,
  textButton,
  typeButton,
  method,
  children,
  onSubmit,
  isValid,
}) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <h3 className="popup__title">{title}</h3>
      <form
        name={`form-${name}`}
        method={method}
        className={`form popup__form popup__form_func_${name}`}
        onSubmit={onSubmit}
        noValidate
      >
        {children}
        <button
          type={typeButton}
          className={`popup__button-save ${!isValid && "popup__button-save_inactive"}`}
        >
          {textButton}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
