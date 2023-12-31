import { useState, useRef } from 'react'

import clsx from 'clsx'
import style from './Input.module.scss'



function Input({ value, setValue, placeHolder, styleCss }) {
    const inputRef = useRef();

    // const keys = Object.keys(styleCss);

    // keys.map((key , index) => {
    //     inputRef.current.style[key] = styleCss[key]
    // })

    return (
        <div style={{width:"50px"}}>
            <input value={value} onChange={(e) => setValue(e.target.value)} ref={inputRef} className={clsx(style.input)} placeholder={placeHolder} />
        </div>
    )
}

export default Input;