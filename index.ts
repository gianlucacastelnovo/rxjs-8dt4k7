import { fromEvent, exhaustMap, takeUntil } from 'rxjs';

const target = document.createElement('div');
target.setAttribute(
  'style',
  'position: absolute; top: 0; left: 0; background-color: green; width: 150px; height: 50px;'
);
document.body.append(target);

fromEvent(target, 'mousedown')
  .pipe(
    exhaustMap(() =>
      fromEvent(document, 'mousemove').pipe(
        takeUntil(fromEvent(document, 'mouseup'))
      )
    )
  )
  .subscribe(({ pageX, pageY }: MouseEvent) => {
    target.style.transform = `translate3d(${pageX}px, ${pageY}px, 0)`;
  });
