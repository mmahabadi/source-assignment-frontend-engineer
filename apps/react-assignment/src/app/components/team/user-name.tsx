import { Avatar } from "@ui-kit";

const UserName = ({ name }: { name: string }) => {
  return (
    <div className="flex items-center">
      <Avatar name={name} /> {name}
    </div>
  );
};
export { UserName };
