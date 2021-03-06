import { faPencilAlt, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import Loading from '../common/Loading'

const Products = () => {
  const [accessToken, setAccessToken] = useState(false)
  const [itemsCategories, setItemsCategory] = useState([])
  const [itemsProducts, setItemProducts] = useState([])
  const [formProducts, setFormProducts] = useState({})
  const [imageProduct, setImageProduct] = useState({})
  const [messageError, setMessageError] = useState(null)
  const [showMessageError, setShowMesageError] = useState(false)
  const [btnUpdate, setBtnUpdate] = useState(false)

  let token = localStorage.getItem('token')
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/products/admin', {
        headers: { Authorization: 'Bearer ' + token },
      })
      .then((res) => {
        setTimeout(() => {
          if (res.data) {
            setAccessToken(true)
            axios
              .get('http://localhost:8080/api/categories/all', {
                headers: { Authorization: 'Bearer ' + token },
              })
              .then((res) => {
                setItemsCategory(res.data)
              })

            axios
              .get('http://localhost:8080/api/products/all', {
                headers: { Authorization: 'Bearer ' + token },
              })
              .then((res) => {
                setItemProducts(res.data)
              })
          }
        }, 1000)
      })
      .catch((res) => {
        console.log(res)
        setAccessToken(false)
      })
  }, [formProducts, showMessageError])

  const onChangeFormProducts = (event) => {
    const { name, value } = event.target
    setFormProducts({
      ...formProducts,
      [name]: value,
    })
  }

  const onChangeFile = (event) => {
    setImageProduct(event.target.files[0])
  }

  const submitFormProducts = (event) => {
    event.preventDefault()
    var formData = new FormData()
    formData.append('image', imageProduct)

    axios
      .post('http://localhost:8080/api/products/upload', formData, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {})
      .catch((error) => {
        console.log(error)
      })

    axios
      .post('http://localhost:8080/api/products/create', formProducts, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        if (res.data.message === 'done') {
          confirmAlert({
            title: 'Th??m s???n ph???m th??nh c??ng!',
            message: '',
            buttons: [
              {
                label: '?????ng ??',
              },
            ],
          })
          setFormProducts({
            name: '',
            price: '',
            available: '3',
            categoryId: '3',
          })
          setShowMesageError(false)
        } else {
          setMessageError(res.data.message)
          setShowMesageError(true)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const onUpdateProduct = (event, value) => {
    event.preventDefault()
    setBtnUpdate(true)
    axios
      .get('http://localhost:8080/api/products/getone/' + value.id, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        setFormProducts(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const updateProduct = (event) => {
    event.preventDefault()
    axios
      .post('http://localhost:8080/api/products/update', formProducts, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        if (res.data.message === 'done') {
          confirmAlert({
            title: 'C???p nh???t s???n ph???m th??nh c??ng!',
            message: '',
            buttons: [
              {
                label: '?????ng ??',
              },
            ],
          })
          setFormProducts({
            name: '',
            price: '',
            available: '3',
            categoryId: '3',
          })
          setShowMesageError(false)
          setBtnUpdate(false)
        } else {
          setMessageError(res.data.message)
          setShowMesageError(true)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const main = () => {
    if (!accessToken) {
      return <Loading />
    } else {
      return (
        <div>
          <form>
            <div className="col-sm-4">
              <div className="add-product">TH??M S???N PH???M</div>
              {showMessageError ? (
                <div className="alert alert-danger" role="alert">
                  <span
                    className="glyphicon glyphicon-exclamation-sign"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Error:</span>
                  {messageError}
                </div>
              ) : (
                ''
              )}
              <label className="col-sm-4 col-form-label fcolor">
                T??n s???n ph???m
              </label>
              <input
                type="text"
                className="form-control input-product"
                placeholder="Nh???p t??n s???n ph???m!"
                value={formProducts.name}
                name="name"
                onChange={onChangeFormProducts}
              />
              <label className="col-sm-4 col-form-label fcolor">
                Gi?? s???n ph???m
              </label>
              <input
                type="number"
                className="form-control input-product"
                placeholder="Nh???p gi?? s???n ph???m!"
                value={formProducts.price}
                name="price"
                onChange={onChangeFormProducts}
              />
              <label className="col-sm-4 col-form-label fcolor">
                Tr???ng th??i
              </label>
              <select
                className="form-control input-product"
                value={formProducts.available}
                name="available"
                onChange={onChangeFormProducts}
              >
                <option value="3">Ch???n tr???ng th??i</option>
                <option value="1">Ho???t ?????ng</option>
                <option value="0">Kh??ng ho???t ?????ng</option>
              </select>
              <label className="col-sm-4 col-form-label fcolor">Danh m???c</label>
              <select
                className="form-control input-product"
                value={formProducts.categoryId}
                name="categoryId"
                onChange={onChangeFormProducts}
              >
                <option value="3">Ch???n danh m???c</option>
                {itemsCategories.map(function (value, index) {
                  return (
                    <option key={index} value={value.id}>
                      {value.name}
                    </option>
                  )
                })}
              </select>
              <label className="col-sm-4 col-form-label fcolor">
                ???nh s???n ph???m
              </label>
              <input
                type="file"
                className="form-control-file input-product"
                onChange={onChangeFile}
              />
              {btnUpdate ? (
                <button
                  onClick={updateProduct}
                  type="button"
                  className="btn btn-primary btn-add-product"
                >
                  <FontAwesomeIcon icon={faSave} style={{marginRight : '5px'}}/>
                  C???p nh???t
                </button>
              ) : (
                <button
                  onClick={submitFormProducts}
                  type="button"
                  className="btn btn-primary btn-add-product"
                >
                  <FontAwesomeIcon icon={faSave} style={{marginRight : '5px'}}/>
                  Th??m
                </button>
              )}
            </div>
          </form>

          <div className="col-sm-8">
            <div className="add-product">DANH S??CH S???N PH???M</div>
            <div className="table-wrapper-scroll-y my-custom-scrollbar">
              <table className="table table-bordered table-striped mb-0">
                <thead>
                  <tr>
                    <th scope="col">T??n S???n Ph???m</th>
                    <th scope="col">Gi?? S???n Ph???m</th>
                    <th scope="col">Tr???ng Th??i</th>
                    <th scope="col">H??nh ?????ng</th>
                  </tr>
                </thead>
                <tbody>
                  {itemsProducts.map(function (value, index) {
                    return (
                      <tr key={index}>
                        <th scope="row">{value.name}</th>
                        <td>{value.price} $</td>
                        <td>
                          <i>
                            {value.available === true ? (
                              <span style={{ color: 'green' }}>
                                ??ang ho???t ?????ng
                              </span>
                            ) : (
                              <span style={{ color: 'red' }}>
                                Kh??ng ho???t ?????ng
                              </span>
                            )}
                          </i>
                        </td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={(event) => onUpdateProduct(event, value)}
                          >
                            <FontAwesomeIcon icon={faPencilAlt} style={{marginRight : '5px'}}/>
                            C???p nh???t
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    }
  }
  return <div>{main()}</div>
}

export default Products
