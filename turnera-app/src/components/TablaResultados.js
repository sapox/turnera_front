
import React, { useState, useEffect } from "react";

import { Button, Grid, Paper, TableRow, TableContainer, TableCell, Table, TableHead, TableBody } from "@material-ui/core";
import { createMuiTheme,  responsiveFontSizes, makeStyles } from "@material-ui/core";
import { printTurno, getTurnosByFecha_Caja_Sucursal } from "../api";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const TablaResultados = (props) => {
  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme);
  const classes = useStyles();
  const [ , setError] = useState("");
  const [turnos, setTurnos] = useState([]);
  const sucursalId = props.params.sucursalId;
  const tipoCajaId = props.params.tramiteId;
  const fecha = props.params.fecha;

  async function getTurnosFunc(sucursalId, fecha, tipoCajaId) {
    const res = await getTurnosByFecha_Caja_Sucursal(
      sucursalId,
      fecha,
      tipoCajaId
    );
    setTurnos(res.data);
  }

  const reload = () => {
    window.location.reload(false);
  };
  
  useEffect(() => {
    try {
      getTurnosFunc(sucursalId, fecha, tipoCajaId);
    } catch (err) {
      setError(err);
    }
  }, [sucursalId, fecha, tipoCajaId]);

  async function print(sucursalId, fecha, tipoCajaId) {
      await printTurno(sucursalId, fecha, tipoCajaId)
      .then((response) => {
        const file = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id Turno</TableCell>
                <TableCell>Trámite</TableCell>
                <TableCell>Hora</TableCell>
                <TableCell>Contacto</TableCell>
                <TableCell>Documento</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Cuenta Servicios</TableCell>
                <TableCell>Telefono</TableCell>
                <TableCell>Titular</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {turnos.content &&
                turnos.content.map(({id, name, caja, hora, cliente}) => (
                  <TableRow key={name}>
                    <TableCell component="th" scope="row">
                      {id}
                    </TableCell>
                    <TableCell>{caja.tipo.nombre}</TableCell>
                    <TableCell>{hora}</TableCell>
                    <TableCell>{cliente.nombre}</TableCell>
                    <TableCell>{cliente.dni}</TableCell>
                    <TableCell>{cliente.email}</TableCell>
                    <TableCell>{cliente.cuenta}</TableCell>
                    <TableCell>{cliente.telefono}</TableCell>
                    <TableCell>{cliente.titularCuenta}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div style={{ marginTop: theme.spacing(1), display: "flex" }}>
        <Grid container spacing={6}>
          <Grid item xs>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={reload}
                style={{
                  fontWeight: "bold",
                  fontFamily: "Roboto",
                  marginLeft: "20%",
                }}
              >
                cancelar
              </Button>
            </div>
          </Grid>
          <Grid item xs>
            <div
              align="right"
              style={{ alignSelf: "flex-end", marginRight: "8%" }}
            >
              <Button
                style={{ fontWeight: "bold", fontFamily: "Roboto" }}
                variant="contained"
                color="secondary"
                onClick={() => print(sucursalId, fecha, tipoCajaId)}
              >
                Imprimir
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
export default TablaResultados;