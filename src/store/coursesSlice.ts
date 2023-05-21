import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface Course {
    id: number;
    name: string;
    description: string;
}
interface CoursesState {
    data: Course[];
    loading: boolean;
    error: string | null;
}
const initialState: CoursesState ={
   data:[],
   loading:false,
   error:null
}

export const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers:{
        getCoursesStart(state) {
            state.loading = true;
            state.error = null;
        },
        getCoursesSuccess(state, action: PayloadAction<Course[]>) {
           state.data =  action.payload;
           state.loading= false;
        },
        getCoursesFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload
        },
        addCourseStart(state) {
            state.loading = true;
            state.error = null;
        },
        addCourseSuccess(state, action: PayloadAction<Course>) {
            state.data.push(action.payload);
            state.loading = false;
        },
        addCourseFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error =action.payload;
        },
        updateCourseStart(state) {
            state.loading = true;
            state.error = null;
        },
        updateCourseSuccess(state, action: PayloadAction<Course>) {
            const index = state.data.findIndex((course) => course.id === action.payload.id);
            if (index !== -1) {
              state.data[index] = action.payload;
            }
            state.loading = false;
        },
        updateCourseFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        deleteCourseStart(state) {
            state.loading = true;
            state.error = null;
        },
        deleteCourseSuccess(state, action: PayloadAction<number>) {
            state.data = state.data.filter((course) => course.id !== action.payload);
            state.loading = false;
        },
        deleteCourseFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

    }
});

export const {
    getCoursesStart,
    getCoursesSuccess,
    getCoursesFailure,
    addCourseStart,
    addCourseSuccess,
    addCourseFailure,
    updateCourseStart,
    updateCourseSuccess,
    updateCourseFailure,
    deleteCourseStart,
    deleteCourseSuccess,
    deleteCourseFailure,
} = coursesSlice.actions;

export const selectCourses = (state: RootState) => state.courses.data;
export const selectCourseLoading = (state: RootState) =>state.courses.loading;
export const selectCourseError = (state: RootState) => state.courses.error;

export default coursesSlice.reducer;