// utils/autoIncrementId.js
import Counter from '../models/counter.model.js';

export default function autoIncrementId(schema, modelName) {
  schema.pre('save', async function(next) {
    if (this.isNew) {
      try {
        const counter = await Counter.findByIdAndUpdate(
          modelName,
          { $inc: { seq: 1 } },
          { new: true, upsert: true }
        );
        this[`id${modelName.charAt(0).toUpperCase() + modelName.slice(1)}`] = counter.seq;
        next();
      } catch (error) {
        next(error);
      }
    } else {
      next();
    }
  });
}
