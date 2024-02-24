import {ChevronDown, ChevronUp} from "lucide-react";

import {Button} from "./ui/button";

export default function Scroll({direction}: {direction: "up" | "down"}) {
  const handleClick = () => {
    if (direction === "up") {
      window.scrollTo({top: 0, behavior: "smooth"});
    } else {
      window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"});
    }
  };

  return (
    <Button className="rounded-xl" variant="secondary" onClick={handleClick}>
      {direction === "up" ? <ChevronUp /> : <ChevronDown />}
    </Button>
  );
}
