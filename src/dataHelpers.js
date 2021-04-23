import axios from 'axios';
import { _getTitleInfo } from './Endpoint';
export const getData = async (title) => {
    let response = await axios.get(_getTitleInfo, { params: { title: title } });
    return response;
}