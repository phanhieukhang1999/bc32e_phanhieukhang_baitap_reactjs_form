import React, { Component } from 'react'
import { connect } from 'react-redux'

class DanhSachSinhVien extends Component {
  render() {
    const {mangSinhVien} = this.props
    // console.log(mangSinhVien)

    return (
      <div>
        <table className='w-full text-xs text-left whitespace-nowrap mt-5'>
          <thead className='bg-gray-700 p-10 text-white text-lg'>
            <tr>
              <th className='p-3'>Mã SV</th>
              <th className='p-3'>Họ tên</th>
              <th className='p-3'>Số điện thoại</th>
              <th className='p-3'>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody className='border-2 text-lg'>
            {
              mangSinhVien.map((item, index) => (
                <tr key={item.id}>
                <td>{item.userName}</td>
                <td>{item.fullName}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.email}</td>
                <td>
                  <button className='p-4 rounded-lg mr-4 bg-red-500' onClick={() => {
                    this.props.dispatch({
                      type: 'DELETE_USER',
                      payload: item.id
                    })
                  }}>Xóa</button>
                  <button className='p-4 rounded-lg mr-4 bg-blue-500' onClick={() => {
                    this.props.dispatch({
                      type: 'EDIT_USER',
                      payload: item.id
                    })
                  }}>Sửa</button>
                </td>
              </tr>
              ))
            }
           
          </tbody>
        </table>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    mangSinhVien: state.baiTapForm.mangSinhVien,
  }
}

export default connect(mapStateToProps)(DanhSachSinhVien)
