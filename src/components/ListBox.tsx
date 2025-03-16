import { ReactElement } from 'react';

interface IListBox {
  title?: string | ReactElement;
  selectedOption: string;
  setSelectedOption: (_option: string) => void;
  availableOptions: { id: number; name: string; value: string }[];
}

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

export default function ListBoxComp({
  title,
  selectedOption: sortByOption,
  setSelectedOption: setSortByOption,
  availableOptions: sortOptions,
}: IListBox) {
  return (
    <div className='w-full  mr-4 hover:translate-[1px] rounded-md  z-50 '>
      <Listbox value={sortByOption} onChange={setSortByOption}>
        <ListboxButton
          tabIndex={0}
          className={clsx(
            'relative block w-full rounded-lg  bg-gradient-to-r from-[#292e30] to-[#3d3737] py-1.5 pr-8 pl-3 text-left text-md/6 text-white',
            'focus:outline-white data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white hover:outline-blue-700 hover:outline-1',
          )}
        >
          {title ??
            sortOptions.find((opt) => opt.value === sortByOption)?.name ??
            'Sort By'}
          <ChevronDownIcon
            className='group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60'
            aria-hidden='true'
          />
        </ListboxButton>
        <ListboxOptions
          anchor='bottom'
          transition
          className={clsx(
            'w-[var(--button-width)] rounded-xl border z-100 border-white/5 bg-black p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0',
          )}
        >
          {sortOptions.map((opt) => (
            <ListboxOption
              key={opt.name}
              value={opt.value}
              className='group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10'
            >
              <CheckIcon className='invisible size-4 fill-white group-data-[selected]:visible' />
              <div className='text-sm/6 text-white'>{opt.name}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
