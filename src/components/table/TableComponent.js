
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../store/TableSlice';

import { Table, Input, Button } from 'antd';

import styles from './TableComponent.module.css';

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

    const dataSource = currentPosts.map (post => ({
      key: post.id,
      id: post.id,
      title: post.title,
      body: post.body,
    }));

    const columns = [
      {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
      },
      {
          title: 'Заголовок',
          dataIndex: 'title',
          key: 'title',
      },
      {
          title: 'Содержимое',
          dataIndex: 'body',
          key: 'body',
      },
  ];

    return (
        <div>
            <h2>Посты</h2>

            <Input
                style={{ marginBottom: '20px', width: '200px' }}
                type='number'
                value={filterId}
                onChange={handleFilterChange}
                placeholder='Фильтр постов по ID'
            />

            <h3>Результаты поиска:</h3>
            
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
            />

            {/* Пагинация */}
            <div>
                {totalPages > 1 && Array.from({ length: totalPages }, (_, index) => (
                    <Button
                        className={styles.button}
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        disabled={currentPage === index + 1}>
                        {index + 1}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default TableComponent;