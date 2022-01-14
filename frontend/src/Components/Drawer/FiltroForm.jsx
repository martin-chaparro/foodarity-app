/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {useState, useEffect} from 'react';

function FiltroForm({ filtrado }) {

  const [categories, setCategories] = useState()
  const [input, setInput] = useState({
    categoryName: '',
    categoryId: '',
    minPrice: 0,
    maxPrice: 0,
    expirationDate: '',
    order: '',
  })


  useEffect(() => {
    if (!input.minPrice) setInput({...input, minPrice: '0'})
    if (!input.maxPrice) setInput({...input, maxPrice: '0'})
  },[input.minPrice, input.maxPrice])

  useEffect(() => {
    fetch(
      `http://localhost:4000/api/v1/products/categories`
    ).then(res => {
      return res.json()
    }).then(res => {
      setCategories(res)
    })
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();
    filtrado(input);
  };

  const handleChange = (e) => {
    e.preventDefault()
    setInput({...input, [e.target.name] : e.target.value})
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ordenar por:</label>
          <label>
            <select name='order' onChange={handleChange}>
              <option value='recents' >Mas recientes</option>
              <option value='priceASC'>Precio minimo</option>
              <option value='priceDESC'>Precio maximo</option>
              <option value='expirationASC'>Primeros en expirar</option>
              <option value='expirationDESC'>Ultimos en expirar</option>
            </select>
          </label>
        </div>
        <div>
          <label>Filtrar por categoria:</label>
          <label>
            <select name='categoryName' onChange={handleChange}>
              <option value='Todas'>Ninguna</option>
            {categories && categories.map(category => 
              <option  key={category.name} value={category.name}>{category.name}</option>
            )}
            </select>
          </label>
        </div>
        <div>
          <div >
            <label>Precio Minimo:</label>
            <input type='number' name='minPrice' min='0' onChange={handleChange}/>
          </div>
          <div>
            <label >Precio Maximo:</label>
            <input type='number' name='maxPrice' min='0' onChange={handleChange} />
          </div>
        </div>
        <div>
          <label>
            Fecha limite de expiracion 
          </label>
          <label>(definir bien este nombre)</label>
          <input type='date' name='expirationDate' min={new Date().toLocaleDateString('en-ca')} onChange={handleChange}/>
        </div>
        <button type="submit">Aplicar filtros</button>
      </form>
    </div>
  );
}

export default FiltroForm;
