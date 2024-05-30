import { useState } from 'react';
import { getInitial, getRandomColor } from '../utils';

const Avatar: React.FC<{ name: string }> = ({ name }) => {
  const [backgroundColor] = useState(getRandomColor());
  if (!name) return null;
  const initial = getInitial(name);

  return (
    <div
      className={`${backgroundColor} flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white mr-2`}
    >
      {initial}
    </div>
  );
};

export { Avatar };
