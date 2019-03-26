import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

let screenSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v1
  },
  screenName: String,
  featureName: String,
  description: String,
  created_date: {
    type: Date,
    default: Date.now
  },
  updated_date: {
    type: Date,
    default: null
  }
});

const ScreenModel = mongoose.model('feature_screen', screenSchema);

export default ScreenModel;
