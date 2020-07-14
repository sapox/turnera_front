import React from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, setMinutes } from "date-fns";


registerLocale("es", es);

const CustomDatePicker = ({ name, value, onChange, minDate, maxDate, showTimeSelect, showDisabledMonthNavigation, showTimeSelectOnly, interval, excludeDates, excludedTimes, minTime, maxTime, dateFormat, filterDate, inline }) => {
	//startDate is set to tomorrow starting at minute 30
	const [ startDate, setStartDate ] = React.useState(setMinutes(addDays(new Date(), 1), 30));
 
  const handleChange = date => {
		setStartDate(date);
	};
	
	console.log(value);
	
	return (
		<DatePicker
			locale="es"
			timeCaption="Horario"
			selected={(value && new Date(value)) || null}
			onChange={val => {
        onChange(name, val);
      }}
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