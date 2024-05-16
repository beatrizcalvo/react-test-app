import axiosWithCredentials from "../hooks/AxiosWithCredentials";

const axiosClient = axiosWithCredentials(process.env.REACT_APP_API_URL);

