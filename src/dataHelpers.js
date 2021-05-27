import axios from 'axios';
import { _getTitleInfo } from './Endpoint';
export const getData = async (title, lowerCountSubs, higherCountSubs) => {
    let response = await axios.get(_getTitleInfo, { params: { title: title, page: 1, subscriber_range: `${lowerCountSubs}-${higherCountSubs}` } });
    return response;
}