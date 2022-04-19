/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { Badge, Menu, Avatar } from 'antd';

import './index.less';

const Header = ({
  onTabClick,
  headerTabs,
  defaultActiveKey,
}: {
  onTabClick: Function;
  headerTabs: Array<any>;
  defaultActiveKey: string;
}) => {
  const [todoCount, setToDoCount] = useState(0);

  useEffect(() => {
    setToDoCount(1);
  }, []);

  return (
    <>
      <div className="header">
        <div className="logo">
          <img
            style={{ width: 50, height: 30, marginLeft: 20 }}
            src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
            alt="logo"
          />
        </div>
        <Menu
          onClick={onTabClick}
          className="top-nav"
          defaultSelectedKeys={[defaultActiveKey]}
          mode="horizontal"
        >
          {headerTabs.map(item => {
            console.log(item, 'header-item');
            return <Menu.Item key={item.key}>{item.name}</Menu.Item>;
          })}
        </Menu>
        <div className="right-part">
          <div className="customer">
            <span>联系客服</span>
          </div>
          <div className="upcoming">
            <Badge dot={todoCount > 0}>
              <span>待办</span>
            </Badge>
          </div>
          <div className="avatar">
            <Avatar shape="square" icon={<img src="https://joeschmoe.io/api/v1/random" />} />
            <span className="name">张三</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
