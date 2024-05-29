import { FC } from 'react';
import { Role } from '../../../types';

type propTypes = {
  roles: Role[];
  selectedRole: Role;
  onChange: (roleId: number) => void;
};
const RoleDropDownMenu: FC<propTypes> = ({ roles, selectedRole, onChange }) => {
  return (
    <div className="z-40 -ml-5 absolute bg-white  shadow w-96">
      <ul className="py-2 text-sm text-gray-700 divide-y divide-gray-100">
        {roles?.map((role) => (
          <li key={role.id}>
            <div
              onClick={() => onChange(role.id)}
              className={
                (selectedRole.id === role.id
                  ? ' bg-blue-100 hover:bg-blue-200'
                  : ' hover:bg-gray-100') +
                ' w-full block text-left px-4 py-2 flex flex-col'
              }
            >
              <span className="text-bold">{role.name}</span>
              <span className=" text-sm text-gray-400">{role.description}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export { RoleDropDownMenu };
