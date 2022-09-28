import React, { Component } from 'react'
import { connect } from 'react-redux'

class FormDangKy extends Component {
  state = {
    values: {
      userName: '',
      fullName: '',
      phoneNumber: '',
      email: '',
    },
    errors: {},
    input: '',
  }

  handleState = (event) => {
    const { name, value } = event.target
    this.setState({
      // [event.target.name]: event.target.value
      values: {
        ...this.state.values,
        [name]: value,
      }
    })
    console.log(event.target.value)
    // console.log(event.target.name)
    // console.log()
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.state)

    // chặn event không thêm được khi click đăng ký
    if (!event.target.checkValidity()) {
      return
    }


    this.props.dispatch({
      type: this.props.selectedUser ? 'UPDATE_USER' : 'ADD_USER',
      payload: this.state.values
    })

    this.setState({
      values: {
        userName: '',
        fullName: '',
        phoneNumber: '',
        email: '',
      },
      input: ''
    })
  }
  handleInput = (event) => {
    this.setState({
      input: event.target.value,
    })
  }

  handleSearch = (event) => {
    this.props.dispatch({
      type: 'SEARCH_USER',
      payload: this.state.input
    })
  }


  handleBlur = (event) => {
    console.log(event)
    const { name, title, minLength, maxLength, validationMessage, validity: { valueMissing, tooShort, patternMismatch } } = event.target
    // const {valueMissing} = validity
    console.log(validationMessage)
    console.log(patternMismatch)
    // console.log(validity)

    let mess = ''
    if (valueMissing) {
      mess = `${title} không được bỏ trống !`
    }

    if (tooShort) {
      mess = `${title} từ ${minLength} đến ${maxLength} ký tự !`
    }

    if (patternMismatch) {
      switch (name) {
        case 'userName':
          mess = `${title} phải là số !`;
          break;
        case 'fullName':
          mess = `${title} phải là ký tự !`;
          break;
        case 'phoneNumber':
          mess = `${title} phải là 10 số !`;
          break;
        default:
          mess = `${title} không đúng định dạng !`
      }
    }
    this.setState({
      errors: {
        ...this.state.errors,
        [name]: mess,
      }
    })
  }

 
  // chuyển props thành state nội bộ
  static getDerivedStateFromProps = (nextProps, currentState) => {
    // console.log(nextProps, currentState)
    if (nextProps.selectedUser && nextProps.selectedUser.id !== currentState.values.id) {
      currentState.values = nextProps.selectedUser
    }

    return currentState
  }

  render() {

    // console.log(this.state)

    // const {selectedUser} = this.props
    const { userName, fullName, phoneNumber, email } = this.state.values
    // console.log("selecteduser: ", selectedUser);

    return (
      <form
        // tắt pop-up khi handle
        noValidate
        // onSubmit={(event) => {
        //     event.preventDefault()
        //     console.log(this.state)
        // }}
        onSubmit={this.handleSubmit}
      >
        <div className='text-3xl text-white bg-gray-700 p-5'>Thông tin sinh viên</div>
        <div className='grid grid-cols-2 gap-6 mt-5'>
          <div>
            <p>Mã sinh viên</p>
            <input required pattern='^(0|[1-9][0-9]*)$'  minLength={4} maxLength={15} title='Mã sinh viên' type="text" value={userName} name='userName' placeholder='Mã sinh viên' className='border-2 border-gray rounded-sm p-3 w-full mt-2'

              onChange={this.handleState}
              onBlur={this.handleBlur}
            />
            <span className='text-red-500 text-14'>{this.state.errors.userName}</span>
          </div>
          <div>
            <p>Họ tên</p>
            <input required pattern="^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+" title='Họ tên' type="text" value={fullName} name='fullName' placeholder='Họ tên' className='border-2 border-gray rounded-sm p-3 w-full mt-2'

              onChange={this.handleState}
              onBlur={this.handleBlur}


            />
            <span className='text-red-500 text-14'>{this.state.errors.fullName}</span>
          </div>
          <div>
            <p>Số điện thoại</p>
            <input required pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$" title='Số điện thoại' type="text" value={phoneNumber} name='phoneNumber' placeholder='Số điện thoại' className='border-2 border-gray rounded-sm p-3 w-full mt-2'

              onChange={this.handleState}
              onBlur={this.handleBlur}

            />
            <span className='text-red-500 text-14'>{this.state.errors.phoneNumber}</span>
          </div>
          <div>
            <p>Email</p>
            <input required pattern='^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$' title='Email' type="text" value={email} name='email' placeholder='Email' className='border-2 border-gray rounded-sm p-3 w-full mt-2'

              onChange={this.handleState}
              onBlur={this.handleBlur}

            />
            <span className='text-red-500 text-14'>{this.state.errors.email}</span>
          </div>
          <div>
            <button type='submit' className={`p-2 rounded-sm mr-4 bg-green-500 text-white cursor-pointer hover:bg-red-700 ${!this.props.selectedUser ? '' : 'hidden'}`}>Thêm sinh viên</button>
            <button type='submit' className={`p-2 rounded-sm mr-4 bg-blue-500 text-white cursor-pointer hover:bg-yellow-700 ${this.props.selectedUser ?? 'hidden'}`}>Cập nhật sinh viên</button>

          </div>
          <div>
            <input type='text' placeholder='Tìm kiếm sinh viên' name='search'
              value={this.state.input} className='border-2 border-gray mr-10 rounded-sm p-3 w-60'
              onChange={this.handleInput}

            />

            <button className='p-2 rounded-sm mr-4 bg-blue-500 text-white cursor-pointer hover:bg-red-700' onClick={this.handleSearch}>Tìm kiếm sinh viên</button>

          </div>
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.baiTapForm
  }
}

export default connect(mapStateToProps)(FormDangKy)
