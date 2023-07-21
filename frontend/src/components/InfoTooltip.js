import luck from ".././images/icons/luck.svg";
import fail from ".././images/icons/fail.svg";
import Popup from "./Popup";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <Popup isOpen={isOpen} name={"notification"} onClose={onClose}>
      <img className="popup__icon" src={isSuccess ? luck : fail} alt="оповещение" />
      <h3 className="popup__title popup__title_notification">
        {isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
      </h3>
    </Popup>
  );
}

export default InfoTooltip;
