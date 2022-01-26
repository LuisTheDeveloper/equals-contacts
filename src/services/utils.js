import { fetchWrapper } from "./fetch";

export const setTransaction = (mode, body) => {
    console.log("mode: ", mode);
    console.log("body: ", body);
    switch (mode) {
        case "add":
            console.log("ADD")
            break;
        case "delete":
            console.log("DELETE")
            break;                 
        case "edit":
            const {id, name, birthday, email, phone} = body;
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
