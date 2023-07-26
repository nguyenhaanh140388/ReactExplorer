export default function FormExploring(props) {

    if (props.hasPreventDefault)
        return (
            <form onSubmit={e => {
                e.preventDefault();
            }}>
                <button>Send(No Reload)</button>
            </form>
        );
    else {
        return (
            <form onSubmit={e => {
            }}>
                <button>Send(Reload)</button>
            </form>
        );
    }
}