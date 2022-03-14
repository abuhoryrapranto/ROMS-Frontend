import classnames from 'classnames';

function Large(props) {
    const styleClass = classnames(
        "px-20 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150",
        props.bgColor,
        props.textColor,
        props.float,
        props.fontWeight,
        props.textSize,
        props.hover,
    );
    return (
    <button className={styleClass} type="button" onClick={props.click} style={{"marginBottom": props.marginBottom}}>
        {props.name}
    </button>
    );
}

export default Large;