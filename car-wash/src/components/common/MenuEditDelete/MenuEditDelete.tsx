import React from 'react'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { VscKebabVertical } from "react-icons/vsc";

type Props = {
  handleEditClick: () => void
  handleDelete: () => Promise<void>
}

const MenuEditDelete = ({ handleEditClick, handleDelete, item }: Props) => {
  return (
    <Menu>
      <MenuButton
        // as={IconButton}
        aria-label='Options'
      >
        <VscKebabVertical />
      </MenuButton>
      <MenuList>
        <MenuItem
          icon={<MdOutlineEdit style={{ fontSize: '16px' }} />}
          onClick={() => handleEditClick(item)}
        >
          Editar
        </MenuItem>
        <MenuItem
          icon={<MdDeleteOutline style={{ color: 'red' }} />}
          onClick={() => handleDelete(item.id)}
        >
          Eliminar
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default MenuEditDelete