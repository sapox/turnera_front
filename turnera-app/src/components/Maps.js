import React from "react";
import {src} from "../const/mapsSRC";
import Iframe from 'react-iframe'

const SucursalMaps = (props) => {
  const idd = props.iddd ;
  return (
    <div>
      <div>
        {src
          .filter((mapa) => mapa.id == idd)
          .map((list) => (
            <Iframe 
              src={list.map}
              width="100%"
              height="100%"
              frameborder="0"
              style={{ border: "0" }}
              allowfullscreen=""
              ariaHidden="false"
              tabindex="0"
              />
          ))}
      </div> 
    </div>
  );
};
export default SucursalMaps;
