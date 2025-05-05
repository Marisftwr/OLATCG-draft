import OlatcgNavbar from "../components/OlatcgNavbar";
import AppRoutes from "../routes/AppRoutes";
import { getMessage } from "../services/MessageService";
import OlatcgFooter from "../components/OlatcgFooter";

const App = () => {
  return <>
    <OlatcgNavbar />
    <AppRoutes />
    <OlatcgFooter />    
  </>;
}

export default App;