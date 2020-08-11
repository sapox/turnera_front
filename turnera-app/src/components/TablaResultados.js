import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import { printTurno, getTurnosByFecha_Caja_Sucursal } from "../api";
import React, { useState, useEffect } from "react";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function TablaResultados(props) {
  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme);
  const classes = useStyles();
  const [error, setError] = useState("");
  const [turnos, setTurnos] = useState([]);
  const [url, setUrl] = useState("");

  async function getTurnosFunc(sucursalId, fecha, tipoCajaId) {
    const res = await getTurnosByFecha_Caja_Sucursal(
      sucursalId,
      fecha,
      tipoCajaId
    );

    setTurnos(res.data);
  }

  const sucursalId = props.params.sucursalId;
  const tipoCajaId = props.params.tramiteId;
  const fecha = props.params.fecha;
  useEffect(() => {
    try {
      getTurnosFunc(sucursalId, fecha, tipoCajaId);
    } catch (err) {
      setError(err);
    }
  }, [sucursalId, fecha, tipoCajaId]);

  const reload = () => {
    window.location.reload(false);
  };

  async function print(sucursalId, fecha, tipoCajaId) {
    const url = await printTurno(sucursalId, fecha, tipoCajaId)
      .then((response) => {
        const file = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const baseUrl = window.location.href;

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
                turnos.content.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.caja.tipo.nombre}</TableCell>
                    <TableCell>{row.hora}</TableCell>
                    <TableCell>{row.cliente.nombre}</TableCell>
                    <TableCell>{row.cliente.dni}</TableCell>
                    <TableCell>{row.cliente.email}</TableCell>
                    <TableCell>{row.cliente.cuenta}</TableCell>
                    <TableCell>{row.cliente.telefono}</TableCell>
                    <TableCell>{row.cliente.titularCuenta}</TableCell>
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
