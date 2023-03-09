import { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import MapView from './map/MapView'

const LoginForm = () => {
  return (
    
    <Container fixed>
      <MapView/>
    </Container>
  );
}

export default LoginForm;