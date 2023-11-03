import "../../styles/Form.css"
import { Button, Typography } from "@mui/material";

function Form({ formName, buttonName, handleSubmit, children }) {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  // // This code will have to change
  // const buttonText = method === "login" ? "Login" : "Register";

  // // New code, but I think there might be a more efficient way of doing so
  // let name = "invalid";
  // switch (method) {
  //     case "login":
  //         name = "Login";
  //         break;
  //     case "companyRegister":
  //         name = "Company Register";
  //         break;
  //     case "professionalRegister":
  //         name = "Professional Register";
  //         break;
  //     default:
  //         break;
  // }

  // const handleSubmit = async (e) => {
  //     setLoading(true);
  //     e.preventDefault();

  //     try {
  //         const res = await api.post(route, { username, password })
  //         if (method === "login") {
  //             localStorage.setItem(ACCESS_TOKEN, res.data.access);
  //             localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
  //             navigate("/")
  //         } else {
  //             navigate("/login")
  //         }
  //     } catch (error) {
  //         alert(error)
  //     } finally {
  //         setLoading(false)
  //     }
  // };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <Typography
        variant="h4"
        gutterBottom
      >
        {formName}
      </Typography>
      {children}
      <Button 
        className="form-button" 
        type="submit"
        variant="contained"
        margin="normal"
        sx={{ backgroundColor: '#F5A67F', color: '#fff' }}
      >
        {buttonName}
      </Button>
    </form>
  );
}

export default Form