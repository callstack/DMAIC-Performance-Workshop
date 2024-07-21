import {db} from '../lib/db';
import {FeatureConfig} from '../lib/types';

export const getFeaturesConfig = async () => {
  const response = await db.instance.executeAsync('SELECT * FROM features');

  return response.rows?._array as FeatureConfig[];
};
