import classnames from 'classnames';

function Small(props) {
    const styleClass = classnames(
        "px-4 py-2 rounded shadow outline-none focus:outline-none focus:shadow-outline mr-1 mb-1 ease-linear transition-all duration-150",
        props.bgColor,
        props.textColor,
        props.float,
        props.fontWeight,
        props.textSize,
        props.hover
    );
    return (
    <button className={styleClass} type={props.type} onClick={props.click}>
        {props.name}
    </button>
    );
}

export default Small;