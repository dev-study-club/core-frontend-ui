import cx from "./cx";
import data from "./data";
import { useEffect, useRef, useState } from "react";

type AccordionItemProps = {
  id: string;
  title: string;
  description: string;
  isCurrent: boolean;
  onToggle: () => void;
};

const AccordionItem = ({
  id,
  title,
  description,
  isCurrent,
  onToggle,
}: AccordionItemProps) => {
  const descRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const $desc = descRef.current;
    $desc?.addEventListener("beforematch", onToggle);
    return () => {
      $desc?.removeEventListener("beforematch", onToggle);
    };
  }, [onToggle]);

  useEffect(() => {
    if (isCurrent) {
      descRef.current?.removeAttribute("hidden");
      return;
    }

    descRef.current?.setAttribute("hidden", "until-found");
  }, [isCurrent]);

  return (
    <li className={cx("item", "item3", { current: isCurrent })}>
      <button type="button" className={cx("tab")} onClick={onToggle}>
        {title}
      </button>
      {
        <div
          className={cx("description")}
          ref={descRef}
        >
          {description}
        </div>
      }
    </li>
  );
};

const Accordion6 = () => {
  const [currentId, setCurrentId] = useState(data[0].id);

  const toggleItem = (id: string) => () => {
    setCurrentId((prevId) => (prevId === id ? "" : id));
  };

  return (
    <>
      <h3>
        #6. react<sub>ctrl+f 처리(hidden=until-found)</sub>
      </h3>
      <ul className={cx("container")}>
        {data.map(({ id, title, description }) => (
          <AccordionItem
            key={id}
            id={id}
            title={title}
            description={description}
            isCurrent={id === currentId}
            onToggle={toggleItem(id)}
          />
        ))}
      </ul>
    </>
  );
};

export default Accordion6;
