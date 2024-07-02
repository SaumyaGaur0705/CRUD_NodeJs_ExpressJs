import Joi from 'joi';

 
export const password = (value, helpers) => {
  try{
  if (value.length < 8) {
    return helpers.error('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.error('password must contain at least 1 letter and 1 number');
  }
  return value;
}
catch(error){
  res.send(error);
}

};
export const register = {
  body: Joi.object().keys({
    firstname:Joi.string().required(),
    lastname:Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password)
  })
};


