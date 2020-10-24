import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'


const CollapseButton = (props) => {
    const { open, setOpen } = props
    const [readMoreLess, setReadMoreLess] = useState("Read More");

    const moreLessHandler = (e) => {
        if(readMoreLess === "Read More") {
            setReadMoreLess("Collapse")
            setOpen(!open)
        } else {
            setReadMoreLess("Read More")
            setOpen(!open)
        }
    }

    return (
        <div>
            {/* A button to view more popular movies */}
            <Button
                onClick={moreLessHandler}
                aria-controls="example-collapse-text"
                aria-expanded={open}
                className="btn btn-dark mt-3 mb-5"
            >
            {readMoreLess}
            </Button>
        </div>
    )
}
export default CollapseButton;