import axios from 'axios';
// ${process.env.NEXT_PUBLIC_API_URL}
export const api = axios.create({
  baseURL: `https://port-0-yeargame-nodejs-20z52flc7g810w.gksl2.cloudtype.app`,
});

api.interceptors.request.use(
  (config) => {
    // const refreshToken = localStorage.getItem('refreshToken');
    // const preaccessToken = localStorage.getItem('accessToken');
    // const accessToken = preaccessToken?.split(' ')[1];
    // if (!refreshToken) {
    //   return config;
    // }
    // config.headers = {
    //   Authorization: `Bearer ${accessToken}`,
    //   RefreshToken: `${refreshToken}`,
    // };

    return config;
  },
  (error) =>
    // Do something with request error
    Promise.reject(error)
);

api.interceptors.response.use(
  (response) =>
    // 응답 데이터를 가공

    response,
  (error) => {
    // 오류 응답을 처리

    if (error.response?.data?.success === false) {
      // ClearStorage();
      //   localStorage.setItem('expiration', 'true');
      // window.location.reload();
    }
  }
);
