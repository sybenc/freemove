import { default as Rect } from '../rect';
export interface ResizeData {
    type: 'height' | 'width';
    nodeRect: Rect;
}
