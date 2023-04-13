import axios from 'axios';
import * as Minio from 'minio';
import { Product } from '../interfaces';


const URL = "http://localhost:8002/"

async function upload(data: FormData): Promise<any> {
    try{
        const response = await axios.post(URL+'upload', data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
          },)
          if(response.status === 200){
            
            return response.data
          }
    }catch (error) {
      console.error(error);
      throw error;
    }
}

async function addProduct(data: any): Promise<any> {
    try {
      const response = await axios.post(URL+'items', data);
      if(response.status === 200){
        
        return response.data
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
}

async function editProduct(id: string,data: any): Promise<any> {
    try {
      const response = await axios.put(URL+'items/'+id, data);
      if(response.status === 200){
        
        return response.data
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
}



async function getProducts(): Promise<any> {
    try {
      const response = await axios.get(URL+'items');
      if(response.status === 200){
        
        return response.data
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function getDisabledProducts(): Promise<any> {
    try {
      const response = await axios.get(URL+'items/disabled');
      if(response.status === 200){
        
        return response.data
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function getProduct(id: string): Promise<any> {
    try {
      const response = await axios.get(URL+'items/'+ id);
      if(response.status === 200){
        
        return response.data
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function deleteProduct(id: string): Promise<any> {
    try {
        console.log("deleting"+id)
      const response = await axios.delete(URL+'items/'+ id);
      if(response.status === 200){
        
        return response.data
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function disableProduct(id: string): Promise<any> {
    try {
      const response = await axios.delete(URL+'items/disabled/'+ id);
      if(response.status === 200){
        
        return response.data
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function enableProduct(id: string): Promise<any> {
    try {
        
      const response = await axios.get(URL+'items/enabled/'+ id);
      if(response.status === 200){
        
        return response.status
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }




export {getProducts, getProduct, upload, addProduct, editProduct, deleteProduct, disableProduct, getDisabledProducts, enableProduct};