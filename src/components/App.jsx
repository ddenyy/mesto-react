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
import EditProfilePopup from "./EditProfilePopup.jsx"

function App() {
  // стейт открытия попапа редактирования профиля 
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  // стейт открытия попапа добавления карточки 
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  // стейт открытия поапап редактирования аватара
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  // стейт для попапа открытия карточки на fullscreen
  const [selectedCard, setIsSelectedCard] = React.useState({ name: '', link: '' });
  // стейт для информации текущего пользователя 
  const [currentUser, seIsCurrentUser] = React.useState({})

  React.useEffect(() => {
    api.getUserInfo()
      .then((userInfo) => {
        seIsCurrentUser(userInfo)
      })
      .catch((err) => {
        console.log(err)
      })
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
    setIsSelectedCard({ name: '', link: '' })
  }

  // управление открытием картинки на весь экран 
  function handleCardClick(data) {
    setIsSelectedCard(data)
  }

  return (
    <div className="App">
      <currentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__container">
            <Header />
            <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} />
            <Footer />
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
            <PopupWithForm name="add_picture" title="Новое место" submitText="Добавить" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
              <fieldset className="popup__contact-info">
                <div className="input-container">
                  <input name="picture-name" type="text" className="popup__input" id="popup-picture-name" autoComplete="off" placeholder="Название" required minLength="2" maxLength="30" />
                  <span className="error-message popup-picture-name-error">test</span>
                </div>
                <div className="input-container">
                  <input name="picture-link" type="url" className="popup__input" id="popup-picture-link" autoComplete="off" placeholder="Ссылка на картинку" required />
                  <span className="error-message popup-picture-link-error">test</span>
                </div>
              </fieldset>
            </PopupWithForm>
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            <PopupWithForm name="change_avatar" title="Обновить аватар" submitText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
              <fieldset className="popup__contact-info">
                <div className="input-container input-container_single">
                  <input name="avatar-image" type="url" className="popup__input" id="popup-change-avatar" autoComplete="off" placeholder="Ссылка на картинку" required />
                  <span className="error-message popup-change-avatar-error">test</span>
                </div>
              </fieldset>
            </PopupWithForm>
            <PopupWithForm name="delete_card" title="Вы уверены ?" submitText="Да" />
          </div>
        </div>
      </currentUserContext.Provider>
    </div>
  );
}

export default App;
