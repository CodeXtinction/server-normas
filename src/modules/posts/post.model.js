import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import slug from 'slug';

const PostSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Titulo requerido'],
      minlength: [3, 'Titulo muy corto'],
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
      type: Schema.Types.ObjectId,
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
  },
  { timestamps: true }
);

PostSchema.plugin(uniqueValidator, {
  message: '[VALUE] ya existe'
});

PostSchema.pre('validate', function(next) {
  this._slugify();

  next();
});

PostSchema.methods = {
  _slugify() {
    this.slug = slug(this.title);
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
    return this.create({
      ...args,
      user: authorId
    });
  }
};

export default mongoose.model('Post', PostSchema);
