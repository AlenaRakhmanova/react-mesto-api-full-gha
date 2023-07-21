import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import { api } from "../utils/Api.js";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
// import * as authApi from "./Auth.js";
import { auth } from "./Auth.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopup, setConfirmationPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isCardImageOpen, setCardImageOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [removingCard, setRemovingCard] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .getInfoUser()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
      .getAllCards(cards)
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setCardImageOpen(true);
  }

  function openSuccessNotifications() {
    setInfoTooltipOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .setInfoUser(data)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .updateAvatar(data)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(place) {
    setIsLoading(true);
    api
      .addNewCard(place)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardDelete() {
    api
      .deleteCard(removingCard._id)
      .then(() => {
        const newListOfCards = cards.filter((c) => c._id !== removingCard._id);
        setCards(newListOfCards);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function confirmDeleteCard(card) {
    setConfirmationPopup(true);
    setRemovingCard(card);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
    setCardImageOpen(false);
    setConfirmationPopup(false);
    setInfoTooltipOpen(false);
  }

  function handleRegister(password, email) {
    auth
      .register(password, email)
      .then((data) => {
        if (data) {
          setSuccess(true);
          openSuccessNotifications();
          navigate("/sign-in", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setSuccess(false);
        openSuccessNotifications();
      });
  }

  function handleLogin(password, email) {
    auth
      .login(password, email)
      .then((data) => {
        if (data) {
          localStorage.setItem("token", data.token);
          setUserData(email);
          setLoggedIn(true);
          navigate("/my-profile", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setSuccess(false);
        openSuccessNotifications();
      });
  }

  function checkToken() {
    const token = localStorage.getItem("token");
    auth
      .getContent(token)
      .then((data) => {
        if (data) {
          setUserData(data.data.email);
          setLoggedIn(true);
          navigate("/my-profile", { replace: true });
        } else {
          setLoggedIn(false);
        }
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log(111111111);
        console.log(err);
      });
  }

  useEffect(() => {
    checkToken();
  }, []);

  if (loggedIn === null) {
    return <div></div>;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userData={userData} />
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? <Navigate to="/my-profile" replace /> : <Navigate to="/sign-in" replace />
            }
          />
          <Route
            path="/my-profile"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={
                  <>
                    <Main
                      onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      onCardDelete={confirmDeleteCard}
                      cards={cards}
                    />
                    <EditProfilePopup
                      isOpen={isEditProfilePopupOpen}
                      onClose={closeAllPopups}
                      onUpdateUser={handleUpdateUser}
                      textButton={isLoading}
                    />
                    <EditAvatarPopup
                      isOpen={isEditAvatarPopupOpen}
                      onClose={closeAllPopups}
                      onUpdateAvatar={handleUpdateAvatar}
                      textButton={isLoading}
                    />
                    <AddPlacePopup
                      isOpen={isAddPlacePopupOpen}
                      onClose={closeAllPopups}
                      onAddPlace={handleAddPlaceSubmit}
                      textButton={isLoading}
                    />
                    <ImagePopup
                      onClose={closeAllPopups}
                      card={selectedCard}
                      isOpen={isCardImageOpen}
                    />
                    <ConfirmationPopup
                      isOpen={isConfirmationPopup}
                      onClose={closeAllPopups}
                      onConfirm={handleCardDelete}
                    />
                  </>
                }
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <>
                <Login handleLogin={handleLogin} />
                <InfoTooltip
                  isOpen={isInfoTooltipOpen}
                  onClose={closeAllPopups}
                  isSuccess={isSuccess}
                />
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <Register handleRegister={handleRegister} />
                <InfoTooltip
                  isOpen={isInfoTooltipOpen}
                  onClose={closeAllPopups}
                  isSuccess={isSuccess}
                />
              </>
            }
          />
          <Route path="*" element={<div>404</div>} />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
