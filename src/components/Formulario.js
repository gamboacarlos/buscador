import React, { useState } from 'react'
import Error from './Error'


const Formulario = ({ setBusqueda }) => {

    const [ termino, setTermino ] = useState('')
    const [ error, setError ] = useState(false)

    const search = (evt) => {
        evt.preventDefault()

        if(termino.trim() === ''){
            setError(true)
            return
        }
        setError(false)
        setBusqueda(termino)

    }

    return (
        <>
          <form onSubmit={ search }>
            <div className="row">
              <div className="form-group col-md-8">
                  <input 
                  type="text" 
                  className="form-control form-control-lg"
                  placeholder="Ejemplo: futbol o café"
                  onChange={ (evt) => setTermino(evt.target.value) }
                  />
              </div>
              <div className="form-group col-md-4">
                  <input 
                  type="submit" 
                  className="btn btn-lg btn-danger btn-block"
                  placeholder="Buscar"
                  value="Buscar"
                  />                  
              </div>
            </div>
            { error ? <Error mensaje="Agrega un termino de busqueda" /> : null }
          </form>  
        </>
    )
}

export default Formulario
