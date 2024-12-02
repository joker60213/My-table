
import React from 'react';
import { Layout } from 'antd';
import TableComponent from './components/table'

const { Header, Content } = Layout;

const App = () => {
  return (
    <Layout>
      <Header style={{ color: 'white', fontSize: '24px' }}>Моя таблица 2.0</Header>
      <Content style={{ padding: '40px' }}>
        <TableComponent />
      </Content>
    </Layout>
  );
};

export default App;




/* import React from 'react';
import TableComponent from '../table/TableComponent';

function App() {
  return (
    <div className='App'>
      <h1>Моя таблица</h1>
      <TableComponent />
    </div>

  );
}

export default App;
 */