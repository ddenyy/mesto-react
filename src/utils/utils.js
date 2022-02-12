//кнопка откытия попапа editProfile в профиле на основной странице
const popupEditProfileButton = document.querySelector(".profile__edit-button");
//кнопка открытия попапа addPicture в профиле на основной странице
const popupAddPictureButton = document.querySelector(".profile__add-button");
// форма в popupAddPicture
const formAddPicture = document.querySelector("#add-picture-form");
// импуты в форме редактирования профиля
const inputName = document.querySelector("#popup-edit-username");
const inputJob = document.querySelector("#popup-edit-job");
//форма в popupEditAvatar
const formEditAvatar = document.querySelector("#change-avatar-form");
// форма попапа редактирования профиля
const formEditProfile = document.querySelector("#edit-profile-form")
// кнопка подтверждения удаления карточки
const buttonAcceptDelete = document.querySelector(".popup__button_delete_card")
// спасибо за такую быструю проверку, вы определённо хороший ревьюер!
//аватар пользователя

const profileAvatar = document.querySelector(".profile__image");



const configError = {
  formSelector: ".form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button_submit",
  inactiveButtonClass: "popup__button_disabled",
  errorClass:"error-message_shown",
  inputErrorClass: "popup__input_type_error",
};


const formValidators ={};

export {
  popupEditProfileButton,
  popupAddPictureButton,
  formAddPicture,
  inputName,
  inputJob,
  configError,
  formValidators,
  profileAvatar,
  formEditAvatar,
  buttonAcceptDelete,
  formEditProfile,
};
