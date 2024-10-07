import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateRangeFilterProps {
  setDateRange: (dateRange: [Date | null, Date | null]) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ setDateRange }) => {
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setDateRange([start, end]);
  };

  return (
    <div className="mb-4">
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={handleDateChange}
        placeholderText="Filter by date range"
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default DateRangeFilter;