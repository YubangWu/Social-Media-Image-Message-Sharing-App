import React from 'react';
import "../styles/Button.css"

function Button(props) {
  return (
    <div class="container">
      <button class="btn" onClick={props.onClick}>{props.text}</button>
    </div>

  );
}

export default Button;