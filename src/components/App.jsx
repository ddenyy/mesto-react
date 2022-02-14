import React from 'react';
import ReactDOM from 'react-dom';
import "../App.css";
import "../index.css";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' })

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: '', link: '' })
  }

  function handleCardClick(data) {
    setSelectedCard(data)
  }

  return (
    <div className="App">
      <div className="page">
        <div className="page__container">
          <Header />
          <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} />
          <Footer />
          <PopupWithForm name="edit_profile" title="редактировать профиль" submitText="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
            <fieldset className="popup__contact-info">
              <div className="input-container">
                <input name="user-name" type="text" className="popup__input" id="popup-edit-username" placeholder="Введите имя" autoComplete="off" required minLength="2" maxLength="40" />
                <span className="error-message popup-edit-username-error">test</span>
              </div>
              <div className="input-container">
                <input name="user-job" type="text" className="popup__input" id="popup-edit-job" autoComplete="off" placeholder="чем занимаетесь ?" required minLength="2" maxLength="200" />
                <span className="error-message popup-edit-job-error">test</span>
              </div>
            </fieldset>
          </PopupWithForm>
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
    </div>
  );
}

export default App;
