import React from 'react'

const GetStarted = (props) => {
    const {setName, submitHandler} = props

    return(
        <div className="mt-4 text-center">
            <h2 className="card-title mt-5">Get started right now!</h2>
            <form onSubmit={submitHandler} className="mt-3 mb-5">
                <div className="form-group">
                    <input type="text" placeholder="Enter your name here .." onChange={(e) => setName(e.target.value)} className="form-control col-10 mx-auto" />
                </div>
                <input type="submit" value="Enter Chatroom" className="btn btn-success" />
            </form>
        </div>
    )
}
export default GetStarted