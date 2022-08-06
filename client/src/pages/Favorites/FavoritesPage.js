import Favorites from "../../components/Favorites/Favorites"
import ComponentWithSideBar from "../../layouts/ComponentWithSideBar"
import React from "react"



const FavoritesPage = () => {
    return (
        <ComponentWithSideBar>
            <Favorites />
        </ComponentWithSideBar>
    )
}

export default FavoritesPage