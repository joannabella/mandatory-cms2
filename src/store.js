import { createStore, applyMiddleware } from 'redux';

function Store(state = [], action) {
    switch (action.type) {
        case 'ADD_ITEM':
            const current = state.find(item => item.product._id === action.product._id);
            if (current) {
                current.quantity += action.quantity;
                current.totalPrice = current.product.price * current.quantity;
                return [...state];
            }
            state.push({
                quantity: action.quantity,
                product: action.product,
                totalPrice: action.quantity * action.product.price
            });

            return [...state]

        case 'EMPTY_CART':

            return [];

        case 'INCREASE_QUANTITY':
            const current2 = state.find(item => item.product._id === action.product._id);
            if (current2) {
                current2.quantity += 1;
                current2.totalPrice = current2.product.price * current2.quantity;
                return [...state];
            }

            return [...state];

        case 'DECREASE_QUANTITY':
            const current3 = state.find(item => item.product._id === action.product._id);
            if (current3 && current3.quantity === 1) {
                return state.filter(item => item.product._id !== action.product._id);
            }
            if (current3 && current3.quantity > 0) {
                current3.quantity -= 1;
                current3.totalPrice = current3.product.price * current3.quantity;
                return [...state];
            }

            return [...state];

        default:
            return state;
    }
}

function toLocaleStorage({ getState }) {
    return next => action => {
        console.log('will dispatch', action);

        const returnValue = next(action);

        console.log('state after dispatch', getState());
        localStorage.setItem('store', JSON.stringify(getState()))

        return returnValue;
    }
}

const createdStore = createStore(Store, JSON.parse(localStorage.getItem('store') || '[]'), applyMiddleware(toLocaleStorage));

export default createdStore;

