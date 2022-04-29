import Swal from 'sweetalert2';
import { getAuth } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase/firebaseConfig";

export const searchProducts = async () => {

  const auth = getAuth();
  const uid = auth.currentUser.uid

  const query = await getDocs(collection(db, `${ uid }/segunda-mano/products`));

  if (query) {

    const docs = query.docs;
    let products = [];
    docs.forEach(product => {
      const id = product.id
      const temp = { ...product.data(), id}
      return products = [...products, temp]
    });

    return products;

  } else {
    return [];
  }
}

export const newProduct = async ( name, price, image ) => {
  
  const auth = getAuth();
  const uid = auth.currentUser.uid;
  
  const newProduct = {
    name: name,
    price: price,
    image: image
  }
  
  await addDoc(collection(db, `${ uid }`, "segunda-mano/products"), newProduct );

  Swal.fire('Se guardo el producto ', name, 'success');

  const products = searchProducts();

  return products;

}

export const uploadImage = async ( file ) => {

  const archivoRef = ref(storage, `images/${file.name}`);
  await uploadBytes(archivoRef, file);

  const urlImage = await getDownloadURL(archivoRef).then(( downloadURL ) => downloadURL);

  return urlImage;

}

export const updateProduct = async ( id, name, price, image ) => {

  const auth = getAuth();
  const uid = auth.currentUser.uid;

  const updatedProduct = {
    name: name,
    price: price,
    image: image
  }

  const productRef = doc(db, `${ uid }/segunda-mano/products/${id}`)
  await updateDoc(productRef, updatedProduct);

  Swal.fire('Se actualizo el producto ', name, 'success');

  const products = searchProducts();

  return products;
    
}

export const deleteProduct = async ( id, name ) => {

  const auth = getAuth();
  const uid = auth.currentUser.uid;

  const productRef = doc(db, `${ uid }/segunda-mano/products/${id}`)
  await deleteDoc(productRef);

  Swal.fire('Se eliminó el producto ', name, 'success');
    
}
