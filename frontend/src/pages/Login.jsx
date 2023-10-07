import Form from "../components/Forms/Form"

function Login() {
    return <Form route="/api/token/" method="login" />
}

export default Login;