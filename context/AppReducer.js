export const initialState = {
    user: {
        userName: '',
        userID: 'XXXX',
    },
    img: {
        roti: '/roti.png',
        tea: '/tea.png',
        biryani: '/biryani.png',
        chicken: '/chicken.png',
    },
    allMenu: ['roti', 'tea', 'biryani', 'chicken'],
    thaiMenu: {
        roti: 'โรตี',
        tea: 'ชาชัก',
        biryani: 'ข้าวหมก',
        chicken: 'ไก่ทอด',
    },
    histories: [],
    summary: {},
};
export const AppReducer = (state, action) => {
    switch (action.type) {
        case 'init_stored': {
            return action.value;
        }
        case 'setUser': {
            return {
                ...state,
                user: action.payload,
            };
        }
        case 'setHistories': {
            return {
                ...state,
                histories: action.payload,
            };
        }
        case 'setSummary': {
            return {
                ...state,
                summary: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};
