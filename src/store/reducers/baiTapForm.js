

const stateDefault = {
    mangSinhVien: [
        {
            id: 1234,
            userName: 1111,
            fullName: 'khang',
            phoneNumber: 123456789,
            email: 'khang@gmail.com'
        },
        {
            id: 4567,
            userName: 2222,
            fullName: 'hiếu',
            phoneNumber: 123456789,
            email: 'khang@gmail.com'
        },
        {
            id: 1122,
            userName: 3333,
            fullName: 'hải',
            phoneNumber: 123456789,
            email: 'hai@gmail.com'
        },
        {
            id: 3344,
            userName: 4444,
            fullName: 'sang',
            phoneNumber: 123456789,
            email: 'sang@gmail.com'
        },
    ],
    selectedUser: null,
}

export const baiTapForm = (state = stateDefault, { type, payload }) => {
    switch (type) {
        case 'ADD_USER': {
            const data = [...state.mangSinhVien]
            const user = { ...payload, id: Date.now() }
            data.push(user)
            // console.log(user)
            return { ...state, mangSinhVien: data }
        }
        case 'DELETE_USER': {
            const data = state.mangSinhVien.filter((item) => item.id !== payload)
            return { ...state, mangSinhVien: data }
        }
        case 'EDIT_USER': {
            const user = state.mangSinhVien.find(item => item.id === payload)
            return { ...state, selectedUser: user }
        }
        case 'UPDATE_USER': {
            const newUser = state.mangSinhVien.map(item => item.id === payload.id ? payload : item)
            state.selectedUser = null

            return { ...state, mangSinhVien: newUser }

        }
        case 'SEARCH_USER': {
            const searchUser = state.mangSinhVien.filter((item) => item.fullName === payload 
            )
            return { ...state, mangSinhVien: searchUser }


        }

        default: return state
    }
}

