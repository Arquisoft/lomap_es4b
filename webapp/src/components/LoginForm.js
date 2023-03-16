import { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import MapView from './map/MapView'

const LoginForm = () => {
  return (
    
    <Container maxWidth={false} disableGutters={true}>
      <MapView isLogged={false}/>
    </Container>
  );
}

export default LoginForm;