import axios from "axios";
import { URL } from "../config/config";


export const getAllFileService = async () => {
  return await axios.get(`${URL}getFiles`);
};

export const postFileService = async (value:object) => {
  return await axios.post(`${URL}uploadFiles`,value);
};
export const deleteFileService = async (id:number) => {
  return await axios.delete(`${URL}deletFile/${id}`);
};
