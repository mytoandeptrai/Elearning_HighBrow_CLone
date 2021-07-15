import { combineReducers } from "redux";
import adminReducer from "./Admin/admin.reducer";
import categoriesReducer from "./Categories/categories.reducer";
import courseReducer from "./Course/course.reducer";
import userReducer from "./User/user.reducer";

const rootReducer = combineReducers({
  usersData: userReducer,
  categoriesData: categoriesReducer,
  coursesData: courseReducer,
  adminsData: adminReducer,
});
export default rootReducer;
