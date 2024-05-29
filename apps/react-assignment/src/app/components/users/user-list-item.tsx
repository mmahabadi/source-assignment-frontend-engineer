import { FC } from 'react';
import { User } from '../../types';
import { UserName } from '../team/user-name';

type propTypes = {
  user: User;
  selectedItems: number[];
  onToggleItem: (id: number) => void;
  onCheckboxChange: (value: boolean, id: number) => void;
};
const UserListItem: FC<propTypes> = ({
  user,
  selectedItems,
  onToggleItem,
  onCheckboxChange,
}) => {
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    onCheckboxChange(event.target.checked, id);
  };

  return (
    <li key={user.id} className="flex items-center justify-between p-4">
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selectedItems.includes(user.id)}
          onChange={(event) => handleCheckboxChange(event, user.id)}
          className="form-checkbox1 h-5 w-5 border border-gray-100 cursor-pointer"
        />
        <span className="ml-2">
          <UserName name={user?.name} />
        </span>
      </label>
      <div
        className={`w-5 h-5 rounded-full ${
          selectedItems.includes(user.id) ? 'bg-blue-200' : ''
        }`}
        onClick={() => onToggleItem(user.id)}
      ></div>
    </li>
  );
};

export { UserListItem };
