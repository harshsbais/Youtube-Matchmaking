import axios from 'axios';
import { _getTitleInfo } from './Endpoint';
export const getData = async () => {
    let response = await axios.get(_getTitleInfo, { params: { title: "Matinbum" } });
    console.log(response);
    return response;
}