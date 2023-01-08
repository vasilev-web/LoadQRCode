import axios from 'axios';
import { baseConfig } from '@store/baseConfig';

const { SITE_URL } = baseConfig();

const ClientApi = axios.create({
    baseURL: `${SITE_URL}/include/`,
    transformRequest: [
        function (data) {
            if (data) {
                return JSON.stringify(data);
            }
        }
    ],
    transformResponse: [
        function (response) {
            return JSON.parse(response);
        }
    ],
    headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

const BlobApi = axios.create({
    baseURL: '/',
    responseType: 'blob',
    transformRequest: [
        function (data) {
            return data;
        }
    ],
    transformResponse: [
        function (response) {
            return response;
        }
    ]
});

export { ClientApi, BlobApi };
export default axios;
