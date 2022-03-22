import APIResource from '../services/APIResource';

export const checkoutService = async (data) => {
    return await APIResource.post('open/api/slave/order', data);
};

export const orderStatusService = async (orderId) => {
    return await APIResource.get(`open/api/slave/order/status/${orderId}`);
};

export const updateDeliveryDateTimeService = async (user, data) => {
    return await APIResource.post(
        'api/slave/user/updateDeliveryTime',
        data,
        {
            headers: {
                'Authorization': `Bearer ${user.access_token}`,
            },
        }
    );
};

export const stripePaymentProcessService = async (data) => {
    return await APIResource.post('open/api/slave/order/payment/' + data.id);
};

export const fomoPaymentProcessService = async (data) => {
    return await APIResource.post('open/api/slave/payment/fomo/' + data.id);
};
