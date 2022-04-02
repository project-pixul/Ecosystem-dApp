import * as React from "react";
import "./sidebar.css";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";
import { Component } from "react";

type sideBarProps = {
  sidebarItems: {
    title: string;
    extLink: string;
  }[];
};

class Sidebar extends Component<sideBarProps & { toggleMenu(): void }> {
  render() {
    return createPortal(
      <aside className="sidebar-wrapper">
        <MdClose
          size="35px"
          onClick={this.props.toggleMenu as React.MouseEventHandler}
        />
        {this.props.sidebarItems.map((item, index) => {
          if (index === 0) {
            return (
              <div
                className={`sidebar-item ${
                  window.location.pathname === "/home" ? "highlight" : ""
                }`}
                key={index}
              >
                {item.title}
              </div>
            );
          }
          return (
            <div className="sidebar-item" key={index}>
              {item.title}
            </div>
          );
        })}
      </aside>,
      document.querySelector("#sidebar-root") as Element
    );
  }
}

export default Sidebar;
