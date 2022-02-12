import React from 'react';
import ReactDOM from 'react-dom';

function Card (props) {

    return (
            <article class="place">
                <button class="place__button-delete"></button>
                <img class="place__image" src={props.data.link} alt={props.data.name}/>
                <div class="place__item">
                    <h2 class="place__title">{props.data.name}</h2>
                    <div class="place__container_like">
                    <button type="button" class="place__heart-button"></button>
                    <p class="place__heart-quantity">{props.data.likes.length}</p>
                    </div>
                </div>
            </article>
  );
}

export default Card;