
function ImagePopup(props) {
  return (
    <div id="popup-fullscr-img" className={`popup popup_picture_fullscreen ${props.card.link ? "popup_opened" : ""}`} >
      <figure className="popup__window popup__window_picture">
        <img className="popup__picture" src={props.card.link} />
        <button type="button" className="popup__button-exit popup__button-exit_place_picture_fullscreen" onClick={props.onClose}></button>
        <figcaption className="popup__picture-name">{props.card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;

