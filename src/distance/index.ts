import { NODE_CLASS_PREFIX } from '../const';
import Rect from '../rect';
import { Store } from '../store';
import { createElementNS } from '../utils';
import { DistanceType } from './type';

const distanceTypes: DistanceType[] = ['left', 'right', 'top', 'bottom'];

export class Distance {
  g: SVGGElement;
  distanceGroups: Record<DistanceType, SVGGElement>;
  x: {
    type: 'left' | 'right';
    node: HTMLElement | null;
  };
  y: {
    type: 'top' | 'bottom';
    node: HTMLElement | null;
  };

  constructor(svg: SVGSVGElement) {
    this.g = createElementNS<SVGGElement>('g');
    this.g.setAttribute('class', `${NODE_CLASS_PREFIX}-distance`);
    this.distanceGroups = {} as Record<DistanceType, SVGGElement>;

    const createGroup = (direction: DistanceType) => {
      const group = createElementNS<SVGGElement>('g');
      group.setAttribute('class', `${NODE_CLASS_PREFIX}-distance-${direction}`);

      const line = createElementNS<SVGLineElement>('line');
      line.setAttribute('class', `${NODE_CLASS_PREFIX}-distance-${direction}-line`);

      const text = createElementNS<SVGTextElement>('text');
      text.setAttribute('class', `${NODE_CLASS_PREFIX}-distance-${direction}-text`);

      const textBg = createElementNS<SVGRectElement>('rect');
      textBg.setAttribute('class', `${NODE_CLASS_PREFIX}-distance-${direction}-text-bg`);

      const startRect = createElementNS<SVGRectElement>('rect');
      startRect.setAttribute('class', `${NODE_CLASS_PREFIX}-distance-${direction}-line-start`);

      const endRect = createElementNS<SVGRectElement>('rect');
      endRect.setAttribute('class', `${NODE_CLASS_PREFIX}-distance-${direction}-line-end`);

      group.appendChild(line);
      group.appendChild(text);
      group.appendChild(textBg);
      group.appendChild(startRect);
      group.appendChild(endRect);

      return group;
    };

    this.x = {
      type: 'left',
      node: null,
    };
    this.y = {
      type: 'top',
      node: null,
    };

    distanceTypes.forEach((type) => {
      const group = createGroup(type);
      this.distanceGroups[type] = group;
    });

    this.g.append(...Object.values(this.distanceGroups));
    svg.append(this.g);
  }

  hidden() {
    Object.values(this.distanceGroups).forEach((group) => {
      group.style.display = 'none';
    });
  }

  reRender(store: Store) {
    
  }
}