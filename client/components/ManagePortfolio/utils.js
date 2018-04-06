// eslint-disable-next-line
import { distributionFromBalances, distributionSampling } from 'lib/src/utils';

export const computePercentsFromBaseValues = (baseValues) => {
  const rawDistributions = distributionFromBalances(baseValues);
  const initialPercents = distributionSampling(rawDistributions, 3);
  return initialPercents;
};

export const calcPercentsChange = (oldPercents, newPercents) => {
  const changed = {};
  Object.keys(newPercents).forEach(id => {
    if (newPercents[id].share !== oldPercents[id].share) {
      changed[id] = newPercents[id].share / 100;
    }
  });
  return changed;
};

export const convertPercentsToSortedArray = (percentsObj) => {
  const array = Object.keys(percentsObj).map(assetId => percentsObj[assetId]);
  return array.sort((a, b) => {
    return a.share === b.share ? 0 : +(b.share > a.share) || -1;
  });
};
