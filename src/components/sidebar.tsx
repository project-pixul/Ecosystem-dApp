import * as React from "react";
import "./sidebar.css";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import Slide from "react-reveal/Slide";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";
import useOnClickOutside from "../hooks/useOnClickOutSide";

type sideBarProps = {
  sidebarItems: {
    title: string;
    id: string;
    url: string;
  }[];
  toggleMenu(): void;
};

const Sidebar = (props: sideBarProps) => {
  const [menuItems, setMenuItems] = React.useState<number>(4);
  const sideBarRef = React.useRef<any>();
  useOnClickOutside(sideBarRef, props.toggleMenu);

  const setMenuItemcount = () => {
    setMenuItems((prevState) => {
      if (prevState === 4) {
        return 9;
      }
      return 4;
    });
  };

  const openExtLink = (url: string) => {
    window.open(url, "_blank");
    props.toggleMenu();
  };

  return createPortal(
    <div id="bmenu-container">
      <Slide top opposite duration={400}>
        <aside
          className="bmenu-wrapper"
          ref={sideBarRef}
          style={{ marginTop: menuItems === 4 ? "5em" : "0.45em" }}
        >
          <header>
            <span>Menu</span>
            <MdClose
              size="30px"
              onClick={props.toggleMenu as React.MouseEventHandler}
            />
          </header>

          {props.sidebarItems.map((item, index) => {
            if (index < menuItems) {
              return (
                <div
                  className="bmenu-item"
                  key={item.id}
                  onClick={() => openExtLink(item.url)}
                >
                  {item.title}
                </div>
              );
            } else {
              return;
            }
          })}
          <span className="expand-button" onClick={() => setMenuItemcount()}>
            {menuItems === 4 ? "More" : "Less"}
            {menuItems === 4 ? (
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
};

export default Sidebar;
