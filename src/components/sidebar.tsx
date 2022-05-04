import * as React from "react";
import "./sidebar.css";
import { NavLink } from "react-router-dom";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import Slide from "react-reveal/Slide";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";
import { Component } from "react";

type sideBarProps = {
  sidebarItems: {
    title: string;
    id: string;
  }[];
  toggleMenu(): void;
};

type sideBarState = {
  menuItems: number;
};

class Sidebar extends Component<sideBarProps, sideBarState> {
  constructor(props: sideBarProps) {
    super(props);
    this.state = {
      menuItems: 4,
    };
    this.listener = this.listener.bind(this);
    this.setMenuItemcount = this.setMenuItemcount.bind(this);
  }

  sideBarRef = React.createRef<any>();

  listener(event: any) {
    if (
      this.sideBarRef.current &&
      this.sideBarRef.current.contains(event.target)
    ) {
      return;
    }
    this.props.toggleMenu();
  }

  setMenuItemcount() {
    if (this.state.menuItems === 4) {
      this.setState({
        menuItems: 9,
      });
    } else {
      this.setState({
        menuItems: 4,
      });
    }
  }

  componentDidMount(): void {
    // document.addEventListener("mousedown", this.listener);
    // document.addEventListener("touchstart", this.listener);
  }

  componentWillUnmount(): void {
    // document.removeEventListener("mousedown", this.listener);
    // document.removeEventListener("touchstart", this.listener);
  }

  render() {
    return createPortal(
      <div id="bmenu-container">
        <Slide top opposite duration={400}>
          <aside
            className="bmenu-wrapper"
            ref={this.sideBarRef}
            style={{ marginTop: this.state.menuItems === 4 ? "5em" : "0.45em" }}
          >
            <header>
              <span>Menu</span>
              <MdClose
                size="30px"
                onClick={this.props.toggleMenu as React.MouseEventHandler}
              />
            </header>

            {this.props.sidebarItems.map((item, index) => {
              if (index < this.state.menuItems) {
                return (
                  <div className="bmenu-item" key={index}>
                    {item.title}
                  </div>
                );
              } else {
                return;
              }
            })}
            <span
              className="expand-button"
              onClick={() => this.setMenuItemcount()}
            >
              {this.state.menuItems === 4 ? "More" : "Less"}
              {this.state.menuItems === 4 ? (
                <GoChevronDown size="12px" />
              ) : (
                <GoChevronUp size="12px" />
              )}
            </span>
          </aside>
        </Slide>
      </div>,
      document.querySelector("#sidebar-root") as Element
    );
  }
}

export default Sidebar;
