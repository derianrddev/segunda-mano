import React from 'react'
import { updateProduct, uploadImage } from '../../helpers/products';
import { useForm } from '../../hooks/useForm';

export const Modal = ({setOpenModal, arrayProducts, setArrayProducts, idProduct, nameProduct, priceProduct, imageProduct}) => {

  const [ formValues, handleInputChange, reset ] = useForm({
    name: nameProduct,
    price: priceProduct,
    url: imageProduct
  });

  const { name, price, url } = formValues;

  async function handleUpdateProduct(e) {
    e.preventDefault();

    const updatedProduct = await updateProduct( idProduct, name, price, url );
    setArrayProducts(updatedProduct);

    setOpenModal(false);
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if( file ) {
      const element = document.querySelector('#updateImage');
      element.dataset.text = file.name;
      const url = await uploadImage(file);
      reset({ name, price, url })
    }
  }

  const handleCancel = (e) => {
    e.preventDefault();
    setOpenModal(false);
  }

  return (
    <section className='modal__container'>
      <div className='modal__content'>
        <h2 className='mb'>Editar producto</h2>
        <form className='auth-form' onSubmit={handleUpdateProduct}>
          <div className='auth-form__input-wrapper'>
            <input 
              className='auth-form__input' 
              type="text" 
              name='name'
              placeholder='Nombre'
              required
              value={ name }
              onChange={ handleInputChange }
            />
            <i className="fa-solid fa-file-signature  auth-form__input-icon"></i>
          </div>
          <div className='auth-form__input-wrapper'>
            <input 
              className='auth-form__input' 
              type="number" 
              name='price'
              placeholder='Precio'
              required
              value={ price }
              onChange={ handleInputChange }
            />
            <i className="fa-solid fa-money-bill auth-form__input-icon"></i>
          </div>
          <div className="file-upload-wrapper" id='updateImage' data-text="Seleccione una imagen!">
            <input 
              className='file-upload-field' 
              type="file" 
              id='imageSelector'
              name='image'
              accept="image/*"
              onChange={ handleImageChange }
            />
          </div>
          <div className='modal__buttons'>
            <button className='auth-form__button auth-form__button--cancel' onClick={handleCancel}>
              Cancelar
            </button>
            <button className='auth-form__button auth-form__button--auth'>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
