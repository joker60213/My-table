import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../store/TableSlice';

const TableComponent = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const postStatus = useSelector((state) => state.posts.status);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterId, setFilterId] = useState('');
    const postsPerPage = 10;

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch]);

    // Фильтруем посты по ID
    const filteredPosts = filterId 
        ? posts.filter(post => post.id.toString() === filterId)
        : posts;

    // Логика для пагинации
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleFilterChange = (event) => {
        const id = event.target.value;
        setFilterId(id);
        setCurrentPage(1); // Сбросить текущую страницу при изменении фильтра
    };
  
    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
    };
  
    const cellStyle = {
        padding: '15px',
        border: '1px solid #ccc',
        textAlign: 'left',
    };
  
    const headerStyle = {
        ...cellStyle,
        backgroundColor: '#f2f2f2',
    };

    const buttonStyle = {
        margin: '0 5px',
        padding: '10px 15px',
        border: '1px solid #ccc',
        backgroundColor: '#f2f2f2',
        cursor: 'pointer',
        borderRadius: '4px',
    };

    return (
        <div>
            <h2>Посты</h2>

            <input
                style={{ padding: '5px', margin: '5px' }}
                type='number'
                value={filterId}
                onChange={handleFilterChange}
                placeholder='Фильтр постов по ID'
            />
            <h3>Результаты поиска:</h3>
            
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={headerStyle}>ID</th>
                        <th style={headerStyle}>Заголовок</th>
                        <th style={headerStyle}>Содержимое</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPosts.length > 0 ? (
                        currentPosts.map(post => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{post.body}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">Посты не найдены.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div>
                {/* Пагинация */}
                {totalPages > 1 && Array.from({ length: totalPages }, (_, index) => (
                    <button
                        style={buttonStyle}
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        disabled={currentPage === index + 1}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TableComponent;

/* import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../store/TableSlice';


const TableComponent = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const postStatus = useSelector((state) => state.posts.status);

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch]);

    return (
        <div>
            <h2>Посты</h2>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>title</th>
                        <th>body</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.body}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent; */

/* import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, setCurrentPage } from '../store/TableSlice';

const Table = () => {
  const dispatch = useDispatch();
  const { data, loading, total, currentPage } = useSelector((state) => state.table);

  const pageSize = 10; // Количество постов на странице

  useEffect(() => {
    dispatch(fetchData(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  return (
    <div>
      <h1>Posts</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {data.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div>
        {[...Array(Math.ceil(total / pageSize)).keys()].map((num) => (
          <button
            key={num + 1}
            onClick={() => handlePageChange(num + 1)}
            disabled={num + 1 === currentPage}
          >
            {num + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Table; */

/*    import React from 'react';
   import { Table } from 'antd';
   import { useDispatch, useSelector } from 'react-redux';
   import { setPagination } from '../store/TableSlice';

   const TableComponent = () => {
     const dispatch = useDispatch();
     const data = useSelector((state) => state.table.data);
     const pagination = useSelector((state) => state.table.pagination);

     const handleTableChange = (pagination) => {
       dispatch(setPagination({ current: pagination.current, pageSize: pagination.pageSize }));
     };

     return (
       <Table
         dataSource={data}
         pagination={{
           current: pagination.current,
           pageSize: pagination.pageSize,
           total: pagination.total,
         }}
         onChange={handleTableChange}
         columns={[
           {
             title: 'Name',
             dataIndex: 'name',
             key: 'name',
           },
           {
             title: 'Age',
             dataIndex: 'age',
             key: 'age',
           },
           {
             title: 'Address',
             dataIndex: 'address',
             key: 'address',
           },
         ]}
       />
     );
   };

   export default TableComponent; */

/* import React from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];



  const TableComponent = () => {
    const dataSource = useSelector ((state) => state.table.data);

    return <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 10 }} />;
  };

  export default TableComponent; */