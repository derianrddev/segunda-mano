import { newProduct, uploadImage } from '../../helpers/products';
import { useForm } from '../../hooks/useForm';

export const AddProduct = ({ arrayProducts, setArrayProducts }) => {

  const [ formValues, handleInputChange, reset ] = useForm({
    name: '',
    price: 1,
    url: null
  });

  const { name, price, url } = formValues;

  async function addProduct(e) {
    e.preventDefault();
    
    if(url) {
      const product = await newProduct( name, price, url );
      setArrayProducts(product);
    }
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if( file ) {
      const element = document.querySelector('#addImage');
      element.dataset.text = file.name;
      const url = await uploadImage(file);
      reset({ name, price, url });
    }
  }

  return (
    <section className='create-product__container'>
      <h2 className='mb'>Crear producto</h2>
      <form className='auth-form' onSubmit={addProduct}>
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
        <div className="file-upload-wrapper" id='addImage' data-text="Seleccione una imagen!">
          <input 
            className='file-upload-field' 
            type="file" 
            id='imageSelector'
            name='image'
            accept="image/*"
            onChange={ handleImageChange }
          />
        </div>
        <button className='auth-form__button auth-form__button--auth'>
          Agregar
        </button>
      </form>
    </section>
  )
}
