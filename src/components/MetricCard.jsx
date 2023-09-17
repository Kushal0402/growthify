import React from "react";

const MetricCard = ({ name, value }) => {
  return (
    <div className="col-span-12 sm:col-span-6 lg:col-span-4 p-4 border-2 border-gray-600 m-4 rounded-md bg-gray-200 duration-200 hover:bg-gray-400">
      <p className="max-w-[90%] font-semibold text-lg">
        {name}: <br />
        {value}
      </p>
    </div>
  );
};

export default MetricCard;
