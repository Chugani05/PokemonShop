import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDlOF7zoWOkc8ZmpaZa8iOdRJeOmEBzpX8",
    authDomain: "pokemon-shop-8b796.firebaseapp.com",
    projectId: "pokemon-shop-8b796",
    storageBucket: "pokemon-shop-8b796.appspot.com",
    messagingSenderId: "322745061617",
    appId: "1:322745061617:web:79e3930811eb4cf9609950",
    measurementId: "G-GJJZ1D1Z01"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

class ConnectToDB {
  constructor() {
    this.collectionRef = collection(db, "users");
  }

  async create(data) {
    try {
      const docRef = await addDoc(this.collectionRef, data);
      console.log("Documento escrito con ID: ", docRef.id);
      return docRef.id;
    } catch (e) {
      console.error("Error añadiendo documento: ", e);
    }
  }

  async readAll() {
    try {
      const querySnapshot = await getDocs(this.collectionRef);
      const dataList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Documentos:", dataList);
      return dataList;
    } catch (e) {
      console.error("Error obteniendo documentos: ", e);
    }
  }

  async update(id, data) {
    try {
      const docRef = doc(this.collectionRef, id);
      await updateDoc(docRef, data);
      console.log("Documento actualizado con ID: ", id);
    } catch (e) {
      console.error("Error actualizando documento: ", e);
    }
  }

  async delete(id) {
    try {
      const docRef = doc(this.collectionRef, id);
      await deleteDoc(docRef);
      console.log("Documento eliminado con ID: ", id);
    } catch (e) {
      console.error("Error eliminando documento: ", e);
    }
  }

  async getFile(id) {
    try {
        const docRef = doc(this.collectionRef, id)
        const docSnap = await getDoc(docRef)
        return docSnap.data()
    } catch (e) {
        console.error("No se obtuvo la información: " + e)
    }
  }
}

export default ConnectToDB;