import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PostManage from "./modules/admin/PostManage";
import UserManage from "./modules/admin/UserManage";

function App() {
  const { Sider } = Layout;

  const items2: MenuProps["items"] = [
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
  ].map((icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  });
  return (
    <div>
      <Layout>
        <Layout>
          <Sider>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
              items={items2}
            />
          </Sider>
          <BrowserRouter>
            <Routes>
              <Route path="/user" element={<UserManage />} />
              <Route path="/post" element={<PostManage />} />
            </Routes>
          </BrowserRouter>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
