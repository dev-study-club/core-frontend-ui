import { useEffect, useRef, useState } from "react";
import cx from "./cx";
import data from "./data";

const Accordion6 = () => {
  const [currentId, setCurrentId] = useState<string | null>(data[0].id);
  const toggleItem = (id: string) => {
    setCurrentId((prevId) => (prevId === id ? null : id));
  };
  return (
    <div>
      <h3>#6. React</h3>
      <ul className={cx("container")}>
        {data.map(({ id, title, description }) => (
          <AccordionItem
            id={id}
            title={title}
            description={description}
            current={currentId === id}
            toggle={() => toggleItem(id)}
          />
        ))}
      </ul>
    </div>
  );
};

type AccordionItem = {
  id: string;
  title: string;
  description: string;
  current: boolean;
  toggle: () => void;
};

const AccordionItem = ({
  id,
  title,
  description,
  current,
  toggle,
}: AccordionItem) => {
  const descRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const $desc = descRef.current;
    $desc?.addEventListener("beforematch", toggle);
    return () => {
      $desc?.removeEventListener("beforematch", toggle);
    };
  }, [toggle]);
  useEffect(() => {
    const $desc = descRef.current;
    if (!$desc) return;
    if (current) {
      $desc.removeAttribute("hidden");
    } else {
      $desc.setAttribute("hidden", "until-found");
    }
  }, [current]);
  return (
    <li className={cx("item", "item3", { current })} key={id}>
      <button type="button" className={cx("tab")} onClick={toggle}>
        {title}
      </button>
      <div className={cx("description")} ref={descRef}>
        {description}
      </div>
    </li>
  );
};

export default Accordion6;
