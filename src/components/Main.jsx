import React from 'react';
import ReactDOM from 'react-dom';
import api from "../utils/Api.js";
import Card from "./Card.jsx"

function Main(props) {

  const [userName, setUserName] = React.useState("User-name");
  const [userDescription, setUserDescription] = React.useState("About-user");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.renderUserAndCards()
      .then(([user, data]) => {
        setUserName(user.name);
        setUserDescription(user.about);
        setUserAvatar(user.avatar);
        setCards(data)
      })
      .catch((err) => {console.log(err)})
  }, [])
  

  return (
    <div className="content page__content">
      <section className="profile content__profile">
        <div className="profile__image" style={{ backgroundImage: `url(${userAvatar})` }} onClick={props.onEditAvatar}></div>
        <div className="profile__info">
          <h1 className="profile__username">{userName}</h1>
          <button aria-label="edit" type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
          <p className="profile__job">{userDescription}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
      </section>
      <section className="places page__places">
        {cards.map((card) => {
          
          return (
            <Card key={card._id} data={card} onCardClick={props.onCardClick} />
          );
        })}
      </section>
    </div>
  );
};

export default Main