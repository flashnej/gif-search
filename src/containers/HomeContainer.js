import React, { useState } from "react";
import GifTile from "../tiles/GifTile"

const HomeContainer = (props) => {
    const [search, setSearch] = useState("")
    const [gifs, setGifs] = useState([])
    const [featuredTile, setFeaturedTile] = useState(0)


    var apiKey = process.env.REACT_APP_apiKey
    var apiURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${search}&limit=50&offset=0&lang=en`

    const onSubmit = (value) => {
        value.preventDefault()
        fetch(apiURL)
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            setGifs(response.data)
        })
    }

    const handleChange = (value) => {
        setSearch(value.currentTarget.value)
    }

    let gifTiles = []
    if (gifs.length !== 0) {
        for (let i=0; i<3; i++) {
            gifTiles.push(<GifTile
                key = {gifs[featuredTile + i]["id"]}
                url = {gifs[featuredTile + i]["images"]["downsized_large"]["url"]}
                />)
        }
    }

    const add = (value) => {
        value.preventDefault()
        setFeaturedTile(featuredTile + 1)
    }

    return (
        <div>
            <form>
                <label>Search: </label>
                <input type="text" id="search" name="search" onChange = {handleChange} ></input>
                <button onClick = {onSubmit}> Submit</button>
                {gifTiles}
                <button onClick = {add}>+</button>
            </form>
        </div>
    );
};

export default HomeContainer;
