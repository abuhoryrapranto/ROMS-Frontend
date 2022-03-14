import classnames from 'classnames';

function Medium(props) {
    const styleClass = classnames(
        "px-10 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm",
        props.bgColor,
        props.textColor,
        props.float,
        props.fontWeight,
        props.textSize,
        props.hover,
        props.focusColor,
    );
    return (
    <button className={styleClass} type="button" onClick={props.click} style={{"marginBottom": props.marginBottom}}>
        {props.name}
    </button>
    );
}

export default Medium;