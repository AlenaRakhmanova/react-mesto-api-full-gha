import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, handleCardClick, handleCardLike, handleDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardButtonDeleteClassName = `elements__button-delete opacity-hover ${
    isOwn && "elements__button-delete_active"
  }`;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__button-like ${
    isLiked && "elements__button-like_active"
  }`;

  function onCardClick() {
    handleCardClick(card);
  }

  function onCardLike() {
    handleCardLike(card);
  }

  function onCardDelete() {
    handleDeleteClick(card);
  }

  return (
    <div className="elements__place">
      <img className="elements__image" src={card.link} alt={card.name} onClick={onCardClick} />
      <button type="button" className={cardButtonDeleteClassName} onClick={onCardDelete}></button>
      <div className="elements__caption">
        <h3 className="elements__title">{card.name}</h3>
        <div className="elements__likes">
          <button type="button" className={cardLikeButtonClassName} onClick={onCardLike}></button>
          <span className="elements__number-like">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
