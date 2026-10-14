import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';

const AnalyticsChart = ({ type, data, options }) => {
  const ChartComponent = {
    line: Line,
    bar: Bar,
    pie: Pie,
  }[type];

  if (!ChartComponent || !data) {
    return (
      <div className="flex items-center justify-center h-full text-textColor/50">
        Aucune donnée disponible
      </div>
    );
  }

  return <ChartComponent data={data} options={options} />;
};

export default AnalyticsChart;
