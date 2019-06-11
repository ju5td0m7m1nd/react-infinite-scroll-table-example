import React, { useState, useEffect, useCallback } from 'react';
import MOCK_DATA from '../MOCK_DATA.json';
import styled from 'styled-components';

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

const blockNum = 3;

class App extends React.Component {
  state = {
    open: false,
    cursor: 0,
  };
  sentinels = [];
  componentDidMount() {
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            this.setState(
              { cursor: +e.target.getAttribute('index') },
              this.observeSentinel
            );
          }
        });
      },
      {
        root: document.querySelector('App'),
        rootMargin: '30px',
      }
    );
    this.sentinels.forEach(el => this.observer.observe(el));
  }

  observeSentinel = () => {
    this.sentinels.forEach(el => el && this.observer.observe(el));
  };

  handleOpen = () =>
    this.setState(({ open }) => ({ open: !open }), this.observeSentinel);
  handleSentinel = c => {
    this.sentinels = this.sentinels.concat(c);
  };

  render() {
    const { open, cursor } = this.state;
    return (
      <div className="App">
        <div style={{ width: 'content-fit' }}>
          <ShowBtn onClick={this.handleOpen}>
            Show table |
            <span
              style={{ fontSize: '12px', color: '#AAA', marginLeft: '12px' }}
            >
              infinite version.
            </span>
          </ShowBtn>
        </div>
        {open
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
                {MOCK_DATA.slice(0, (cursor + 1) * blockNum).map(d =>
                  <Block data={d} key={d.id}>
                    {d.id % blockNum === 0
                      ? <span
                          key={d.id / blockNum}
                          ref={this.handleSentinel}
                          index={d.id / blockNum}
                        />
                      : null}
                  </Block>
                )}
              </tbody>
            </table>
          : null}
      </div>
    );
  }
}

function Block({ data, children }) {
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
        {children}
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
