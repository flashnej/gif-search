import React, { useState } from "react";
import GifTile from "../tiles/GifTile"
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import Button from 'react-bootstrap/Button'


const HomeContainer = (props) => {
    const [search, setSearch] = useState("")
    const [gifs, setGifs] = useState([])
    const [featuredTile, setFeaturedTile] = useState(0)
    const [darkMode, setDarkMode] = useState('lightApp')


    var apiKey = process.env.REACT_APP_apiKey
    var apiURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${search}&limit=50&offset=0&lang=en`

    const onSubmit = (value) => {
        value.preventDefault()
        fetch(apiURL)
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            else {
                debugger
            }
        })
        .then((response) => {
            setGifs(response.data)
        })
    }

    const toggleDarkMode = (value) => {
        value.preventDefault()
        if (darkMode === 'lightApp') {
            setDarkMode('darkApp')
        } else {
            setDarkMode('lightApp')
        }
    }

    const handleChange = (value) => {
        setSearch(value.currentTarget.value)
    }

    const add = (value) => {
        value.preventDefault()
        if (value.currentTarget.id === "+") {
            setFeaturedTile(featuredTile + 1)
        } else if (value.currentTarget.id === "-") {
            setFeaturedTile(featuredTile - 1)
        }
    }

    let gifTiles = []
    if (gifs.length !== 0) {
        gifTiles.push(
        <Col>
            <button onClick = {add} id="-">&lt;-</button>
        </Col>
        )
        for (let i=0; i<3; i++) {
            if(gifTiles.length === 2) {
                gifTiles.push(
                    <Col className="primaryTile">
                        <GifTile
                            key = {gifs[featuredTile + i]["id"]}
                            url = {gifs[featuredTile + i]["images"]["downsized"]["url"]}
                        />
                    </Col>)       
            } else (
                gifTiles.push(
                    <Col className ="secondaryTile">
                        <GifTile
                            key = {gifs[featuredTile + i]["id"]}
                            url = {gifs[featuredTile + i]["images"]["downsized"]["url"]}
                        />
                    </Col>)
            )
        }
        gifTiles.push(
            <Col>
                <button onClick = {add} id="+">-&gt;</button>
            </Col>
        )
    }

    return (
        <div className={darkMode}>
            <Container fluid>
                <Row>
                    <div className="search">
                        <Form>
                            <label>Dark Mode:</label>
                            <Form.Switch type="switch" id="custom-switch" onClick = {toggleDarkMode}/>
                            <label>Search: </label>
                            <input type="text" id="search" name="search" onChange = {handleChange} ></input>
                            <button onClick = {onSubmit}> Submit</button>
                        </Form>
                    </div>
                </Row>
                <Row>
                    {gifTiles}
                </Row>
            </Container>
        </div>
    );
};

export default HomeContainer;
