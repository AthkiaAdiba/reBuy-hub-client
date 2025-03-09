import { Button } from "../ui/button";

const MyButton = ({ label }: { label: string }) => {
  return (
    <Button
      variant="outline"
      className="rounded-none px-8 font-sans py-4 text-[#B59175] border-[#B59175] hover:bg-[#B59175] hover:text-white"
    >
      {label}
    </Button>
  );
};

export default MyButton;
