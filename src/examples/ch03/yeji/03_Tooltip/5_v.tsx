import VanillaWrapper from '../vanillaWrapper';
import initViewportObserver, {
  notifyScrollInfoChanged,
  ScrollInfo,
  ViewportSize,
} from '@/context/vanilla/viewportObserver';
import cx from './cx';
import data from './data';
import Observer from '@/context/vanilla/observer';
import getStyleInsideViewport from '@/hooks/vanilla/getStyleInsideViewport';

const initiator = (wrapper: HTMLDivElement) => {
  initViewportObserver();
  const $tooltips = data.map(({ id, text, description }) => {
    const $root = document.createElement('span');
    $root.classList.add(cx('tooltip-root'));
    $root.textContent = text;
    const $details = document.createElement('details');
    $details.name = 'tooltip';
    $details.classList.add(cx('details'));
    const $summary = document.createElement('summary');
    $summary.classList.add(cx('tooltip-trigger'));
    const $tooltip = document.createElement('span');
    $tooltip.classList.add(cx('tooltip-layer'));
    $tooltip.textContent = description;
    $details.append($summary, $tooltip);
    $root.append($details);

    $details.addEventListener('toggle', () => {
      if ($details.open) notifyScrollInfoChanged();
    });
    return $root;
  });
  const handler = (viewportSize: ViewportSize) => {
    for (const $root of $tooltips) {
      const $details = $root.querySelector(
        'details[open]'
      ) as HTMLDetailsElement;
      if (!$details) continue;
      const $tooltip = $root.getElementsByClassName(
        cx('tooltip-layer')
      )[0] as HTMLElement;
      const newStyle =
        getStyleInsideViewport($details, $tooltip, viewportSize) || '';
      $tooltip.setAttribute('style', newStyle);
    }
  };
  Observer.observe<ScrollInfo>('scrollInfo', wrapper, handler);
  Observer.observe<ViewportSize>('viewportSize', wrapper, handler);
  wrapper.append(...$tooltips);
};
const Tooltip5V = () => <VanillaWrapper title="#5" initiator={initiator} />;
export default Tooltip5V;
