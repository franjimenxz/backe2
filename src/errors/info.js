export const generateUserErrorInfo = (user) => {
  return `One or more properties were incomplete or not valid.
    List of required properties:
    * first_name : needs to be a String, received ${user.first_name}
    * last_name  : needs to be a String, received ${user.last_name}
    * email      : needs to be a String, received ${user.email}
    * password   : needs to be a String, received ${user.password}
    * age        : needs to be a Number, received ${user.age}
    `;
};

export const generateProductIdErrorInfo = (id) => {
  return `The ID ${id} of product is not valid`;
};

export const generateCartIdErrorInfo = (id) => {
  return `The ID ${id} of cart is not valid`;
};

export const generateCartNotFoundErrorInfo = (id) => {
  return `The cart with ID ${id} was not found`;
};

export const generateProductCartIdErrorInfo = (cid, pid) => {
  return `The ID ${cid} of cart is not valid or the ID ${pid} of product is not valid`;
};
