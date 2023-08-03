const mongoose = require('mongoose');
const promotionSchema = mongoose.Schema(
    {
        email: { type: String, required: true },
        fullName: { type: String, required: true },
        company: { type: String, required: true },
        subject: { type: String, required: true },
        product: { type: String, required: true },
        file: { type: String, required: true },
        message: { type: String, required: true },
    },
    {
        timestamps: true
    }
);

promotionSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

module.exports = mongoose.model('Promotion', promotionSchema);