import React, { useRef } from 'react'

const Pagination = ({ page, setPage }) => {

    const inputPage = useRef();
    const buttonSearchByPage = useRef();

    const handlerPrevious = () => {
        if (page >= 2) {
            localStorage.setItem("currentPage", String(page - 1));
            setPage(Number(page - 1))
        }
    }

    const handlerNext = () => {
        if (page <= 42479) {
            localStorage.setItem("currentPage", String(page + 1));
            setPage(Number(page + 1))
        }
    }

    const handlerChangeInputPage = () => {
        if (inputPage.current.value >= 1 && inputPage.current.value <= 42480) {
            buttonSearchByPage.current.disabled = false;
        } else {
            buttonSearchByPage.current.disabled = true;
        }
    }

    const handlerPage = (event) => {

        if (inputPage.current.value >= 1 && inputPage.current.value <= 42480) {
            localStorage.setItem("currentPage", inputPage.current.value);
            setPage(Number(inputPage.current.value))
        }
    }

    return (
        <div>
            <button onClick={handlerPrevious} disabled={page === 1}>Previous</button>
            <div>Page: {page}</div>
            <button onClick={handlerNext} disabled={page > 42479}>Next</button>
            <label htmlFor='page'>Page: </label>
            <input type="text" placeholder="page number" id='page' ref={inputPage} onChange={handlerChangeInputPage} />
            <button onClick={handlerPage} ref={buttonSearchByPage}>Search by Page</button>
        </div>
    )
}

export default Pagination