import React, { useState } from "react";
import GifTile from "../tiles/GifTile"
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const HomeContainer = (props) => {
    const [search, setSearch] = useState("")
    const [gifs, setGifs] = useState([])
    const [featuredTile, setFeaturedTile] = useState(0)
    const [darkMode, setDarkMode] = useState('lightApp')
    console.log(featuredTile)


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
            // NEED TO GET THE EDGE NUMBERS PROGRAMATICALLY
            if (featuredTile >= gifs.length - 1) {
                setFeaturedTile(0)
            } else {
                setFeaturedTile(featuredTile + 1)
            }
        } else if (value.currentTarget.id === "-") {
            if (featuredTile <= 0) {
                setFeaturedTile(gifs.length - 1)
            } else {
                setFeaturedTile(featuredTile - 1)
            }
        }
    }

    let gifTiles = []
    if (gifs.length !== 0) {

        let prevTileIndex
        let nextTileIndex
        if (featuredTile === 0) {
            prevTileIndex = gifs.length - 1
            nextTileIndex = 1
        } else if (featuredTile === gifs.length - 1) {
            prevTileIndex = gifs.length - 2
            nextTileIndex = 0
        } else {
            prevTileIndex = featuredTile - 1
            nextTileIndex = featuredTile + 1
        }

        gifTiles.push(
            <Col>
                <button onClick = {add} id="-">&lt;-</button>
            </Col>
        )
        gifTiles.push(
            <Col className="secondaryTile">
                <GifTile
                    key = {gifs[prevTileIndex]["id"]}
                    url = {gifs[prevTileIndex]["images"]["downsized"]["url"]}
                />
            </Col>
        )
        gifTiles.push(
            <Col className="primaryTile">
                <GifTile
                    key = {gifs[featuredTile]["id"]}
                    url = {gifs[featuredTile]["images"]["downsized"]["url"]}
                />
            </Col>
        )
        gifTiles.push(
            <Col className="secondaryTile">
                <GifTile
                    key = {gifs[nextTileIndex]["id"]}
                    url = {gifs[nextTileIndex]["images"]["downsized"]["url"]}
                />
            </Col>
        )
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
                    <Form>
                        <label>Dark Mode:</label>
                        <Form.Switch type="switch" id="custom-switch" onClick = {toggleDarkMode}/>
                    </Form>
                </Row>
                <Row>
                    <div className="search">
                        <Form>
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
