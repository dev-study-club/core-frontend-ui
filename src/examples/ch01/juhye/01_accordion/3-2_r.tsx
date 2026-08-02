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
    const $desc = descRef.current!;
    $desc.style.maxHeight = isCurrent ? `${$desc.scrollHeight}px` : "0px";
  }, [isCurrent]);

  return (
    <li className={cx("item", "item3", { current: isCurrent })}>
      <button type="button" className={cx("tab")} onClick={onToggle}>
        {title}
      </button>
      {
        <div className={cx("description")} ref={descRef}>
          {description}
        </div>
      }
    </li>
  );
};

const Accordion3n2 = () => {
  const [currentId, setCurrentId] = useState(data[0].id);

  const toggleItem = (id: string) => () => {
    setCurrentId((prevId) => (prevId === id ? "" : id));
  };

  return (
    <>
      <h3>
        #3. react<sub>css 애니메이션 처리(자연스러운처리)</sub>
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

export default Accordion3n2;
