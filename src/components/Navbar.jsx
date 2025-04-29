import React from "react";
import { Icon } from "@iconify/react";

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between items-center bg-blue-100 text-shadow-blue-950 p-2">
        <Icon icon="solar:hamburger-menu-broken" width="38" height="38" />

        <ul className="flex justify-between items-center gap-4">
          <li>
            <button>
              <Icon
                icon="solar:bell-broken"
                width="30"
                height="30"
                className="cursor-pointer"
              />
            </button>
          </li>
          <li>
            <button>
              <Icon
                icon="solar:logout-2-broken"
                width="30"
                height="30"
                className="cursor-pointer"
              />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
