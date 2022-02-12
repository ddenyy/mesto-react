
function PopupWithForm (props) {

    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen && "popup_opened"}`}>
        <div className="popup__window">
            <button type="button" className={`popup__button-exit popup__button-exit_place_${props.name}`} onClick={props.onClose} ></button>
            <form name={`form_${props.name}`} className="form popup__content" noValidate>
                <h2 className="popup__title">{props.title}</h2>
                {props.children}
                <button type="submit" className="popup__button popup__button_submit">{props.submitText}</button>
            </form>
        </div>
    </div>
    );
}

export default PopupWithForm