import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../common/Loading'
import { faPencilAlt, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { confirmAlert } from 'react-confirm-alert'

const Categories = () => {
  const [accessToken, setAccessToken] = useState(false)
  const [formCategory, setFormCategory] = useState({})
  const [messageError, setMessageError] = useState(null)
  const [showMessageError, setShowMesageError] = useState(false)
  const [itemsCategoryList, setItemsCategoryList] = useState([])
  const [reload, setReload] = useState(false)
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
                setItemsCategoryList(res.data)
              })
          }
        }, 1000)
      })
      .catch((res) => {
        console.log(res)
        setAccessToken(false)
      })
  }, [reload])

  const onChangeForm = (event) => {
    const { name, value } = event.target
    setFormCategory({
      ...formCategory,
      [name]: value,
    })
  }

  const submitFormCategory = (event) => {
    event.preventDefault()
    axios
      .post('http://localhost:8080/api/categories/create', formCategory, {
        headers: { Authorization: 'Bearer ' + token },
      })
      .then((res) => {
        if (res.data.message === 'done') {
          setReload(!reload)
          confirmAlert({
            title: 'Thêm danh mục thành công!',
            message: '',
            buttons: [
              {
                label: 'Đồng Ý',
              },
            ],
          })
          setFormCategory({
            name: '',
          })
          setShowMesageError(false)
        } else {
          setMessageError(res.data.message)
          setShowMesageError(true)
        }
      })
  }

  const updateClick = (event, value) =>{
    event.preventDefault()
    setBtnUpdate(true)
    axios
      .get('http://localhost:8080/api/categories/get/' + value.id, {
        headers: { Authorization: 'Bearer ' + token },
      })
      .then((res) => {
          setFormCategory(res.data)
       
      })
  }

  const onUpdateCategory = (event) =>{
    event.preventDefault()
    axios
      .post('http://localhost:8080/api/categories/update', formCategory, {
        headers: { Authorization: 'Bearer ' + token },
      })
      .then((res) => {
        if (res.data.message === 'done') {
          setReload(!reload)
          confirmAlert({
            title: 'Cập nhật danh mục thành công!',
            message: '',
            buttons: [
              {
                label: 'Đồng Ý',
              },
            ],
          })
          setFormCategory({
            name: '',
          })
          setShowMesageError(false)
          setBtnUpdate(false)
        } else {
          setMessageError(res.data.message)
          setShowMesageError(true)
        }
      })
  }
  const main = () => {
    if (accessToken) {
      return (
        <div style={{ height: '350px' }}>
          <form>
            <div className="col-sm-4">
              <div className="add-product">THÊM DANH MỤC</div>
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
                Tên Danh Mục
              </label>
              <input
                type="text"
                className="form-control input-product"
                placeholder="Nhập tên danh mục!"
                value={formCategory.name}
                name="name"
                onChange={onChangeForm}
              />
              {btnUpdate ? (
                <button
                  onClick={onUpdateCategory}
                  type="button"
                  className="btn btn-primary btn-add-product"
                >
                  <FontAwesomeIcon
                    icon={faSave}
                    style={{ marginRight: '5px' }}
                  />
                  Cập nhật
                </button>
              ) : (
                <button
                  onClick={submitFormCategory}
                  type="button"
                  className="btn btn-primary btn-add-product"
                >
                  <FontAwesomeIcon
                    icon={faSave}
                    style={{ marginRight: '5px' }}
                  />
                  Thêm
                </button>
              )}
            </div>
          </form>

          <div className="col-sm-8">
            <div className="add-product">DANH SÁCH DANH MỤC</div>
            <div className="table-wrapper-scroll-y my-custom-scrollbar my-table-cus">
              <table className="table table-bordered table-striped mb-0">
                <thead>
                  <tr>
                    <th scope="col">ID Danh mục</th>
                    <th scope="col">Tên danh mục</th>
                    <th scope="col">Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {itemsCategoryList.map(function (value, index) {
                    return (
                      <tr key={index}>
                        <th scope="row">{value.id}</th>
                        <td>{value.name}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={(event) => updateClick(event,value)}
                          >
                            <FontAwesomeIcon
                              icon={faPencilAlt}
                              style={{ marginRight: '5px' }}
                            />
                            Cập nhật
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
    } else {
      return <Loading />
    }
  }
  return <div>{main()}</div>
}

export default Categories
