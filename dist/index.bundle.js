module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const devConfig = {
  MONGO_URL: 'mongodb://localhost/api-normas',
  JWT_SECRET: 'nnYGq6wPc9cQ8xiVIpiPb06aLVfLuezqZHvgMxjQU9onamtiOi7zu9gjMPahLhi'
};

const testConfig = {
  MONGO_URL: 'mongodb://localhost/api-normas'
};

const prodConfig = {
  MONGO_URL: 'mongodb://localhost/api-normas'
};

const defaultConfig = {
  PORT: process.env.PORT || 3000
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

exports.default = Object.assign({}, defaultConfig, envConfig(process.env.NODE_ENV));

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("express-validation");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("http-status");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _validator = __webpack_require__(20);

var _validator2 = _interopRequireDefault(_validator);

var _bcryptNodejs = __webpack_require__(21);

var _mongooseUniqueValidator = __webpack_require__(7);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _jsonwebtoken = __webpack_require__(22);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _user = __webpack_require__(8);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserSchema = new _mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email requerido'],
    trim: true,
    validate: {
      validator(email) {
        return _validator2.default.isEmail(email);
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
        return _user.passwordReg.test(password);
      },
      message: '[VALUE] No es una contraseña válida'
    }
  },
  job: {
    type: String
  }
});

