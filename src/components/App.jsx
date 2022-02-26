import React from 'react';
import ReactDOM from 'react-dom';
import "../App.css";
import "../index.css";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";
import api from '../utils/Api';
import { currentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import {configError} from "../utils/utils.js"

function App() {
  // стейт открытия попапа редактирования профиля 
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  // стейт открытия попапа добавления карточки 
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  // стейт открытия поапап редактирования аватара
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  // стейт для попапа открытия карточки на fullscreen
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  // стейт для информации текущего пользователя 
  const [currentUser, setCurrentUser] = React.useState({});
  // стейт для карточекы
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    // рендер информации пользователя
    api.getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo)
      })
      .catch((err) => {
        console.log(err)
      })

    // рендер каточек с сервера
    api.getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => { console.log(err) });
  }, [])


  // управление попапом изменение аватарки
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  // управление попапом редактирования профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  // управление попапом добавления карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: '', link: '' })
  }

  // управление открытием картинки на весь экран 
  function handleCardClick(data) {
    setSelectedCard(data)
  }

  function handleUpdateUser(data) {
    api.updateUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
      })
      .then(() => {
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(data) {
    api.updateUserAvatar(data.avatar)
      .then((newData) => {
        console.log(newData);
        setCurrentUser(newData);
        closeAllPopups()
      })
      .catch((err) => { console.log(err) })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.setLike(card)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
    }
    else {
      api.deleteLike(card)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
        })
        .catch((err) => { console.log(err) })
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card)
      .then((data) => {
        setCards((state) => {
          let copyState = state.filter((item) => {
            if (item._id != card._id) {
              return true
            }
            else {
              return false
            }
          })
          return copyState
        })
      })
  }

  function handleAddPlace(data) {
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="App">
      <currentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__container">
            <Header />
            <Main
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
            />
            <Footer />
            <EditProfilePopup
              onUpdateUser={handleUpdateUser}
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlace}
            />
            <ImagePopup
              card={selectedCard}
              onClose={closeAllPopups} />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar} 
            />
            <PopupWithForm name="delete_card" title="Вы уверены ?" submitText="Да" />
          </div>
        </div>
      </currentUserContext.Provider>
    </div>
  );
}

export default App;
