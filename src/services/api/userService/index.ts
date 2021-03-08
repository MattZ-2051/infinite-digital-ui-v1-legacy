import { axiosInstance } from '../coreService';

axiosInstance.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJCaElZNk5GTlliaUNCRi1KSVhZM09VTTNWOTZDVlpfVzVQNEJpcmJ0am9RIn0.eyJleHAiOjE2MTQ4OTUyMzksImlhdCI6MTYxNDg5NDkzOSwianRpIjoiMGMxMmQwMTAtYTk1YS00YzIwLThmZmUtYjVmMzkxOTg1MTZiIiwiaXNzIjoiaHR0cHM6Ly9zc28uc3VrdS5hcHAvYXV0aC9yZWFsbXMvc3VrdS1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiODk4MzY5ZTYtOWIwYi00MjZjLTljNjgtOGY4NDYzYjc2YTM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaW5maW5pdGUtZGlnaXRhbC11aSIsInNlc3Npb25fc3RhdGUiOiJlODdiZWE1ZS1mZDIwLTRhYWEtOWZjYy1jYjllNDA3YzA5MWEiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QxIiwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20ifQ.AP4t3Z-Qg_zgZhFcBhJ7pFZNAc7HHmg1d-RcqOtQkulif8kmnt983J-sCGUyJo4_GjjXXt4y3kxrfxjb8-fzCiDux5-qU_aLdnfbUK8Wu-Ri3sMa2sIU9AWqi9zFMX3Ca7I8Z-L8g8p5GNrbOudGxXPyskciKFjXYts_4q0VZIB-2LiWunJJzsL6QS-4CI1a1Fl5hIp9uMs53ipO8138VhWlBC9tThux8CAdhJdbQlcKShnp9mSOysFbgp6QGsRWYadKqEOID1dScgSedCwjcrXvLDq_nQunAyy5YyrEOStPJ-QFgP9jiMbLX381a0eo0GcQqW5G-YNb9tz-PPJhUQ';

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


