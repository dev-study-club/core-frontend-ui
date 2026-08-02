import cx from "./cx";
import data from "./data";
import VanillaWrapper from "@/components/shared/ui/vanillaWrapper";

type AccordionItem = {
  id: string;
  title: string;
  description: string;
};

const buildItem = ({ id, title, description }: AccordionItem) => {
  const $tab = document.createElement("button");
  $tab.type = "button";
  $tab.classList.add(cx("tab"));
  $tab.textContent = title;

  const $desc = document.createElement("div");
  $desc.classList.add(cx("description"));
  $desc.textContent = description;

  const $li = document.createElement("li");
  $li.classList.add(cx("item"), cx("item3"));
  $li.setAttribute("data-id", id);
  $li.appendChild($tab);
  $li.appendChild($desc);
  return $li;
};

const initiator = (wrapper: HTMLDivElement) => {
  let currentId: string | null = null;
  const $items = data.map(buildItem);

  const handleClickTitle = (event: Event) => {
    const $el = event.target as HTMLElement;
    if (!$el.classList.contains(cx("tab"))) return; // 아코디언의 제목을 클릭했을 때만 이벤트 발생
    const targetId = $el.parentElement!.dataset.id;
    if (!targetId) return;
    currentId = targetId === currentId ? null : targetId;

    for (const $item of $items) {
      $item.classList.toggle("current", $item.dataset.id === currentId);
    }
  };
  const $ul = document.createElement("ul");
  $ul.classList.add(cx("container"));
  $ul.append(...$items);
  $ul.addEventListener("click", handleClickTitle); // 이벤트 버블링
  wrapper.appendChild($ul);
};

const Accordion4V = () => <VanillaWrapper initiator={initiator} title="#4" />;
export default Accordion4V;
