import { SearchIcon } from 'lucide-react';
import { FC } from 'react';

type propTypes = {
  onChange: (q: string) => void;
};
const UserSearchInput: FC<propTypes> = ({ onChange }) => {
  return (
    <form className="mb-3">
      <label className="mb-2 text-sm font-medium text-gray-900 sr-only">
        Search
      </label>
      <div className="relative">
        <input
          type="text"
          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm"
          placeholder="Search team members"
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="absolute border-l inset-y-0 right-0 flex items-center p-3 pointer-events-none">
          <SearchIcon className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </form>
  );
};

export { UserSearchInput };
