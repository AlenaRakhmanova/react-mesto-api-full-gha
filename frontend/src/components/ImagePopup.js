import Popup from "./Popup";

function ImagePopup({ card, onClose, isOpen }) {
  return (
    <Popup
      isOpen={isOpen}
      name={"image"}
      onClose={onClose}
      classContainer={"popup__container_content_images"}
    >
      <img className="popup__image" src={card.link} alt={card.name} />
      <h3 className="popup__title popup__title_image">{card.name}</h3>
    </Popup>
  );
}

export default ImagePopup;
