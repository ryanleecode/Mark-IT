import { AggregateData, DayData } from './data';
import { isUndefined } from 'lodash';

const AGE_LOWER_THRESHOLD = 5;
const AGE_UPPER_THRESHOLD = 5;

const INCOME_LOWER_THRESHOLD = 5000;
const INCOME_UPPER_THRESHOLD = 5000;

const getTotalSumOf = (key: string, data: AggregateData) =>
  data.Monday[key] +
  data.Tuesday[key] +
  data.Wednesday[key] +
  data.Thursday[key] +
  data.Friday[key] +
  data.Saturday[key] +
  data.Sunday[key];

export interface AnalyticsFilter {
  age?: number;
  income?: number;
  gender?: 'Male' | 'Female' | 'Other';
  traffic?: 'High' | 'Med' | 'Low';
}

export function filterRegions(
  dataArr: AggregateData[],
  filter: AnalyticsFilter,
) {
  let newData = dataArr;

  const totalTransactions = dataArr
    .map((x) => getTotalSumOf('numTransactions', x))
    .reduce((prev, current) => prev + current, 0);
  const totalAge = dataArr
    .map((x) => getTotalSumOf('totalAge', x))
    .reduce((prev, current) => prev + current, 0);
  const averageAge = totalAge / totalTransactions;

  dataArr.forEach((x) => {
    if (!isUndefined(filter.age)) {
      newData = newData.filter((data) => {
        const weekTrans = getTotalSumOf('numTransactions', data);
        const avgWeekAge = getTotalSumOf('totalAge', data) / weekTrans;
        // console.log(avgWeekAge, averageAge);
        if (
          avgWeekAge > averageAge - AGE_LOWER_THRESHOLD &&
          avgWeekAge < averageAge + AGE_UPPER_THRESHOLD
        ) {
          return true;
        }
      });
    }
  });

  return newData;
}
