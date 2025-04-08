import {GridColDef} from "@mui/x-data-grid";
import "./add.scss";
import {Modal} from "react-bootstrap";
import React, {ChangeEvent, useState} from "react";
import {toast} from "react-toastify";
import {register} from "../../apis/auth.ts";

type Props = {
    slug: string;
    type: string;
    columns: GridColDef[];
    setData: React.Dispatch<React.SetStateAction<any>>;
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
    open?: boolean;
};
const requiredFieldUser = [
    {field: "name", message: "Vui lòng nhập tên"},
    {field: "email", message: "Vui lòng nhập email"},
    {field: "password", message: "Vui lòng nhập password"},
    {field: "phone", message: "Vui lòng nhập phone"},
];
const fieldNotShow = ["stt"];
const Add = (props: Props) => {
    const [data, setData] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setData((prev: any) => ({...prev, [name]: value}));
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            switch (props.type) {
                case "user":
                    await addUser();
                    break;
                default:
                    break;
            }
        } catch (e) {
            console.log(e);
        }


    };

    const addUser = async () => {
        try {
            for (const {field, message} of requiredFieldUser) {
                if (!data[field]) {
                    toast.warn(message);
                    return;
                }
            }
            setLoading(true);
            const res = await register(data);
            setData(res?.data);
            setLoading(false);
            toast.success("Thêm người dùng thành công");
            props.handleClose(false);
        } catch (e) {
            setLoading(false);
            // @ts-ignore
            toast.error(e?.response?.data?.message || "Đã có lỗi xảy ra, vui lòng thử lại sau");
            console.log(e);
        }
    }
    return (
        // @ts-ignore
        <Modal show={props.open} centered className="add" onHide={() => props.handleClose()}
               size="lg"
        >
            <div className="modal-add">
                <h1>Add new {props.slug}</h1>
                <form onSubmit={handleSubmit}>
                    {props.columns
                        .filter((column => !fieldNotShow.includes(column.field)))
                        .map((column) => (
                            <div className="item" key={column.field}>
                                <label>{column.headerName}</label>
                                <input onChange={handleChange} name={column.field} type={column.type}
                                       placeholder={column.field}/>
                            </div>
                        ))}
                    <button className='btn btn-primary'>{loading ? 'Vui lòng chờ...' : 'Xác nhận'}</button>
                </form>
            </div>
        </Modal>
    );
};

export default Add;
