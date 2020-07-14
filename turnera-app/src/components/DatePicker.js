import React, { Component } from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes, getDay, addMonths, setDate, addDays } from "date-fns";


registerLocale("es", es);

const CustomDatePicker = ({ minDate, maxDate, showTimeSelect, showDisabledMonthNavigation, showTimeSelectOnly, interval, excludeDates, excludedTimes, minTime, maxTime, dateFormat, filterDate, inline }) => {

	const [ startDate, setStartDate ] = React.useState(addDays(new Date(), 1))
 
  const handleChange = date => {
		setStartDate(date);
  };
	
	return (
		<DatePicker
			locale="es"
			timeCaption="Horario"
			selected={startDate}
			onChange={handleChange}
			showTimeSelect={showTimeSelect}
			showTimeSelectOnly={showTimeSelectOnly}
			showDisabledMonthNavigation={showDisabledMonthNavigation}
			minDate={minDate}
			maxDate={maxDate}
			dateFormat={dateFormat}
			filterDate={filterDate}
			excludeDates={excludeDates}
			timeIntervals={interval}
			excludeTimes={excludedTimes}
			minTime={minTime}
			maxTime={maxTime}
			inline={inline}
		/>
	);
  
}

export default CustomDatePicker;