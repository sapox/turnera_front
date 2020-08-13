
import React, { Fragment } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { text } from './../const/disclaimer';
import { Checkbox, FormControl, FormControlLabel } from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux';
import { setDisclaimerValue } from './features/contacto/disclaimerSlice';

const validation = Yup.object({
	isConfirmed: Yup.boolean('Acepte los términos')
		.required("requerido")
});

const Disclaimer = () => {

  const dispatch = useDispatch();
  const isConfirmed = useSelector((state) => state.disclaimer.isConfirmed);
	
	const formik = useFormik({
		initialValues: {
			isConfirmed: false,
		},
		validationSchema: validation,
		onSubmit: () => {
			dispatch(setDisclaimerValue(!isConfirmed));
		},
	});

	return (
		<form onChange={formik.handleSubmit}>
      <div style={{ display: "flex", justifyContent: "center", textAlign: "justify" }}>
        <FormControl>
          {text.map((t, i) => (
              <Fragment key={i}>
                <article>
                  <p>{t.content}</p>
                </article>
              </Fragment>
            ))}
          
          <FormControlLabel
            control={
              <Checkbox
                onChange={formik.handleChange}
                color= "primary"
                checked={formik.values.isConfirmed}    
                name="isConfirmed"
              />
            }
            label="Confirmar términos"
          /> 
      </FormControl>
    </div>
			
		</form>
	);
};

export default Disclaimer;