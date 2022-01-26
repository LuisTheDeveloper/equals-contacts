import { fetchWrapper } from "./fetch";
import moment from "moment";

export const setTransaction = (mode, body) => {
    const currentDateTime = moment().format();
    const {id, name, birthday, email, phone} = body;
    
    switch (mode) {
        case "add":
            Object.defineProperty(body, 'createdAt', {
                value: currentDateTime,
                writable: false
            })
            try {
                return fetchWrapper
                  .post('contacts', body
                  )
                  .then((response) => {
                    console.log(response);
                    return response;
                  })
                  .catch((error) => {
                    console.log(error);
                    return error;
                  })
              } catch (error) {
                console.log(error);
                return error;
              }
        case "delete":
            try {
                return fetchWrapper
                  .delete(`contacts/${id}`)
                  .then((response) => {
                    console.log(response);
                    return response;
                  })
                  .catch((error) => {
                    console.log(error);
                    return error;
                  })
              } catch (error) {
                console.log(error);
                return error;
              }             
        case "edit":
            try {
                return fetchWrapper
                  .put(`contacts/${id}`, 
                  {
                      name: name,
                      birthday: birthday,
                      email: email,
                      phone: phone
                  }
                  )
                  .then((response) => {
                    console.log(response);
                    return response;
                  })
                  .catch((error) => {
                    console.log(error);
                    return error;
                  })
              } catch (error) {
                console.log(error);
                return error;
              }
        default:
            break;
    }    
}

export const getNewId = (data) => {
    // Get the highest id value
    const newId = data.reduce((acc, value) => acc = acc > Number(value.id) ? acc : Number(value.id), 0);
    return newId + 1;
}