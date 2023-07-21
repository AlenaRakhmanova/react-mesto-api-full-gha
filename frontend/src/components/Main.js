import { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__flex">
          <div className="profile__container-avatar" onClick={onEditAvatar}>
            <img className="profile__avatar" src={currentUser.avatar} alt="аватар" />
          </div>
          <div className="profile__info">
            <h1 className="profile__full-name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__button-edit opacity-hover"
              onClick={onEditProfile}
            ></button>
            <p className="profile__information">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__button-add opacity-hover"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            handleCardClick={onCardClick}
            handleCardLike={onCardLike}
            handleDeleteClick={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
