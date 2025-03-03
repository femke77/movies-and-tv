import { NavLink } from 'react-router-dom';

import { MenuItem } from '@headlessui/react';

const MenuItemLink = ({ to, name }: { to: string; name: string }) => {
  return (
    <MenuItem>
      <NavLink
        to={to}
        className='mx-auto my-2 w-[96%] bg-white/10 group flex  items-center  rounded-lg py-1.5 px-4 hover:bg-gray-800/95 active:translate-[3px] hover:translate-[2px] transition-all ease-in-out'
      >
        {name}
      </NavLink>
    </MenuItem>
  );
};

export default MenuItemLink;
