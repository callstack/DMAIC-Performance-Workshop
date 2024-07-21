import {db} from '../lib/db';

interface Props {
  featureName: string;
  isEnabled: number;
}

export const updateFeature = async ({featureName, isEnabled}: Props) => {
  return db.instance.executeAsync(
    `UPDATE features SET is_enabled = ${isEnabled} WHERE name = "${featureName}"`,
    [isEnabled, featureName],
  );
};
