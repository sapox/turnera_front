import React, { Component } from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("es", es);

const CustomDatePicker = props => {

	const [ startDate, setStartDate ] = React.useState(new Date())
 
  const handleChange = date => {
		setStartDate(date);
  };
	
	return (
		<DatePicker
			locale="es"
			timeCaption="Horario"
			selected={startDate}
			onChange={handleChange}
			showTimeSelect
			inline
			timeIntervals={props.interval}
			excludeTimes={props.excludedTimes}
			minTime={props.minTime}
      maxTime={props.maxTime}
			dateFormat={props.dateFormat}
			filterDate={props.filterDate}
			//excludeDates={props.excludeDates}
		/>
	);
  
}

export default CustomDatePicker;