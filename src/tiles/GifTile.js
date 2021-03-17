import React from "react";

const GifTile = (props) => {
    const url = props.url
    const count = props.count

    return (
        <div>
            <p>{count}</p>
            <img src={url} alt={url}/>
        </div>
    );
};

export default GifTile;
