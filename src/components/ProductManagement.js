import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { saveProduct, listProducts, deleteProduct } from '../store/actions/productActions';

export default function ProductManagement(props) {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    const [display, setDisplay] = useState('');
    const [os, setOs] = useState('');
    const [camera, setCamera] = useState('');
    const [front, setFront] = useState('');
    const [cpu, setCpu] = useState('');
    const [ram, setRam] = useState('');
    const [memory, setMemory] = useState('');
    const [sim, setSim] = useState('');
    const [battery, setBattery] = useState('');
    const [uploading, setUploading] = useState(false);
    const [save, setSave] = useState(false);
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { products } = productList;

    const productSave = useSelector((state) => state.productSave);
    const { success: successSave } = productSave;

    const productDelete = useSelector((state) => state.productDelete);
    const { success: successDelete } = productDelete;

    useEffect(() => {
        if (successSave) {
            setSave(true);
        }
        dispatch(listProducts());
        return () => {
            //
        };
    }, [successSave, successDelete]);

    const openModal = (product) => {
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setImage(product.image);
        setBrand(product.brand);
        setCountInStock(product.countInStock);
        setDisplay(product.display);
        setOs(product.os);
        setCamera(product.camera);
        setFront(product.front);
        setCpu(product.cpu);
        setRam(product.ram);
        setMemory(product.memory);
        setSim(product.sim);
        setBattery(product.battery);

        setSave(false);
    };
    const closeModal = () => {
        setId("");
        setName("");
        setPrice("");
        setDescription("");
        setImage("");
        setBrand("");
        setCountInStock("");
        setDisplay("");
        setOs("");
        setCamera("");
        setFront("");
        setCpu("");
        setRam("");
        setMemory("");
        setSim("");
        setBattery("");
        setSave(false);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            saveProduct({
                _id: id,
                name,
                price,
                image,
                brand,
                countInStock,
                description,
                display,
                os,
                camera,
                front,
                cpu,
                ram,
                memory,
                sim,
                battery
            })
        );
    };
    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id));
    };
    const uploadImageHandler = (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setUploading(true);
        axios.post('/api/uploads', bodyFormData, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        })
            .then((response) => {
                setImage(response.data);
                setUploading(false);
            })
            .catch((error) => {
                console.log(error);
                setUploading(false);
            });
    };
    return (
        <div className="container">
            <div>
                <h1 className="text-center mt-4 mb-1" style={{ color: "#056676", fontWeight: "500", letterSpacing: "7px" }}>SẢN PHẨM</h1>
            </div>
            <a href="#modal" style={{ textDecoration: "none", color: "white", backgroundColor: "#056676", borderColor: "#056676" }} className="btn btn-primary" onClick={() => closeModal({})} >Thêm sản phẩm</a>
            <ModalWrapper id="modal">
                <div>
                    <form onSubmit={submitHandler}>
                        <div className="container p-2">
                            <div className="row">
                                <div className="col-12 text-center">
                                    <h1 style={{ color: "#056676", fontWeight: "500" }}>{id ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}</h1>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="row mt-4">
                                        <div className="col-12 mx-auto">
                                            <label htmlFor="name" className="text-muted">Tên sản phẩm</label>
                                            <input type="text" name="name" value={name} id="name" onChange={(e) => setName(e.target.value)}></input>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-12 mx-auto">
                                            <label htmlFor="price" className="text-muted">Giá sản phẩm</label>
                                            <input type="text" name="price" value={price} id="price" onChange={(e) => setPrice(e.target.value)}></input>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-12 mx-auto">
                                            <label htmlFor="image" className="text-muted">Ảnh sản phẩm</label>
                                            <div className="d-flex flex-row">
                                                <input type="text" name="image" value={image} id="image" onChange={(e) => setImage(e.target.value)}></input>
                                                <label htmlFor="upload-image" className="btn btn-primary ml-2" style={{ height: "40px", backgroundColor: "#056676", borderColor: "#056676" }}>Chọn</label>
                                                <input type="file" onChange={uploadImageHandler} className="text-muted upload-image" id="upload-image"></input>
                                                {uploading && <div>Uploading...</div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-12 mx-auto">
                                            <label htmlFor="brand" className="text-muted">Thương hiệu</label>
                                            <input type="text" name="brand" value={brand} id="brand" onChange={(e) => setBrand(e.target.value)}></input>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-12 mx-auto">
                                            <label htmlFor="countInStock" className="text-muted">Số lượng</label>
                                            <input type="text" name="countInStock" value={countInStock} id="countInStock" onChange={(e) => setCountInStock(e.target.value)}></input>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-12 mx-auto d-flex flex-column">
                                            <label htmlFor="description" className="text-muted">Mô tả</label>
                                            <textarea name="description" value={description} id="description" onChange={(e) => setDescription(e.target.value)}></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="row mt-4">
                                        <div className="col-12 mx-auto">
                                            <label htmlFor="display" className="text-muted">Màn hình</label>
                                            <input type="text" name="display" value={display} id="display" onChange={(e) => setDisplay(e.target.value)}></input>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-12 mx-auto">
                                            <label htmlFor="os" className="text-muted">Hệ điều hành</label>
                                            <input type="text" name="os" value={os} id="os" onChange={(e) => setOs(e.target.value)}></input>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-12 mx-auto">
                                            <label htmlFor="camera" className="text-muted">Camera sau</label>
                                            <input type="text" name="camera" value={camera} id="camera" onChange={(e) => setCamera(e.target.value)}></input>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-12 mx-auto">
                                            <label htmlFor="front" className="text-muted">Camera trước</label>
                                            <input type="text" name="front" value={front} id="front" onChange={(e) => setFront(e.target.value)}></input>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-12 mx-auto">
                                            <label htmlFor="cpu" className="text-muted">Chipset</label>
                                            <input type="text" name="cpu" value={cpu} id="cpu" onChange={(e) => setCpu(e.target.value)}></input>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-6 mx-auto">
                                            <label htmlFor="ram" className="text-muted">Bộ nhớ ram</label>
                                            <input type="text" name="ram" value={ram} id="ram" onChange={(e) => setRam(e.target.value)}></input>
                                        </div>
                                        <div className="col-6 mx-auto">
                                            <label htmlFor="memory" className="text-muted">Bộ nhớ trong</label>
                                            <input type="text" name="memory" value={memory} id="memory" onChange={(e) => setMemory(e.target.value)}></input>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-12 mx-auto">
                                            <label htmlFor="sim" className="text-muted">Thẻ sim</label>
                                            <input type="text" name="sim" value={sim} id="sim" onChange={(e) => setSim(e.target.value)}></input>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-12 mx-auto">
                                            <label htmlFor="battery" className="text-muted">Dung lượng pin</label>
                                            <input type="text" name="battery" value={battery} id="battery" onChange={(e) => setBattery(e.target.value)}></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-6 mx-auto d-flex flex-row">
                                    <div>
                                        {!save ? 
                                        (
                                            <button type="submit" className="btn btn-primary" style={{ width: "100px", backgroundColor: "#056676", borderColor: "#056676" }}>
                                                {id ? 'Cập nhật' : 'Thêm'}
                                            </button>
                                        ) 
                                        :
                                        (
                                            <button type="submit" className="btn btn-primary" style={{ width: "100px", backgroundColor: "#056676", borderColor: "#056676" }} disabled>
                                                {id ? 'Cập nhật' : 'Thêm'}
                                            </button>
                                        )
                                        }
                                    </div>
                                    <div className="ml-auto">
                                        <a href="#close" style={{ color: "#056676", width: "100px" }} className="btn btn-light">Trở lại</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </ModalWrapper>
            <div className="row mt-2">
                <div className="col-12">
                    <ProductsColumnsWrapper>
                        <div className="container text-center d-none d-lg-block">
                            <div className="row">
                                <div className="col-10 mx-auto col-lg-2">
                                    <p className="text-uppercase py-auto">Sản phẩm</p>
                                </div>
                                <div className="col-10 mx-auto col-lg-2">
                                    <p className="text-uppercase">Tên sản phẩm</p>
                                </div>
                                <div className="col-10 mx-auto col-lg-2">
                                    <p className="text-uppercase">Giá</p>
                                </div>
                                <div className="col-10 mx-auto col-lg-2">
                                    <p className="text-uppercase">Số lượng</p>
                                </div>
                                <div className="col-10 mx-auto col-lg-2">
                                    <p className="text-uppercase">Tổng</p>
                                </div>
                                <div className="col-10 mx-auto col-lg-2">
                                    <p className="text-uppercase">Chức năng</p>
                                </div>
                            </div>
                        </div>
                    </ProductsColumnsWrapper>
                    {products.map((product) => (
                        <CartWrapper className="px-lg-0" key={product._id}>
                            <div className="row text-center">
                                <div className="col-10 mx-auto col-lg-2">
                                    <Link to={"/product/" + product._id}>
                                        <img src={product.image} style={{ width: "5rem" }} className="img-fluid" alt="product" />
                                    </Link>
                                </div>
                                <div className="col-10 mx-auto col-lg-2 my-auto">
                                    <span className="d-lg-none">Sản phẩm: </span>
                                    <Link to={"/product/" + product._id} style={{ color: "#056676", textDecoration: "none" }}>
                                        {product.name}
                                    </Link>
                                </div>
                                <div className="col-10 mx-auto col-lg-2 my-auto">
                                    <span className="d-lg-none">Giá: </span>
                                    {convertToString(product.price)}đ
                                </div>
                                <div className="col-10 mx-auto col-lg-2 my-lg-auto">
                                    {product.countInStock}
                                </div>
                                <div className="col-10 mx-auto col-lg-2 my-auto">
                                    {convertToString(product.price * product.countInStock)}đ
                                </div>
                                <div className="col-10 mx-auto col-lg-2 my-auto">
                                    <div className="d-flex justify-content-center">
                                        <div className="cart-update-icon pr-1" onClick={() => openModal(product)}>
                                            <a href="#modal" style={{ color: "#1e4b70" }}><i class="fas fa-wrench"></i></a>
                                        </div>
                                        <div className="cart-remove-icon" onClick={() => deleteHandler(product)}>
                                            <i className="fas fa-trash"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CartWrapper>
                    ))}
                </div>
            </div>
        </div>
    );
}

