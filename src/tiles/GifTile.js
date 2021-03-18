import React from "react";

const GifTile = (props) => {
    const url = props.url

    return (
        <div>
            <img src={url} alt={url}/>
        </div>
    );
};

export default GifTile;
