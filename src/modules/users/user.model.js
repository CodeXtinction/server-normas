import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import uniqueValidator from 'mongoose-unique-validator';
import jwt from 'jsonwebtoken';

import { passwordReg } from './user.validation';
import constants from '../../config/constants';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email requerido'],
    trim: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: '[VALUE]. no es valido'
    }
  },
  name: {
    type: String,
    required: [true, 'Nombre requerido']
  },
  password: {
    type: String,
    required: [true, 'Contraseña requerida'],
    trim: true,
    minlength: [6, 'Debe contener al menos 6 caracteres'],
    validate: {
      validator(password) {
        return passwordReg.test(password);
      },
      message: '[VALUE] No es una contraseña válida'
    }
  },
  job: {
    type: String
  }
});

UserSchema.plugin(uniqueValidator, {
  message: '[VALUE] ya existe'
});

UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
  }

  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },
  authenticateUser(password) {
    return compareSync(password, this.password);
  },
  createToken() {
    return jwt.sign(
      {
        _id: this._id
      },
      constants.JWT_SECRET
    );
  },
  toAuthJSON() {
    return {
      _id: this._id,
      name: this.name,
      job: this.job,
      token: `JWT ${this.createToken()}`
    };
  },
  toJSON() {
    return {
      _id: this._id,
      name: this.name
    };
  }
};

export default mongoose.model('User', UserSchema);
