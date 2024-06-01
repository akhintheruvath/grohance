import React from 'react';
import Select from 'react-select';

export const Dropdown = ({ options, selectedOption, setSelectedOption, setIsFilterSelected }) => {
  const handleSelectChange = (selectedOpt) => {
    setSelectedOption(selectedOpt);
    setIsFilterSelected(true);
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center sm:justify-center">
      <div className="w-full min-w-36 max-w-md bg-white sm:shadow-md rounded p-1">
        <Select
          id="filter"
          value={selectedOption}
          onChange={handleSelectChange}
          options={options}
          className="react-select-container"
          classNamePrefix="react-select"
          placeholder="Filter By Status"
        />
      </div>
    </div>
  );
};