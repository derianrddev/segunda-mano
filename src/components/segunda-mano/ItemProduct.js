import React, { useState } from 'react'
import { deleteProduct } from '../../helpers/products'
import { Modal } from './Modal';

export const ItemProduct = ({ arrayProducts, setArrayProducts, id, name, price, image }) => {

  const [openModal, setOpenModal] = useState(false);

  const handleUpdate = () => {
    setOpenModal(true);
  }
  
  const handleDelete = () => {
    deleteProduct(id, name);
    const newArrayProducts = arrayProducts.filter(
      (product) => product.id !== id
    );
    setArrayProducts(newArrayProducts);
  }

  return (
    <div className='product__card'>
      <img className='product__image' src={image} alt="" />
      <div className='product__info'>
        <h2 className='product__price'>{price}</h2>
        <h2>{name}</h2>
        <div>
          <button className='product__update' onClick={handleUpdate}>
            <i className="fa-solid fa-pen"></i>
          </button>
          <button className='product__delete' onClick={handleDelete}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
      {openModal && (
        <Modal 
          setOpenModal={setOpenModal} 
          arrayProducts={arrayProducts}
          setArrayProducts={setArrayProducts}
          idProduct={id} 
          nameProduct={name} 
          priceProduct={price}
          imageProduct={image}
        />
      )}
    </div>
  )
}
