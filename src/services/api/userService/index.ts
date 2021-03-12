import { axiosInstance } from '../coreService';

axiosInstance.defaults.headers.common['Authorization'] = 'Bearer token-here';

export const UpdateUser = async () => {
    const params = new URLSearchParams();
    params.append('profilePhotoUrl', 'https://place-puppy.com/300x300');
  
    const response = await axiosInstance.request({
      method: 'PATCH',
      url:
        'http://infinite-digital-dev.eba-7pjrtnms.us-east-1.elasticbeanstalk.com/users/sub/123',
      data: params,
    });
  
    return response;
};


