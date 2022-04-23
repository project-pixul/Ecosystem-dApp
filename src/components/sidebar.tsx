import * as React from "react";
import "./sidebar.css";
import { NavLink } from "react-router-dom";
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

type sideBarState = {};

class Sidebar extends Component<sideBarProps, sideBarState> {
  constructor(props: sideBarProps) {
    super(props);
    this.listener = this.listener.bind(this);
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

  showCloseAnim() {}

  componentDidMount(): void {
    document.addEventListener("mousedown", this.listener);
    document.addEventListener("touchstart", this.listener);
  }

  componentWillUnmount(): void {
    document.removeEventListener("mousedown", this.listener);
    document.removeEventListener("touchstart", this.listener);
  }

  render() {
    return createPortal(
      <div id="bmenu-container">
        <Slide top opposite duration={400}>
          <aside className="bmenu-wrapper" ref={this.sideBarRef}>
            <header>
              <span>Menu</span>
              <MdClose
                size="30px"
                onClick={this.props.toggleMenu as React.MouseEventHandler}
              />
            </header>

            {this.props.sidebarItems.map((item, index) => {
              return (
                <div className="bmenu-item" key={index}>
                  {item.title}
                </div>
              );
            })}
          </aside>
        </Slide>
      </div>,
      document.querySelector("#sidebar-root") as Element
    );
  }
}

export default Sidebar;
