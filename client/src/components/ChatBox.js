import React from 'react';
import styles from '../module.css/Chat.module.css' 

const ChatBox = (props) => {
    return(
        <div className="position-fixed fixed-bottom">
            <nav className="col-4 navbar navbar-dark bg-dark text-white" data-toggle="collapse" data-target="#collapseChat" aria-expanded="false" aria-controls="collapseChat">
                <span className="font-weight-bold">Let's talk!!! (Recent Movies Discussion)</span>
            </nav>
            <div className="collapse col-4 bg-warning" id="collapseChat">
                <div className={styles.chatBox}>
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                </div>
                <div className="input-group">
                    {/* <div className="input-group-prepend">
                        <button className="btn btn-secondary dropdown-toggle rounded-0" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">HI!</button>
                        <div className="dropdown-menu my-2">
                            <div>...</div>
                        </div>
                    </div> */}
                    <input type="text" class="form-control rounded-0" placeholder=""/>
                    <div className="input-group-append">
                        <button className="btn btn-secondary rounded-0" type="button">Send!</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ChatBox