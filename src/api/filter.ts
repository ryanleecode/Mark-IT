import { AggregateData, DayData } from './data';
import { isUndefined, isNaN } from 'lodash';

const AGE_LOWER_THRESHOLD = 5;
const AGE_UPPER_THRESHOLD = 5;

const INCOME_LOWER_THRESHOLD = 10000;
const INCOME_UPPER_THRESHOLD = 10000;

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
  gender?: 'Male' | 'Female' | 'Other' | 'Any';
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
    if (!isUndefined(filter.age) && !isNaN(filter.age)) {
      newData = newData.filter((data) => {
        const weekTrans = getTotalSumOf('numTransactions', data);
        const avgWeekAge = getTotalSumOf('totalAge', data) / weekTrans;
        if (
          avgWeekAge > filter.age! - AGE_LOWER_THRESHOLD &&
          avgWeekAge < filter.age! + AGE_UPPER_THRESHOLD
        ) {
          return true;
        }
      });
    }
    if (
      !isUndefined(filter.gender) &&
      filter.gender !== 'Any' &&
      (filter.gender as any) !== 'undefined'
    ) {
      newData = newData.filter((data) => {
        const totalMales = getTotalSumOf('Male', data);
        const totalFemales = getTotalSumOf('Female', data);
        const totalOther = getTotalSumOf('Other', data);
        if (filter.gender === 'Male') {
          if (totalMales > totalFemales && totalMales > totalOther) {
            return true;
          }
        }
        if (filter.gender === 'Female') {
          if (totalFemales > totalMales && totalFemales > totalOther) {
            return true;
          }
        }
        if (filter.gender === 'Other') {
          if (totalOther > totalFemales && totalOther > totalMales) {
            return true;
          }
        }
      });
    }

    // console.log(newData);
    if (!isUndefined(filter.income) && !isNaN(filter.income)) {
      newData = newData.filter((data) => {
        const weekTrans = getTotalSumOf('numTransactions', data);
        const avgWeekIncome = data.totalIncome / weekTrans;
        console.log(avgWeekIncome, filter.income!);
        if (
          avgWeekIncome > filter.income! - INCOME_LOWER_THRESHOLD &&
          avgWeekIncome < filter.income! + INCOME_UPPER_THRESHOLD
        ) {
          return true;
        }
      });
    }
  });
  // console.log(filter, newData);
  return newData;
}
