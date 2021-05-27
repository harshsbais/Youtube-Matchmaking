import axios from 'axios';
import { _getTitleInfo } from './Endpoint';
export const getData = async (title, lowerCountSubs, higherCountSubs, timezone, timezoneRange) => {
    let response = await axios.get(_getTitleInfo, { params: { title: title, page: 1, subscriber_range: `${lowerCountSubs}-${higherCountSubs}`, timezone, timezone_range: timezoneRange } });
    return response;
}