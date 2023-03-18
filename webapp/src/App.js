import './App.css';
import { SessionProvider} from "@inrupt/solid-ui-react";
import { useState} from "react";
import LoginForm from "./components/login/LoginForm"
import ProfileViewer from "./components/profileviewer/ProfileViewer"
import { useSession } from "@inrupt/solid-ui-react/dist";
import Navbar from "./components/navbar/Navbar";
import { ProSidebarProvider } from 'react-pro-sidebar';


const App = () => {
  //We use this state variable
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //With this we can control the login status for solid
  const { session } = useSession();

  const [marcadorSeleccionado,setMarcadorSeleccionado] = useState(false);


  //We have logged in
  session.onLogin(()=>{
    setIsLoggedIn(true)
  })

  //We have logged out
  session.onLogout(()=>{
    setIsLoggedIn(false)

  })

  return(
    
    <SessionProvider sessionId="log-in-example">
      <header>
        <Navbar logggin={isLoggedIn}/>
      </header>
       
      {(!isLoggedIn) ? 
        <ProSidebarProvider><LoginForm /> </ProSidebarProvider>: 
        <ProSidebarProvider><ProfileViewer className="profileViewer" marcadorSeleccionado={marcadorSeleccionado} setMarcadorSeleccionado={setMarcadorSeleccionado}/></ProSidebarProvider>}
    </SessionProvider>
  )
}

export default App;
