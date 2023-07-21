import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup({ isOpen, onClose, onConfirm }) {
  function handleConfirmationDelete(e) {
    e.preventDefault();
    onConfirm();
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name={"confirmation"}
      title={"Вы уверены?"}
      textButton={"Да"}
      typeButton={"submit"}
      onSubmit={handleConfirmationDelete}
      isValid={true}
    ></PopupWithForm>
  );
}

export default ConfirmationPopup;
