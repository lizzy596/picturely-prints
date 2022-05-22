import { ADD_PRODUCT, GET_PRODUCTS, GET_PRODUCT, START_LOADING, END_LOADING, 
    JUST_ADDED_PRODUCT, END_JUST_ADDED_PRODUCT, ADMIN_EDIT_PRODUCT, ADMIN_DELETE_PRODUCT,
    ADMIN_END_DELETE_PRODUCT, ADMIN_END_EDIT_PRODUCT, 
    END_JUST_EDITED_PRODUCT, 
    SET_PRODUCT_ID,
    GET_TOP_PRODUCTS, 
    FETCH_BY_SEARCH,
    GET_REVIEWS, JUST_ADDED_REVIEW, END_JUST_ADDED_REVIEW, SET_ERROR, END_ERROR, START_SEARCH, END_SEARCH, SET_KEYWORD, CLEAR_KEYWORD,
} from '../constants/productConstants';



const productReducer = (state = { products: [], topProducts: [], error: false, success_message: '', addedReview: false, reviews: [], error_message: '', productID: null, product: {} ,productToEdit: {}, isLoading: false, justAddedProduct: false, editingProduct: false, justEditedProduct: false, deletingProduct: false, isSearching: false, keyword: '', page: null, pages: null, }, action) => {
    switch (action.type) {

    

        case ADD_PRODUCT:
            
            return { ...state, products: [...state.products, action.payload]  };
        
        case GET_PRODUCTS:
          
            return { ...state, products: action.payload.result, page: action.payload?.page, pages: action.payload?.result[0]?.full_count / action.payload.pageSize };

        case GET_TOP_PRODUCTS:
            return { ...state, topProducts: action.payload.result };


        case GET_REVIEWS:
                return { ...state, reviews: action.payload.result };
        
       /* case GET_PRODUCT:
            return { ...state, product: action.payload.result[0] }; */

        
       /* case GET_PRODUCT:
                return { ...state, product: state.products.find((item) => item.product_id === action.payload.result[0].product_id)}; */
        case GET_PRODUCT:
                return { ...state, product: action.payload.result[0]};
        case FETCH_BY_SEARCH:
                return { ...state, products: action.payload.result, page: action.payload?.page, pages: action.payload?.result[0]?.full_count / action.payload.pageSize};
        case START_SEARCH:
                return { ...state, isSearching: true};
        case END_SEARCH:
                return { ...state, isSearching: false};
       case SET_KEYWORD:
                 return { ...state, keyword: action.payload.data};
        case CLEAR_KEYWORD:
                 return { ...state, keyword: ''};



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
        case JUST_ADDED_REVIEW:
            return {...state, addedReview: true,  success_message:'Review added successfully' };
        case END_JUST_ADDED_REVIEW:
            return {...state, addedReview: false, success_message:''};
        case SET_ERROR:
            return { ...state, error: true, error_message: action.payload.data.msg };
        case END_ERROR:
            return { ...state, error: false, error_message: '', };
        
       
    
        default:
            return state;
    }
}

export default productReducer