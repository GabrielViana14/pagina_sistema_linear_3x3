import React from 'react';

function EntradaValor(props) {

    const handleKeyPress = (event) => {
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
    };

    const handlePaste = (event) => {
        const pasteData = event.clipboardData.getData('text/plain');
        if (!/^\d+$/.test(pasteData)) {
            event.preventDefault();
        }
    };

    return (
    <input 
        type="text" 
        name={props.name} 
        id={props.id} 
        size={1} 
        onPaste={handlePaste}
        onChange={props.onChange}
        className='form_field'
    />
    );
}

export default EntradaValor;
