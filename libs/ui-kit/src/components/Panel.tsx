import { FC } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

type PanelProps = {
  children: React.ReactNode | React.ReactNode[];
  title: string;
  tools?: React.ReactNode;
  description?: string;
};

/**
 * If you pass more than one child element, the last child will be the panel footer
 */
const Panel: FC<PanelProps> = ({ title, description, tools, children }) => {
  let content = children;
  let footer = null;
  if (Array.isArray(children) && children.length > 1) {
    content = children.slice(0, -1);
    footer = children[children.length - 1];
  }
  return (
    <Card className="bg-white">
      <CardHeader className="border-b">
        <CardTitle className="flex justify-between items-center">
          {title} {tools}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="py-4 px-6">{content}</CardContent>
      {footer && <CardFooter className="border-t p-6">{footer}</CardFooter>}
    </Card>
  );
};
export { Panel };
