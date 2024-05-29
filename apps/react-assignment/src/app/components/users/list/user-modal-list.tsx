import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { User } from '../../../types';
import { UserListItem } from './user-list-item';
import { UserSearchInput } from '../user-search-input';
import { Button, ToasterType, useToaster } from '@ui-kit';
import { queryClient } from '../../../providers/query-client';
import { addCultivationUsers } from '../../../services/cultivation-service';
import { useDefaultRole } from '../../../hooks/useDefaultRole';
import styles from './user-modal-list.module.css';

type propTypes = {
  users: User[];
};
const UsersList: FC<propTypes> = ({ users }) => {
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const navigate = useNavigate();
  const { id: cultivationId } = useParams();
  const { addToaster } = useToaster();
  const { defaultRoleId } = useDefaultRole();

  const { mutate, isPending } = useMutation({
    mutationFn: addCultivationUsers,
    onSuccess: () => {
      navigate('../');
      addToaster(
        'User(s) successfully added to cultivation',
        ToasterType.SUCCESS
      );
      queryClient.invalidateQueries({
        queryKey: ['cultivations'],
      });
    },
    onError: (error: Error) => {
      addToaster(error.message, ToasterType.ERROR);
    },
  });

  if (!users || !users.length) return null;

  function handleSubmit() {
    if (!cultivationId) return null;
    if (defaultRoleId === null) {
      addToaster('Default role not found', ToasterType.ERROR);
      return null;
    }
    mutate({
      cultivationId,
      roleId: defaultRoleId,
      userIds: selectedItems,
    });
  }

  const toggleItemSelection = (id: number) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter((item) => item !== id)
        : [...prevSelectedItems, id]
    );
  };

  const handleCheckboxChange = (value: boolean, id: number) => {
    if (value) {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, id]);
    } else {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item !== id)
      );
    }
  };

  const filterUsers = (searchTerm: string) => {
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.filter((id) =>
        filteredUsers.map((user) => user.id).includes(id)
      )
    );
  };

  return (
    <>
      <div className={styles.listContainer}>
        <UserSearchInput onChange={filterUsers} />
        <div className={styles.scrollableArea}>
          <ul className={styles.list}>
            {filteredUsers.map((user: User) => (
              <UserListItem
                key={user.id}
                user={user}
                selectedItems={selectedItems}
                onToggleItem={toggleItemSelection}
                onCheckboxChange={handleCheckboxChange}
              />
            ))}
          </ul>
        </div>
      </div>
      <footer className={styles.footer}>
        <Button
          disabled={selectedItems.length === 0 || isPending}
          variant="primary"
          onClick={handleSubmit}
        >
          {isPending ? 'loading...' : 'Add to cultivation'}
        </Button>
      </footer>
    </>
  );
};

export { UsersList };
