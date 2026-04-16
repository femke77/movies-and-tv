import { NavLink } from 'react-router-dom';

import { MenuItem } from '@headlessui/react';
import clsx from 'clsx';

const MenuItemLink = ({
  to,
  name,
  isTvBrowser = false,
}: {
  to: string;
  name: string;
  isTvBrowser?: boolean;
}) => {
  return (
    <MenuItem>
      <NavLink
        to={to}
        tabIndex={0}
        className={clsx(
          'data-[focus]:bg-gray-800/95 data-[focus]:translate-[2px] mx-auto my-2 w-[96%] group flex items-center rounded-lg py-1.5 px-4 active:translate-[3px] hover:translate-[2px] transition-all ease-in-out',
          isTvBrowser
            ? 'bg-[#1f2937] hover:bg-[#273449]'
            : 'bg-white/10 hover:bg-gray-800/95',
        )}
      >
        {name}
      </NavLink>
    </MenuItem>
  );
};

export default MenuItemLink;
