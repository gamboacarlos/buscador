import React, { useEffect, useState } from 'react';
import Formulario from './components/Formulario';
import Listado from './components/Listado';


function App() {

  const [busqueda, setBusqueda] = useState('')
  const [imagenes, setImagenes] = useState([])
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(1)

  useEffect(() => {
    const apiConsult = async () =>{
      if(busqueda === '')return;
      
      const imgPorPagina = 30
      const key = '18283436-b577236df9269053897340604'
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imgPorPagina}&page=${current}`
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()
      setImagenes(resultado.hits)

      const calcularTotal = Math.ceil(resultado.totalHits / imgPorPagina)
      setTotal(calcularTotal)

      const jumbo = document.querySelector('.jumbotron')
      jumbo.scrollIntoView({behavior: 'smooth'})

    }
    apiConsult()
  }, [busqueda, current, total])

  const paginaAnterior = () => {
    const newCurrent = current - 1

    if(newCurrent === 0)return;
    setCurrent(newCurrent)

  }
  const paginaSiguiente = () => {
    const newCurrent = current + 1

    if(newCurrent > total)return;
    setCurrent(newCurrent)

  }

  

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">
          Buscador de Imagenes
        </p>
        <Formulario setBusqueda={setBusqueda}/>
      </div>
      <div className="row justify-content-center">
        <Listado 
        imagenes={imagenes}
        />
        {
          (current === 1)
          ?null
          :(<button
          type="button"
          onClick={paginaAnterior}
          className="bbtn btn-info mr-1"
          >Anterior &laquo;</button>)
        }        
        {
          (current === total)
          ?null
          :(<button
          type="button"
          onClick={paginaSiguiente}
          className="bbtn btn-info"
          >Siguiente &raquo;</button>)
        }
      </div>
    </div>
  );
}

export default App;