function convertToString(value) {
    let resString = value.toString();
    let resFinal = "";
    while (resString.length > 3) {
        resFinal = "." + resString.substr(resString.length - 3, resString.length - 1) + resFinal;
        resString = resString.substr(0, resString.length - 3);
    }
    resFinal = resString + resFinal;
    return resFinal;
}

const ModalWrapper = styled.div`
    input[type="text"], input[type="password"], input[type="date"], select{
        position: relative;
        border: none;
        border-bottom: 1px solid #f1f4f8;
        margin-bottom: 0.8rem;
        width: 100%;
        padding: 0px 0px 0px 0px;
        height: 40px !important;
    }

    textarea{
        position: relative;
        border-color: #6c757d;
        border-radius: 10px;
        height: 210px;
    }

    input[type="text"]:focus, input[type="password"]:focus, input[type="date"]:focus, select:focus, textarea:focus{
        outline: none;
    }

    label{
        margin-bottom: 0rem !important;
    }

    a{
        text-decoration: none;
    }

    .upload-image{
        opacity: 0;
        position: absolute;
        z-index: -1;
    }
`

const ProductsColumnsWrapper = styled.div`
    .container{
        background: white;
        height: 40px;
        border-radius: 20px;
        color: #666666;
    }
    p{
        margin-top: 8px !important;
    }
`

const CartWrapper = styled.div`
    input{
        font-size: 0px !important;
    }

    .btn-number-cart{
        padding: 0px !important;
    }

    .cart-remove-icon{
        cursor: pointer;
        font-size: 1.4rem;
        color: #d14545;
    }

    .cart-update-icon{
        cursor: pointer;
        font-size: 1.4rem;
        color: #4592d1;
    }

    background: white;
    margin-top: 10px;
    padding: 10px 0px;
    border-radius: 20px;
    color: #056676 !important;
`