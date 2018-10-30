import mongoose from 'mongoose';

const { Schema } = mongoose;
const docSchema = new Schema(
  {
    ID: Number,
    UPCEAN: { type: Number, index: true },
    Name: String,
    CategoryID: Number,
    CategoryName: String,
    BrandID: Number,
    BrandName: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Barcode', docSchema);
