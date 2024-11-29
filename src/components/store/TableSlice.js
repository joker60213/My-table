import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    return response.json();
});

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default postsSlice.reducer;


/* import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
    'table/fetchData',
    async (currentPage, pageSize) => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      return response.json();
    }
  );

  // Определяем начальное состояние
const initialState = {
    data: [],
    loading: false,
    total: 0,
    currentPage: 1,
  };

  // Создаем срез состояния
const TableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
      setCurrentPage(state, action) {
        state.currentPage = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchData.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchData.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload; // Данные от JSONPlaceholder
          state.total = 3; // JSONPlaceholder имеет фиксированное количество постов (100)
        })
        .addCase(fetchData.rejected, (state) => {
          state.loading = false;
        });
    },
  });
  
  // Экспортируем действия и редюсер
  export const { setCurrentPage } = TableSlice.actions;
  export default TableSlice.reducer; */


/* import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [
        { key: '1', name: 'John Doe', age: 32, address: 'New York No. 1 Lake Park' },
        { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
    ],
    //добавил
    pagination: {
        current: 1,
        pageSize: 10,
        total: 60, // общее колличество страниц
      },
};

const TableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
      setData(state, action) {
        state.data = action.payload;
      },
      setPagination(state, action) {
        state.pagination = { ...state.pagination, ...action.payload };
      },
    },
  });

  export const { setData, setPagination } = TableSlice.actions;
  export default TableSlice.reducer;
 */
/* const TableSlice = createSlice ({
    name: 'table',
    initialState,
    reducers: {
        addRow (state, action) {
            state.data.push (action.payload)
        },
    },
});

export const { addRow } = TableSlice.actions;

export default TableSlice.reducer; */