import {GridColDef} from "@mui/x-data-grid";
import DataTable from "../../../components/dataTable/DataTable.tsx";
import "./users.scss";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {deleteUser, getAllUsers} from "../../../apis/users.ts";
import moment from "moment";
import {checkRole} from "../../../utils/enum.ts";
import Add from "../../../components/add/Add.tsx";
import {Pagination} from "@mui/material";
import {userColumnAdd} from "../../../data.ts";
import {useSelector} from "react-redux";

const columns: GridColDef[] = [
    {
        field: "stt",
        headerName: "ID",
        width: 90,
        renderCell: (params) => {
            const rowIndex = params.api.getSortedRowIds().indexOf(params.id);
            return <div className="stt">{rowIndex + 1}</div>;
        },
    },
    {
        field: "img",
        headerName: "Avatar",
        width: 100,
        renderCell: (params) => {
            return <img src={params.row.img || "/noavatar.png"} alt=""/>;
        },
    },
    {
        field: "name",
        type: "string",
        headerName: "Họ và tên",
        width: 150,
    },
    {
        field: "email",
        type: "string",
        headerName: "Email",
        width: 250,
    },
    {
        field: "phone",
        type: "string",
        headerName: "Số điện thoại",
        width: 200,
    },
    {
        field: "createdAt",
        headerName: "Ngày tạo",
        width: 200,
        type: "string",
        renderCell: (params) => {
            return <div>{params?.row?.createdAt ? moment(params?.row?.createdAt).format('DD-MM-YYYY') : ''}</div>
        },
    },
    {
        field: "role",
        headerName: "Quyền hạn",
        width: 150,
        type: "string",
        renderCell: (params) => {
            return <div>{checkRole(params?.row?.role)}</div>
        },
    },
];

const Users = () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [userRows, setUserRows] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const user = useSelector((state: any) => state.user);
    console.log(user)
    const fetchData = async (page: number | undefined) => {
        try {
            setLoading(true);
            const res = await getAllUsers(page);
            setUserRows(res.data?.users);
            setTotalPage(res.data?.totalPages);
            setPage(res.data?.currentPage);
            setLoading(false)
        } catch (e) {
            setLoading(false);
            toast("Đã có lỗi xảy ra, vui lòng thử lại sau")
            console.log(e);
        }
    }
    useEffect(() => {
        fetchData(page);
    }, [])
    useEffect(() => {
        fetchData(page);
    }, [page])
    const handleClose = () => {
        setOpen(false);
    }
    const setData = (data: any) => {
        // @ts-ignore
        setUserRows((prev: any) => {
            const newData = [...prev];
            newData.unshift(data);
            return newData;
        });
    }
    const handleDelete = async (id: string): Promise<any> => {
        try {
            if (id.toString() === user._id.toString()) {
                toast.error("Không thể xóa tài khoản của chính bạn")
                return;
            }
            await deleteUser(id);
            setUserRows((prev => prev.filter((item: any) => item._id !== id)));
            toast.success('Xóa tài khoản thành công');
        } catch (e) {
            toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau")
            console.log(e);
        }
    }
    return (
        <div className="users">
            <div className="info">
                <h1>Danh sách tài khoản</h1>
                <button className='btn btn-primary' onClick={() => setOpen(true)}>Thêm mới user</button>
            </div>
            {/* @ts-ignore*/}
            <DataTable handleDelete={handleDelete} slug="users" columns={columns} rows={userRows} loading={loading}
            />
            <div className='text-white d-flex justify-content-end p-3'>
                <Pagination count={totalPage} className='bg-white p-1 rounded'
                            page={page} onChange={(_e, value) => {
                    setPage(value);
                }}
                />
            </div>
            {open && <Add setData={setData} slug='user' type='user' open={open} columns={userColumnAdd}
                          handleClose={handleClose}/>}
        </div>
    );
};

export default Users;
