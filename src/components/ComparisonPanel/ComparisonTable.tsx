import clsx from 'clsx';
import {
  calculateDifferences,
  formatDifference,
} from '../../utils/weatherComparison';
import { WEATHER_PARAMETERS } from './config';
import type { ComparisonTableProps } from './types';

const ComparisonTable = ({
  currentCityData,
  selectedCityData,
}: ComparisonTableProps) => {
  const differences = calculateDifferences(currentCityData, selectedCityData);

  return (
    <div className='overflow-x-auto'>
      <table className='w-full border-collapse'>
        <thead>
          <tr className='bg-gray-50'>
            <th className='text-left p-4 font-semibold text-gray-700 border-b'>
              Parametr
            </th>
            <th className='text-center p-4 font-semibold text-gray-700 border-b'>
              {currentCityData.city}
            </th>
            <th className='text-center p-4 font-semibold text-gray-700 border-b'>
              {selectedCityData.city}
            </th>
            <th className='text-center p-4 font-semibold text-gray-700 border-b'>
              Różnica
            </th>
          </tr>
        </thead>
        <tbody>
          {WEATHER_PARAMETERS.map(parameter => {
            const currentValue = currentCityData[parameter.key];
            const selectedValue = selectedCityData[parameter.key];
            const difference = differences[parameter.key];
            const differenceColor =
              difference > 0
                ? parameter.positiveColor
                : parameter.negativeColor;

            return (
              <tr key={parameter.key} className='border-b hover:bg-gray-50'>
                <td className='p-4 font-medium text-gray-700'>
                  {parameter.label}
                </td>
                <td className='p-4 text-center font-bold text-gray-800'>
                  {currentValue}
                  {parameter.unit}
                </td>
                <td className='p-4 text-center font-bold text-gray-800'>
                  {selectedValue}
                  {parameter.unit}
                </td>
                <td
                  className={clsx('p-4 text-center font-bold', differenceColor)}
                >
                  {formatDifference(difference, parameter.unit)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
