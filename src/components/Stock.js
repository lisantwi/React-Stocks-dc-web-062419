import React from 'react'

const Stock = (props) => (


    <div onClick={() =>props.handleClick(props.stock)} className="card"> 
      <div className="card-body">
        <h5 className="card-title">{
            props.stock.name
          }</h5>
        <p className="card-text">{
            props.stock.price
          }</p>
      </div>
    </div>
);

export default Stock
