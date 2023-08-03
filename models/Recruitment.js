const mongoose = require('mongoose');
const recruitmentSchema = mongoose.Schema(
    {
        email: { type: String, required: true },
        fullName: { type: String, required: true },
        company: { type: String, required: true },
        subject: { type: String, required: true },
        message: { type: String, require: true },
    },
    {
        timestamps: true
    }
);

recruitmentSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

module.exports = mongoose.model('Recruitment', recruitmentSchema);