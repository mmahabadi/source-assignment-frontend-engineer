import { Loader2 } from 'lucide-react';
import { Button } from './button';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex justify-center">
      <Button variant="default" disabled className="flex items-center">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Please wait...
      </Button>
    </div>
  );
};

export { LoadingIndicator };
