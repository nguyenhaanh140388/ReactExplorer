import React, { Fragment } from "react";

const LabelCloneElement = (props) => {
    return (
        <section>
            <label style={{ color: props.color }}>CloneElementExample</label>
        </section>

    );
}

const Parent = ({ children }) => {
    return React.Children.map(children,
        (child, i) => {                     // props
            const newChildren = React.cloneElement(
                child, {
                color: '#DC7633'
            })

            return newChildren;
        });
}


export default function CloneElementExample() {
    return (
        <div >
            <Parent>
                <LabelCloneElement />
                <LabelCloneElement />
                <LabelCloneElement />
                <LabelCloneElement />
                <LabelCloneElement />
                <LabelCloneElement />
                <LabelCloneElement />
                <LabelCloneElement />
            </Parent>
        </div>
    );
}