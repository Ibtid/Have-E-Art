import React, { useContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import actions from "../../dispatcher/actions";
import dispatch from "../../dispatcher/dispatch";
import { AppContext } from "../../hooks/AppContext";
import { SpinnerContext } from "../../hooks/SpinnerContext";
import "./MessagePrompt.css";

const MessagePrompt = (props) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const ref = useRef();
    const [pop, setPop] = useState("pop__up");
    const [showForm, setShowForm] = useState(true);
    const [formData, setformData] = useState({
        message: "",
    });
    const { setShowSpinner } = useContext(SpinnerContext);
    const { contextStore, setContextStore } = useContext(AppContext);

    const onChangeFormData = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    };
    const onClickSubmit = async () => {
        if (formData.message) {
            setShowSpinner(true);
            let response = await dispatch(
                actions.createRoom,
                {},
                { user: { _id: id } },
                contextStore.user.token
            );
            const roomId = response._id;
            response = await dispatch(
                actions.sendMessage,
                { roomId },
                { text: formData.message, receiver: { _id: id } },
                contextStore.user.token
            );
            navigate(`/messages/${roomId}`);
            setShowSpinner(false);
            setPop("pop__down");
            setTimeout(() => {
                props.closeForm();
            }, 300);
        } 
    };
    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (showForm && ref.current && !ref.current.contains(e.target)) {
                setPop("pop__down");
                setTimeout(() => {
                    setShowForm(false);
                    props.closeForm();
                }, 300);
            }
        };

        document.addEventListener("mousedown", checkIfClickedOutside);

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [showForm]);

    return ReactDOM.createPortal(
        <div
            className="cardDetails"
            onClick={() => {
                setShowForm(true);
            }}
        >
            <div ref={ref}>
                {showForm && (
                    <div
                        className={`cardDetails__container ${pop}`}
                        onClick={() => {
                            setShowForm(true);
                        }}
                    >
                        <div className="cardDetails__label">Message:</div>
                        <input
                            className="cardDetails__inputBig"
                            placeholder="Start a conversation"
                            name="message"
                            value={formData.message}
                            onChange={onChangeFormData}
                        />
                        <div className="newGroup__button"></div>
                        <div
                            className="cardDetails__button"
                            onClick={onClickSubmit}
                        >
                            Send
                        </div>
                    </div>
                )}
            </div>
        </div>,
        document.getElementById("messagePrompt")
    );
};

export default MessagePrompt;
