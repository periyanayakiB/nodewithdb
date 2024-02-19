export const validator = (data) => {
    //Check whether the data is filled or not
    if (
      isNaN(data.id) || data.name.length<=0  || data.city.length<=0 ||
      typeof data.id == 'undefined' ||
      typeof data.name == 'undefined' ||
      typeof data.city == 'undefined'
    ){
      return { success: false, message: "required feild missing", code: 400 };
    } 
    //Check whether the id is number
    else if (typeof data.id != "number") {
      return { success: false, message: "invalid format of id", code: 400 };
    } 
    //Check whether the name is string
    else if (typeof data.name != "string") {
      return { success: false, message: "invalid format of name", code: 400 };
    } 
    //Check whether the city is styring
    else if (typeof data.city != "string") {
      return { success: false, message: "invalid format of city", code: 400 };
    }
    //return data
    return { success: true, data, code:200 };
    
};