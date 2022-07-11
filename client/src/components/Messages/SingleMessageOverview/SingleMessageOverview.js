import React, { useContext, useEffect, useRef, useState } from "react";

import avatar from "../../../assets/icons/avatar.svg";
import { Link, useParams } from "react-router-dom";

import "./SingleMessageOverview.css";
import { AppContext } from "../../../hooks/AppContext";
import dispatch from "../../../dispatcher/dispatch";
import actions from "../../../dispatcher/actions";

const SingleMessageOverview = ({ room, chatId }) => {
    const [receiver, setReceiver] = useState({});
    const { contextStore, setContextStore } = useContext(AppContext);

    //traccking active session of a user
    const [activeSessionUpdate, setActiveSessionUpdate] = useState(0);
    const [activeSessions, _setActiveSessions] = useState(0);
    const activeSessionRef = useRef(0);
    const setActiveSessions = (activeSessionss) => {
        activeSessionRef.current = activeSessionss;
        setActiveSessionUpdate((past) => past + 1);
    };
    useEffect(() => {}, []);
    useEffect(() => {
        _setActiveSessions(activeSessionRef.current);
    }, [activeSessionUpdate]);

    //tracking how many unseen messages in this room for this specific user
    const [unseenMessageUpdate, setUnseenMessageUpdate] = useState(0);
    const [unseenMessages, _setUnseenMessages] = useState(0);
    const unseenMessagesRef = useRef(0);
    const setUnseenMessages = (unseenMessages) => {
        unseenMessagesRef.current = unseenMessages;
        setUnseenMessageUpdate((past) => past + 1);
    };
    useEffect(() => {
        (async () => {
          const response = await dispatch(
            actions.getLastMessage,
            { roomId: room._id },
            {},
            contextStore.user.token
        );
        console.log(response)
        if(response){
          if(response.errors){
            return
          }
          setLastMessage(response)
        }
        })();
        _setUnseenMessages(unseenMessagesRef.current);
    }, [unseenMessageUpdate]);

    //tracking the last message of this room by any user
    const [lastMessage, setLastMessage] = useState("")
    //base class loader
    useEffect(() => {
        (async () => {
            const leftParticipants = room.participants.filter(
                (participant) =>
                    participant._id.toString() !==
                    contextStore.user._id.toString()
            );
            const receiver = leftParticipants[0];
            setReceiver(receiver);
            //at first getting the active sessions
            let response = await dispatch(actions.getUserActiveSessions, {
                userId: receiver._id,
            });
            console.log(response);
            if (response.errors) {
                return;
            }
            setActiveSessions(response.activeSessions);

            //then getting the number of available unseen messages
            response = await dispatch(
                actions.getNotViewedMessageCount,
                { roomId: room._id },
                {},
                contextStore.user.token
            );
            console.log(response);
            if (response.errors) {
                return;
            }
            setUnseenMessages(response.count);

            //then getting the last message
            response = await dispatch(
                actions.getLastMessage,
                { roomId: room._id },
                {},
                contextStore.user.token
            );
            console.log(response);
            if (response) {
                if (response.errors) {
                    return;
                }
                setLastMessage(response);
            }
            

            //joining user session
            contextStore.socket.emit("joinUserSessionStatus", [receiver._id]);
            //joining chat room session
            contextStore.socket.emit("joinChatRoomSession", [room._id]);
            //getting session of this specific receiver
            contextStore.socket.on(
                `session${receiver._id}`,
                sessionEventListener
            );
            //getting room session of this specific room
            contextStore.socket.on(
                `roomSession${room._id}`,
                roomSessionListener
            );
        })();
        return () => {
            //cleanup
            contextStore.socket.emit("leaveUserSessionStatus", [receiver._id]);
            contextStore.socket.emit("leaveChatRoomSession", [room._id]);
            contextStore.socket.off(`session${receiver._id}`);
            contextStore.socket.off(`roomSession${room._id}`);
            
        };
    }, []);

    const roomSessionListener = (unseenMessages) => {
        setUnseenMessages(unseenMessages);
    };
    const sessionEventListener = (activeSessions) => {
        setActiveSessions(activeSessions);
    };
    //class loader on change chatId
    useEffect(() => {
        if (chatId) {
            //if you go into the room
            if (chatId.toString() === room._id.toString()) {
                setUnseenMessages(0);
            }
            //if you go into some other room
            else{
              (async () => {
                const response = await dispatch(
                  actions.getLastMessage,
                  { roomId: room._id },
                  {},
                  contextStore.user.token
              );
              console.log(response)
              if(response){
                if(response.errors){
                  return
                }
                setLastMessage(response)
              }
              })();
            }
        }
    }, [chatId]);
    return (
        <Link to={`/messages/${room._id}`} className="singleMessageOverview">
            <div className="singleMessageOverview__imageContainer">
                <img
                    src={receiver.profileImage ? receiver.profileImage : avatar}
                    className="singleMessageOverview__image"
                />
            </div>
            <div className="singleMessageOverview__text">
                <div className="singleMessageOverview__nameAndActive">
                    <div className="singleMessageOverview__name">{`${receiver.firstName} ${receiver.lastName}`}</div>
                    {activeSessions > 0 && (
                        <div className="singleMessageOverview__active"></div>
                    )}
                </div>
                <div className="singleMessageOverview__messageContainer">
                    <div
                        className={`singleMessageOverview__message ${
                            unseenMessages !== 0 ? "highlightedMessage" : ""
                        }`}
                    >
                        {lastMessage.sender._id === contextStore.user._id ? chatId !== room._id && `You: ${lastMessage.text}` : chatId !== room._id && `${lastMessage.sender.firstName}: ${lastMessage.text}`}
                    </div>
                    {unseenMessages !== 0 && (
                        <div className="singleMessageOverview__messageCircle">
                            {unseenMessages}
                        </div>
                    )}
                </div>
            </div>
            <div className="singleMessageOverview__time">2:21 AM</div>
        </Link>
    );
};

export default SingleMessageOverview;
