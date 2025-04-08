import {useState} from "react";
import {Form, Button, Alert} from "react-bootstrap";
import "./login.scss";
import {login} from "../../apis/auth";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            setLoading(true);
            const payload = {
                email: inputEmail,
                password: inputPassword,
            }
            const res = await login(payload);
            localStorage.setItem("accessToken", res?.data?.accessToken);
            toast.success("Đăng nhập thành công");
            navigate("/admin");
            setLoading(false);
        } catch (error) {
            // @ts-ignore
            toast.error(error?.response?.data?.message || "Đăng nhập thất bại");
            setLoading(false);
            console.log(error)
        }

    };

    return (
        <div
            className="sign-in__wrapper"
        >
            {/* Overlay */}
            <div className="sign-in__backdrop"></div>
            {/* Form */}
            <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>

                <div className="h4 mb-2 text-center">Đăng nhập</div>
                {/* ALert */}
                {show ? (
                    <Alert
                        className="mb-2"
                        variant="danger"
                        onClose={() => setShow(false)}
                        dismissible
                    >
                        Incorrect username or password.
                    </Alert>
                ) : (
                    <div/>
                )}
                <Form.Group className="mb-2" controlId="username">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="text"
                        value={inputEmail}
                        placeholder="Email"
                        onChange={(e) => setInputEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="password">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control
                        type="password"
                        value={inputPassword}
                        placeholder="Mật khẩu"
                        onChange={(e) => setInputPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="checkbox">
                    <Form.Check type="checkbox" label="Remember me"/>
                </Form.Group>
                {!loading ? (
                    <Button className="w-100" variant="primary" type="submit">
                        Log In
                    </Button>
                ) : (
                    <Button className="w-100" variant="primary" type="submit" disabled>
                        Logging In...
                    </Button>
                )}
                <div className="d-grid justify-content-end">
                    <Button
                        className="text-muted px-0"
                        variant="link"
                    >
                        Forgot password?
                    </Button>
                </div>
            </Form>

        </div>
    );
};

export default Login;
