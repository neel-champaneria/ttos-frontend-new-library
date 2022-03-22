import APIResource from '../services/APIResource';

export const fetchMenuService = async () => {
    return await APIResource.get('open/api/slave/item/fetchMenu');
    // return await APIResource.get('/testData/fetchMenu.json');
};

export const fetchAppConfigService = async () => await APIResource.get('open/api/slave/restaurant/');

export const saveItemService = async (data, user) => {
    return await APIResource.post(
        'api/slave/item/saveItem',
        data,
        {
            headers: {
                'Authorization': `Bearer ${user.access_token}`,
            },
        }
    );
};

export const commentService = async (data, user) => {
    return await APIResource.post(
        'api/slave/item/comment',
        data,
        {
            headers: {
                'Authorization': `Bearer ${user.access_token}`,
            },
        }
    );
};

export const uploadCategoryImageService = async (data, user) => {
    return await APIResource.post(
        'api/slave/category/saveImage',
        data,
        {
            headers: {
                'Authorization': `Bearer ${user.access_token}`,
            },
        }
    );
};

export const saveCategoryService = async (data, user) => {
    return await APIResource.post(
        'api/slave/category/saveCategory',
        data,
        {
            headers: {
                'Authorization': `Bearer ${user.access_token}`,
            },
        }
    );
};

export const saveModifierService = async (data, user) => {
    return await APIResource.post(
        'api/slave/item/saveModifier',
        data,
        {
            headers: {
                'Authorization': `Bearer ${user.access_token}`,
            },
        }
    );
};

export const saveModifierGroupService = async (data, user) => {
    return await APIResource.post(
        'api/slave/item/saveModifierGroup',
        data,
        {
            headers: {
                'Authorization': `Bearer ${user.access_token}`,
            },
        }
    );
};
