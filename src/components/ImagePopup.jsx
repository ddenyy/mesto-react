
function ImagePopup (props) {
    
    return (
        <div id="popup-fullscr-img" className="popup popup_picture_fullscreen" >
            <figure className="popup__window popup__window_picture">
                <img className="popup__picture" src=" "/>
                <button type="button" className="popup__button-exit popup__button-exit_place_picture_fullscreen"></button>
            <figcaption className="popup__picture-name"></figcaption>
            </figure>
        </div>
    );
}

export default ImagePopup;