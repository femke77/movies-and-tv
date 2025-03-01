import { NavLink } from 'react-router-dom';

import { MenuItem } from '@headlessui/react';

const MenuItemLink = ({ to, name }: { to: string; name: string }) => {
  return (
    <MenuItem>
      <NavLink
        to={to}
        className='mx-auto my-1 w-[96%] bg-white/10 group flex  items-center gap-4 rounded-lg py-1.5 px-3 hover:bg-gray-900/95 active:translate-[3px] hover:translate-[2px] transition-all ease-in-out'
      >
        {name}
      </NavLink>
    </MenuItem>
  );
};

export default MenuItemLink;
