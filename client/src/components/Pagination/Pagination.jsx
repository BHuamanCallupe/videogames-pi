import React from 'react'

const Pagination = ({ videogamesPerPage, currentPage, setCurrentPage, totalVideogames }) => {

    const pageNumbers = [];

    for (let index = 1; index <= Math.ceil(totalVideogames / videogamesPerPage); index++) {
        pageNumbers.push(index);
    }

    const handlerPrevious = () => {
        setCurrentPage(currentPage - 1);
    }

    const handlerNext = () => {
        setCurrentPage(currentPage + 1);
    }

    const handlerPage = (nroPage) => {
        setCurrentPage(nroPage)
    }

    return (
        <div>
            <button onClick={handlerPrevious} disabled={currentPage === 1}>Previous</button>
            {pageNumbers.map(nroPage => (
                <button key={nroPage} onClick={() => handlerPage(nroPage)}>{nroPage}</button>
            ))
            }
            <button onClick={handlerNext} disabled={currentPage >= pageNumbers.length}>Next</button>
        </div>
    )
}

export default Pagination