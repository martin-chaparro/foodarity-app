/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
// import {useDispatch} from 'react-redux'
// import {getProducts} from '../../redux/actions/productActions'
import { api } from '../../services/api';

function FiltroForm({ filtrado }) {
  // const dispatch = useDispatch()
  const [categories, setCategories] = useState();
  const [input, setInput] = useState({
    categoryName: '',
    categoryId: '',
    minPrice: 0,
    maxPrice: 0,
    expirationDate: '',
    order: '',
  });

  useEffect(() => {
    if (!input.minPrice) setInput({ ...input, minPrice: '0' });
    if (!input.maxPrice) setInput({ ...input, maxPrice: '0' });
  }, [input.minPrice, input.maxPrice]);

  useEffect(() => {
    api.get('/products/categories')
      .then((res) => {
        return res.data
      })
      .then((res) => {
        setCategories(res);
      });
  }, []);

  const handleClear = (e) => {
    e.preventDefault()
    const clearInput = {
      categoryName: 'Todas',
      categoryId: '',
      minPrice: 0,
      maxPrice: 0,
      expirationDate: '',
      order: '',
    }
    setInput(clearInput)
    filtrado(clearInput)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    filtrado(input);
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === 'expirationDate' && e.target.value === '') {
      setInput({ ...input, expirationDate: 'clear' });
    } else setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ordenar por:</label>
          <label>
            <select name="order" onChange={handleChange} value={input.order}>
              <option value="recents">Mas recientes</option>
              <option value="priceASC">Precio minimo</option>
              <option value="priceDESC">Precio maximo</option>
              <option value="expirationASC">Primeros en expirar</option>
              <option value="expirationDESC">Ultimos en expirar</option>
            </select>
          </label>
        </div>
        <div>
          <label>Filtrar por categoria:</label>
          <label>
            <select name="categoryName" onChange={handleChange} value={input.categoryName}>
              <option value="Todas">Todas</option>
              {categories &&
                categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <div>
          <div>
            <label>Precio Minimo:</label>
            <input
              type="number"
              name="minPrice"
              min="0"
              onChange={handleChange}
              value={input.minPrice}
            />
          </div>
          <div>
            <label>Precio Maximo:</label>
            <input
              type="number"
              name="maxPrice"
              min="0"
              onChange={handleChange}
              value={input.maxPrice}
            />
          </div>
        </div>
        <div>
          <label>Fecha limite de expiracion</label>
          <label>(definir bien este nombre)</label>
          <input
            type="date"
            name="expirationDate"
            min={new Date().toLocaleDateString('en-ca')}
            onChange={handleChange}
            
          />
        </div>
        <button type="submit">Aplicar filtros</button>
        <button type="button" onClick={handleClear}>Limpiar</button>
      </form>
    </div>
  );
}

export default FiltroForm;