UserSchema.plugin(_mongooseUniqueValidator2.default, {
  message: '[VALUE] ya existe'
});

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
  }

  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return (0, _bcryptNodejs.hashSync)(password);
  },
  authenticateUser(password) {
    return (0, _bcryptNodejs.compareSync)(password, this.password);
  },
  createToken() {
    return _jsonwebtoken2.default.sign({
      _id: this._id
    }, _constants2.default.JWT_SECRET);
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

exports.default = _mongoose2.default.model('User', UserSchema);

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("mongoose-unique-validator");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordReg = undefined;

var _joi = __webpack_require__(9);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const passwordReg = exports.passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

exports.default = {
  signup: {
    body: {
      email: _joi2.default.string().email().required(),
      password: _joi2.default.string().regex(passwordReg).required(),
      name: _joi2.default.string().required(),
      job: _joi2.default.string()
    }
  }
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authJwt = exports.authLocal = undefined;

var _passport = __webpack_require__(3);

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = __webpack_require__(23);

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _passportJwt = __webpack_require__(24);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

var _user = __webpack_require__(6);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// local
const localOpts = {
  usernameField: 'email'
};

const localStrategy = new _passportLocal2.default(localOpts, async (email, password, done) => {
  try {
    const user = await _user2.default.findOne({ email });
    if (!user) {
      return done(null, false);
    } else if (!user.authenticateUser(password)) {
      return done(null, false);
    }

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

// JWT
const jwtOpts = {
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: _constants2.default.JWT_SECRET
};

const jswStrategy = new _passportJwt.Strategy(jwtOpts, async (payload, done) => {
  try {
    const user = await _user2.default.findById(payload._id);
    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

_passport2.default.use(localStrategy);
_passport2.default.use(jswStrategy);

const authLocal = exports.authLocal = _passport2.default.authenticate('local', { session: false });
const authJwt = exports.authJwt = _passport2.default.authenticate('jwt', { session: false });

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(1);

var _express2 = _interopRequireDefault(_express);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

var _middlewares = __webpack_require__(12);

var _middlewares2 = _interopRequireDefault(_middlewares);

var _modules = __webpack_require__(17);

var _modules2 = _interopRequireDefault(_modules);

__webpack_require__(30);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)(); /* eslint-disable no-console */

(0, _middlewares2.default)(app);
app.get('/', (req, res) => {
  res.send('Api Normas');
});
(0, _modules2.default)(app);

app.listen(_constants2.default.PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running on port ${_constants2.default.PORT}`);
  }
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _morgan = __webpack_require__(13);

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = __webpack_require__(14);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = __webpack_require__(15);

var _compression2 = _interopRequireDefault(_compression);

var _helmet = __webpack_require__(16);

var _helmet2 = _interopRequireDefault(_helmet);

var _passport = __webpack_require__(3);

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

exports.default = app => {
  if (isProd) {
    app.use((0, _compression2.default)());
    app.use((0, _helmet2.default)());
  }

  app.use(_bodyParser2.default.json());
  app.use(_passport2.default.initialize());

  if (isDev) {
    app.use((0, _morgan2.default)('dev'));
  }
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = __webpack_require__(18);

var _user2 = _interopRequireDefault(_user);

var _post = __webpack_require__(25);

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {
  app.use('/api/v1/users', _user2.default);
  app.use('/api/v1/posts', _post2.default);
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(1);

var _expressValidation = __webpack_require__(4);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _user = __webpack_require__(19);

var userController = _interopRequireWildcard(_user);

var _user2 = __webpack_require__(8);

var _user3 = _interopRequireDefault(_user2);

var _auth = __webpack_require__(10);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = new _express.Router();

routes.post('/signup', (0, _expressValidation2.default)(_user3.default.signup), userController.signUp);
routes.post('/login', _auth.authLocal, userController.login);

exports.default = routes;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUp = signUp;
exports.login = login;

var _httpStatus = __webpack_require__(5);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _user = __webpack_require__(6);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function signUp(req, res) {
  try {
    const user = await _user2.default.create(req.body);
    return res.status(_httpStatus2.default.CREATED).json(user.toAuthJSON());
  } catch (e) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
  }
}

function login(req, res, next) {
  res.status(_httpStatus2.default.OK).json(req.user.toAuthJSON());
  return next();
}

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("bcrypt-nodejs");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(1);

var _express2 = _interopRequireDefault(_express);

var _expressValidation = __webpack_require__(4);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _post = __webpack_require__(26);

var postController = _interopRequireWildcard(_post);

var _auth = __webpack_require__(10);

var _post2 = __webpack_require__(29);

var _post3 = _interopRequireDefault(_post2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = new _express2.default();

routes.post('/', _auth.authJwt, (0, _expressValidation2.default)(_post3.default.createPost), postController.createPost);
routes.get('/:id', postController.getPostById);
routes.get('/', postController.getPosts);

exports.default = routes;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPost = createPost;
exports.getPostById = getPostById;
exports.getPosts = getPosts;

var _httpStatus = __webpack_require__(5);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _post = __webpack_require__(27);

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function createPost(req, res) {
  console.log(req.body);
  try {
    const post = await _post2.default.createPost(req.body, req.user._id);
    return res.status(_httpStatus2.default.CREATED).json(post);
  } catch (e) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
  }
}

async function getPostById(req, res) {
  try {
    const post = await _post2.default.findById(req.params.id).populate('user');
    return res.status(_httpStatus2.default.OK).json(post);
  } catch (e) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
  }
}

async function getPosts(req, res) {
  try {
    const posts = await _post2.default.find().sort({ createdAt: -1 }).populate('user');
    return res.status(_httpStatus2.default.OK).json(posts);
  } catch (e) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
  }
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = __webpack_require__(7);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _slug = __webpack_require__(28);

var _slug2 = _interopRequireDefault(_slug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PostSchema = new _mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Titulo requerido'],
    minlength: [5, 'Titulo muy corto'],
    unique: true
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Descripcion requerida'],
    minlength: [100, 'Descripcion muy corta']
  },
  slug: {
    type: String,
    trim: true,
    lowercase: true
  },
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tipo: {
    type: String,
    required: true
  },
  institucion: {
    type: String,
    required: true
  },
  principio: {
    type: String,
    required: true
  },
  instrumento: {
    type: String,
    required: true
  },
  iniciativa: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  ocupacion: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  telefono: {
    type: Number,
    required: true,
    trim: true
  }
}, { timestamps: true });

PostSchema.plugin(_mongooseUniqueValidator2.default, {
  message: '[VALUE] ya existe'
});

PostSchema.pre('validate', function (next) {
  this._slugify();

  next();
});

PostSchema.methods = {
  _slugify() {
    this.slug = (0, _slug2.default)(this.title);
  },
  toJSON() {
    return {
      _id: this._id,
      createdAt: this.createdAt,
      title: this.title,
      description: this.description,
      user: this.user,
      tipo: this.tipo,
      institucion: this.institucion,
      principio: this.principio,
      instrumento: this.instrumento,
      iniciativa: this.iniciativa,
      nombre: this.nombre,
      ocupacion: this.ocupacion,
      email: this.email,
      telefono: this.telefono
    };
  }
};

PostSchema.statics = {
  createPost(args, authorId) {
    return this.create(Object.assign({}, args, {
      user: authorId
    }));
  }
};

exports.default = _mongoose2.default.model('Post', PostSchema);

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("slug");

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(9);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  createPost: {
    body: {
      title: _joi2.default.string().min(5).required(),
      description: _joi2.default.string().min(100).required(),
      tipo: _joi2.default.string().required(),
      institucion: _joi2.default.string().required(),
      principio: _joi2.default.string().required(),
      instrumento: _joi2.default.string().required(),
      iniciativa: _joi2.default.string().required(),
      nombre: _joi2.default.string().required(),
      ocupacion: _joi2.default.string().required(),
      email: _joi2.default.string().email().required(),
      telefono: _joi2.default.string().required()
    }
  }
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

try {
  _mongoose2.default.connect(_constants2.default.MONGO_URL, {
    useMongoClient: true
  });
} catch (err) {
  _mongoose2.default.createConnection(_constants2.default.MONGO_URL, {
    useMongoClient: true
  });
}

_mongoose2.default.connection.once('open', () => console.log('MongoDB Running')).on('error', err => {
  throw err;
});

/***/ })
/******/ ]);