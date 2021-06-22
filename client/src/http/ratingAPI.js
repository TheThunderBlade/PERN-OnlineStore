import {$authHost} from "./index";

export const createMark = async (userId, deviceId, rate) => {
    try {
        const {data} = await $authHost.post('/api/rating', {userId, deviceId, rate})
        return data
    } catch (e) {
        return e.response.data
    }
}