import React, { useState } from "react";

const HomeContainer = (props) => {
    const [search, setSearch] = useState("")

    const handleChange = (value) => {
        setSearch(value.currentTarget.value)
    }

    var apiKey = process.env.REACT_APP_apiKey
    var apiURL = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25&rating=r`
    const onSubmit = (value) => {
        value.preventDefault()
        fetch(apiURL)
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            debugger
        })
    }

    return (
        <div>
            <form>
                <label>Search: </label>
                <input type="text" id="search" name="search" onChange = {handleChange} ></input>
                <button onClick = {onSubmit}> Submit</button>
            </form>
        </div>
    );
};

export default HomeContainer;
