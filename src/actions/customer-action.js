import axios from "axios";
export const getCustomersAction = () => async (dispatch) => {
    const response = await axios.get("http://localhost:8080/api/getCustomers");
    console.log(response.data);
    dispatch({
      type: "GET_CUSTOMERS",
      payload: response.data,
    });
  };