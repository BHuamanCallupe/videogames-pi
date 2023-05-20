import React, { useEffect, useState } from 'react'
import { Cards, Loader, Navbar, Pagination } from '../../components'
import { useDispatch, useSelector } from "react-redux"
import { getAllVideogames, clearAllVideogames } from '../../redux/actions'

if (!localStorage.getItem("currentPage")) {
  console.log("xd");
  localStorage.setItem("currentPage", "1");
}

const HomePage = () => {
  const dispatch = useDispatch();
  const allVideogames = useSelector(state => state.videogames);

  const [page, setPage] = useState(Number(localStorage.getItem("currentPage")));

  useEffect(() => {
    dispatch(getAllVideogames(page));

    return () => {
      dispatch(clearAllVideogames());
    }
  }, [page])

  return (
    <div>
      <Navbar />
      {
        !allVideogames[0]
          ? <Loader />
          :
          <>
            <Cards videogames={allVideogames} />
            <Pagination page={page} setPage={setPage} />
          </>
      }
    </div>
  )
}

export default HomePage