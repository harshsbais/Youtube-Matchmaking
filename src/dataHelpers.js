import axios from 'axios';
import { _getTitleInfo, _signup, _collab } from './Endpoint';
export const getData = async (title, lowerCountSubs, higherCountSubs, timezone, timezoneRange, val) => {
    let response;
    if (val) {
        title = title.charAt(0).toUpperCase() + title.slice(1);
        response = await axios.get(_getTitleInfo, { params: { title, page: 1, subscriber_range: `${lowerCountSubs === '' ? 1 : lowerCountSubs}-${higherCountSubs === '' ? 100000000 : higherCountSubs}`, timezone: timezone === '' ? 0 : timezone, timezone_range: timezoneRange === '' ? 12 : timezoneRange } });
    }
    else {
        title = title.toLowerCase();
        response = await axios.get(_getTitleInfo, { params: { title: false, keywords: title, page: 1, subscriber_range: `${lowerCountSubs === '' ? 1 : lowerCountSubs}-${higherCountSubs === '' ? 100000000 : higherCountSubs}`, timezone: timezone === '' ? 0 : timezone, timezone_range: timezoneRange === '' ? 12 : timezoneRange } });
    }
    return response;
}

export const signUp = async (email, password, user, id) => {
    let response = await axios.get(_signup, { params: { email, password, user, id } });
    return response;
}

export const collabUser = async (user, collab) => {
    let response = await axios.get(_collab, { params: { user, collab: 'True' } });
    return response;
}