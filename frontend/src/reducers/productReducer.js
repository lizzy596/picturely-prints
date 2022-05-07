import { ADD_PRODUCT, GET_PRODUCTS, GET_PRODUCT, START_LOADING, END_LOADING, 
    JUST_ADDED_PRODUCT, END_JUST_ADDED_PRODUCT, ADMIN_EDIT_PRODUCT, ADMIN_DELETE_PRODUCT,
    ADMIN_END_DELETE_PRODUCT, ADMIN_END_EDIT_PRODUCT, END_JUST_EDITED_PRODUCT, SET_PRODUCT_ID
} from '../constants/productConstants';



const productReducer = (state = { products: [], productID: null, product: {} ,productToEdit: {}, isLoading: true, justAddedProduct: false, editingProduct: false, justEditedProduct: false, deletingProduct: false}, action) => {
    switch (action.type) {

    

        case ADD_PRODUCT:
            
            return { ...state, products: [...state.products, action.payload]  };
        
        case GET_PRODUCTS:
            console.log(action.payload.result)
            return { ...state, products: action.payload.result };
        
       /* case GET_PRODUCT:
            return { ...state, product: action.payload.result[0] }; */

        
        case GET_PRODUCT:
                return { ...state, product: state.products.find((item) => item.product_id === action.payload.result[0].product_id)};



        case START_LOADING:
           
            return { ...state, isLoading: true };
        case END_LOADING:
           return { ...state, isLoading: false };
        case JUST_ADDED_PRODUCT:
            return {...state, justAddedProduct: true};
        case END_JUST_ADDED_PRODUCT:
            return {...state, justAddedProduct: false};
        case ADMIN_DELETE_PRODUCT:
            return { ...state, products: [...state.products], deletingProduct: true};
        case ADMIN_EDIT_PRODUCT:
           
            return { ...state, editingProduct:true, productToEdit: state.products.find((item) => item.product_id === action.payload)};
        case ADMIN_END_DELETE_PRODUCT:
            return { ...state, products: [...state.products], deletingProduct: false};
        case ADMIN_END_EDIT_PRODUCT:
            return { ...state, products: [...state.products], productToEdit: {}, editingProduct:false, justEditedProduct: true};
        case END_JUST_EDITED_PRODUCT:
                return { ...state, justEditedProduct: false};
       
    
        default:
            return state;
    }
}

export default productReducer