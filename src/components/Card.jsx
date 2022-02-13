import React from 'react';
import ReactDOM from 'react-dom';

function Card (props) {

    function handleClick() {
        props.onCardClick(props.data);
      }  

    return (
            <article className="place">
                <button className="place__button-delete"></button>
                <img className="place__image" src={props.data.link} alt={props.data.name} onClick={handleClick}/>
                <div className="place__item">
                    <h2 className="place__title">{props.data.name}</h2>
                    <div className="place__container_like">
                    <button type="button" className="place__heart-button"></button>
                    <p className="place__heart-quantity">{props.data.likes.length}</p>
                    </div>
                </div>
            </article>
  );
}

export default Card;