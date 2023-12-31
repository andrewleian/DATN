import { useState, useRef, useEffect } from 'react'

import style from './Header3.module.scss'
import clsx from 'clsx'

const carouselList = [
    { title: 'CHÚC BẠN MỘT NGÀY MỚI TỐT LÀNH' },
    { title: 'BUY 2 GET 10% OFF - ÁP DỤNG VỚI TẤT CẢ BASIC TEE' }
]

function Header3() {
    const [current, setCurrent] = useState(0);
    const itemRef = useRef();

    const next = () => {
        // itemRef.current.style.opacity = 0;
        // setTimeout(() => {
        //     setCurrent((prevState) =>
        //         prevState === carouselList.length - 1 ? 0 : prevState + 1
        //     );
        //     itemRef.current.style.opacity = 1;
        // }, 500);
    };

    const prev = () => {
        // itemRef.current.style.opacity = 0;
        // setTimeout(() => {
        //     current === 0 ? setCurrent(carouselList.length - 1) : setCurrent(prevState => prevState - 1);
        //     itemRef.current.style.opacity = 1;
        // }, 500)

    }

    useEffect(() => {
        setInterval(() => {
            next();
        }, 10000)
    }, [])
    return (
        <div>
            <div className={clsx(style.carousel)}>
                <p ref={itemRef} className={clsx(style.item)}>{carouselList[current].title}</p>
                <button className={clsx(style.next)} onClick={next}><i className="fa-solid fa-chevron-right"></i></button>
                <button className={clsx(style.prev)} onClick={prev}><i className="fa-solid fa-chevron-left"></i></button>
            </div>

        </div>
    )
}
export default Header3