import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import MOCK_DATA from './MOCK_DATA.json';
import styled from 'styled-components';
import InfiniteScroll from './InfiniteScroll/infiniteScroll';

const ShowBtn = styled.p`
  color: #fff;
  padding: 16px;
  font-size: 20px;
  transition: all .3s ease-in-out;
  box-shadow: inset 0px 0px 0 0 #fff;
  text-align: left;
  cursor: pointer;
  &:hover {
    box-shadow: inset 300px 0px 0 0 #fff;
    color: #000;
  }
`;

function App() {
  const [type, setType] = useState(0);
  const [open, setOpen] = useState(false);
  // return <InfiniteScroll />;
  return (
    <div className="App">
      <div style={{ width: 'content-fit' }}>
        <ShowBtn onClick={() => setOpen(open => !open)}>
          Show table |
          <span style={{ fontSize: '12px', color: '#AAA', marginLeft: '12px' }}>
            {type ? 'infinite scroll' : 'normal version.'}
          </span>
        </ShowBtn>
      </div>
      <div style={{ width: 'content-fit' }}>
        <ShowBtn onClick={() => setType(type => !type)}>Change Type</ShowBtn>
      </div>
      {type
        ? <InfiniteScroll open={open} />
        : open
          ? <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Id</th>
                  <th>Gender</th>
                  <th>IP</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_DATA.map(d => <Block data={d} key={d.id} />)}
              </tbody>
            </table>
          : null}
    </div>
  );
}

function Block({ data }) {
  const num = Math.random().toFixed(2) * 100;

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(num);
  }, []);
  return (
    <tr
      style={{
        backgroundColor: progress > 0 ? '#000' : '#707070',
        color: '#fff',
        border: '1px solid #FAFAFA',
      }}
    >
      <td>
        {data.email}
      </td>
      <td>
        {data.first_name}
      </td>
      <td>
        {data.last_name}
      </td>
      <td>
        {data.id}
        <div
          style={{
            width: num,
            backgroundColor: '#fff',
            height: '5px',
            transition: 'all .3s ease-in',
          }}
        />
      </td>
      <td>
        {data.gender}
      </td>
      <td>
        {data.ip_address}
      </td>
    </tr>
  );
}

export default App;
