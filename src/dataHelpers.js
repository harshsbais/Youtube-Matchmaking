import axios from 'axios';
import { _getTitleInfo } from './Endpoint';
export const getData = async (title, lowerCountSubs, higherCountSubs, timezone, timezoneRange, val) => {
    let response;
    if (val)
        response = await axios.get(_getTitleInfo, { params: { title, page: 1, subscriber_range: `${lowerCountSubs}-${higherCountSubs}`, timezone, timezone_range: timezoneRange } });
    else
        response = await axios.get(_getTitleInfo, { params: { title: false, keywords: title, page: 1, subscriber_range: `${lowerCountSubs}-${higherCountSubs}`, timezone, timezone_range: timezoneRange } });
    return response;
}