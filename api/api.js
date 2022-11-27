import axios from 'axios';

export async function getHistoryData({ user }) {
    try {
        const res = await axios.get(`/api/history?username=${user.userName}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getSummaryData() {
    try {
        const res = await axios.get(`/api/summary`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
