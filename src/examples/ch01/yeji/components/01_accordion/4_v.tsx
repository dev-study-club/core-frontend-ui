import VanillaWrapper from '../vanillaWrapper';
import cx from './cx';
import data from './data';

type AccordionItem = {
  id: string;
  title: string;
  description: string;
};

const buildItem = ({ id, title, description }: AccordionItem) => {
  const $tab = document.createElement('button');
  $tab.setAttribute('type', 'button');
  $tab.classList.add(cx('tab'));
  $tab.textContent = title;
  const $description = document.createElement('div');
  $description.classList.add(cx('description'));
  $description.textContent = description;
  const $li = document.createElement('li');
  $li.classList.add(cx('item'), cx('item3'));
  $li.setAttribute('data-id', id);
  $li.append($tab, $description);
  return $li;
};

const initiator = (wrapper: HTMLDivElement) => {
  let currentId: string | null = null;
  const handleClickTitle = (e: Event) => {
    const $el = e.target as HTMLElement;
    if (!$el.classList.contains(cx('tab'))) return;
    const targetId = $el.parentElement!.dataset.id;
    // HTML 구조가 변경되면 더 많은 상위 DOM에 접근해야 할 경우도 있습니다. 예를 들어 부모의 부모의 부모를 찾아가야 한다면,
    // parentElement를 반복해서 접근하기보다는 closest 메서드를 사용하는 것이 더 효율적입니다.
    if (!targetId) return;
    currentId = targetId === currentId ? null : targetId;
    for (const $item of $items) {
      $item.classList.toggle(cx('current'), currentId === $item.dataset.id);
    }
  };

  const $items = data.map(buildItem);
  const $ul = document.createElement('ul');
  $ul.classList.add(cx('container'));
  $ul.append(...$items);
  $ul.addEventListener('click', handleClickTitle);
  ($items[0].children[0] as HTMLElement).click();
  // 앞에 ;을 붙인 이유는 바로 위 코드와 연결되지 않은 새로운 코드임을 알리기 위해서입니다. ;을 빼면
  // list.forEach(...)($items...)로 인식하게 되어 예상 밖의 오류가 발생할 수 있습니다.
  // 방어용 세미콜론
  wrapper.append($ul);
};

const Accordion4V = () => <VanillaWrapper title="#4" initiator={initiator} />;

export default Accordion4V;
