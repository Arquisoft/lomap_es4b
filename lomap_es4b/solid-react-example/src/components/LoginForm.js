import { useState, useEffect } from "react";
import { LoginButton } from "@inrupt/solid-ui-react";
import { Button, TextField, FormGroup, Container } from "@material-ui/core";


const LoginForm = () => {
 /*  const [idp, setIdp] = useState("https://uo276467.inrupt.net");
  const [currentUrl, setCurrentUrl] = useState("https://localhost:3000");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [setCurrentUrl]);
 */
  return (
    
    <Container fixed>

      <h1>Pantalla Inicial</h1>

      {/* <FormGroup>
        <TextField
          label="Identity Provider PRUEBA2"
          placeholder="Identity Provider"
          type="url"
          value={idp}
          onChange={(e) => setIdp("https://uo276467.inrupt.net")}
          InputProps={{
            endAdornment: (
              <LoginButton oidcIssuer={idp} redirectUrl={currentUrl}>
                <Button variant="contained" color="primary">
                  Login
                  </Button>
              </LoginButton>
            ),
          }}
        />
      </FormGroup> */}
      
    </Container>
  );
}

export default LoginForm;