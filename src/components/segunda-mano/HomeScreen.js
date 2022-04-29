import React, { useEffect, useState } from 'react'
import { startLogout } from '../../helpers/auth';
import { searchProducts } from '../../helpers/products';
import { AddProduct } from './AddProduct';
import { ItemProduct } from './ItemProduct';

export const HomeScreen = () => {

  const handleLogout = () => {
    startLogout();
  }

  const [arrayProducts, setArrayProducts] = useState([]);

  useEffect(() => {
    
    async function fetchProducts() {
      const getProducts = await searchProducts();
      setArrayProducts(getProducts);
    }
    fetchProducts();
  }, []);

  return (
    <div className='content'>
      <main className='container products__container'>
        <h1 className='mb'>Sus productos</h1>
        <div className='section-products__container mb'>
          <AddProduct
            arrayProducts={arrayProducts}
            setArrayProducts={setArrayProducts}
          />
          <section className='products__list'>
            {
              arrayProducts.map( product => <ItemProduct 
                arrayProducts={arrayProducts}
                setArrayProducts={setArrayProducts}
                key={product.id}
                id={product.id} 
                name={product.name} 
                price={product.price}
                image={product.image}
              />)
            }
          </section>
        </div>
        <button 
          className='auth-form__button auth-form__button--google' 
          type="submit" 
          onClick={ handleLogout }
        >
          Cerrar Sesión
        </button>
      </main>
    </div>
  )
}
