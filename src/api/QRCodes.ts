import { BlobApi } from './Request';
import { baseConfig } from '@store/baseConfig';

const { API_URL } = baseConfig();

const QRCodes = {
    get: (data?) => {
        let formData = data;

        if (data instanceof Object) {
            formData = Object.keys(data).map((key) => {
                if (key === 'size') {
                    return `${key}=${Array(2).fill(data[key]).join('x')}`;
                } else {
                    return `${key}=${data[key]}`;
                }
            });
        }

        return BlobApi.get(`${API_URL}?${formData.join('&')}`);
    }
};

export default QRCodes;
