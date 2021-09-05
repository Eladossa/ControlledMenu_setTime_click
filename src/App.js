import React, { useRef, useEffect } from "react";
import { ControlledMenu, MenuItem, useMenuState } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

export default function Example() {
  const { toggleMenu, ...menuProps } = useMenuState({ transition: true });
  let closeTimeMenu;
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside() {
      setTimeout(() => {
        if (document.activeElement !== menuRef.current) {
          console.log(" !== menuRef");
          clearTimeout(closeTimeMenu);
          window.onclick = toggleMenu(false);
        }
      }, 500);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleClick() {
    menuRef.current.focus();
    console.log(" menuRef.current.focus()");
  }

  function timeout() {
    closeTimeMenu = setTimeout(function () {
      toggleMenu(false);
    }, 1500);
  }
  return (
    <div ref={menuRef}>
      <div
        onMouseEnter={() => {
          toggleMenu(true);
          clearTimeout(closeTimeMenu);
        }}
      >
        Hover to Open
      </div>

      <ControlledMenu
        {...menuProps}
        anchorRef={menuRef}
        onMouseEnter={() => {
          toggleMenu(true);
          clearTimeout(closeTimeMenu);
        }}
        //onItemClick={() => setState('closed')}
        onItemClick={() => {
          handleClick();
          toggleMenu(false);
        }}
        onMouseLeave={() => timeout()}
      >
        <MenuItem>New File</MenuItem>
        <MenuItem>Save</MenuItem>
        <MenuItem>Close Window</MenuItem>
      </ControlledMenu>
    </div>
  );
}
