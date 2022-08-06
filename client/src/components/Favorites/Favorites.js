import { useContext, useEffect, useState } from "react";
import actions from "../../dispatcher/actions";
import dispatch from "../../dispatcher/dispatch";
import { AppContext } from "../../hooks/AppContext";
import { SpinnerContext } from "../../hooks/SpinnerContext";
import ProductShowcaseCard from "../cards/ProductShowcaseCard/ProductShowcaseCard";

import "./Home.css"

const Favorites = () => {
    const { setShowSpinner } = useContext(SpinnerContext);
    const {contextStore} = useContext(AppContext)
    const [earts, setEarts] = useState([]);

    useEffect(() => {
        if(contextStore.user){
            (async () => {
                setShowSpinner(true);
                const response = await dispatch(actions.getFollowedEarts, {}, {}, contextStore.user.token);
                console.log(response);
                if (response.errors) {
                    setShowSpinner(false);
                    return;
                }
                setEarts(response);
                setShowSpinner(false);
            })();
        }
    }, []);
    return (
        <div className="home__cardContainer ">
            {earts.map((eart) => (
                <ProductShowcaseCard eart={eart} key={eart._id} />
            ))}
        </div>
    );
};

export default Favorites
