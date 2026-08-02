import cx from "./cx";
import data from "./data";
import VanillaWrapper from "@/components/vanillaWrapper";

type AccordionItem = {
  id: string;
  title: string;
  description: string;
};

const buildItem = ({ id, title, description }: AccordionItem) => {
  const $tab = document.createElement("button");
  $tab.setAttribute("type", "button");
  $tab.classList.add(cx("tab"));
  $tab.textContent = title;

  const $description = document.createElement("div");
  $description.classList.add(cx("description"));
  $description.textContent = description;

  const $li = document.createElement("li");
  $li.classList.add(cx("item"), cx("item3"));
  $li.setAttribute("data-id", id);
  $li.append($tab, $description);
  return $li;
};

const initiator = (wrapper: HTMLDivElement) => {
  let currentId: string | null = null;
  const handleClickTitle = (event: Event) => {
    const $el = event.target as HTMLElement;
    if (!$el.classList.contains(cx("tab"))) return;

    const targetId = $el.parentElement!.dataset.id;
    if (!targetId) return;

    currentId = targetId === currentId ? null : targetId;
    for (const $item of $items) {
      $item.classList.toggle(cx("current"), $item.dataset.id === currentId);
    }
  };

  const $items = data.map(buildItem);
  const $ul = document.createElement("ul");
  $ul.classList.add(cx("container"));
  $ul.append(...$items);
  $ul.addEventListener("click", handleClickTitle);
  ($items[0].children[0] as HTMLElement).click();
  wrapper.append($ul);
};

const Accordion4V = () => <VanillaWrapper title="#4" initiator={initiator} />;
export default Accordion4V;
