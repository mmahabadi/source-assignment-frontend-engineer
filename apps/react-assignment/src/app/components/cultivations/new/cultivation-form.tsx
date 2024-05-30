import { Button, ErrorBlock } from '@ui-kit';
import { FC, useState } from 'react';

type propTypes = {
  loading: boolean;
  onCancel: () => void;
  onSubmit: (name: string) => void;
};
const CultivationForm: FC<propTypes> = ({ loading, onCancel, onSubmit }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (!name) {
      setError(true);
      return;
    }
    onSubmit(name);
  };

  return (
    <div className="cultivation-form">
      <form onSubmit={handleSubmit}>
        <div className="p-6 mb-6">
          {error && (
            <ErrorBlock title="Validation Error:" message="Name is required." />
          )}
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            type="text"
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="border-t p-2 text-right">
          <Button variant="default" onClick={onCancel}>
            Cancel
          </Button>
          <Button loading={loading} variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export { CultivationForm };
