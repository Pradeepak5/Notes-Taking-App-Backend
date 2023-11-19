const joi = require('joi');

const registerSchemaValidation = (data) => {
  const schema = joi.object({
    userName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  return schema.validate(data);
};

const LoginValidation = (data) => {
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    });
  
    return schema.validate(data);
};

const createNotesValidation = (data) => {
    const schema = joi.object({
        notes: joi.string().required(),
    });
    
    return schema.validate(data);
}

const registerMiddlewareValidation = async (req, res, next) => {
    const { error } = registerSchemaValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }else{
        next()
    }
}

const LoginMiddlewareValidation = async (req, res, next) => {
    const { error } = LoginValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }else{
        next()
    }
}

const notesMiddlewareValidation = async (req,res, next) => {
    const { error } = createNotesValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }else{
        next()
    }
}

module.exports = { registerMiddlewareValidation, LoginMiddlewareValidation, notesMiddlewareValidation };
