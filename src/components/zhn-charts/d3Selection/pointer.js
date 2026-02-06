import sourceEvent from './sourceEvent';

export default function(evt, node) {
  evt = sourceEvent(evt);
  if (node === undefined) node = evt.currentTarget;
  if (node) {
    const svg = node.ownerSVGElement || node;
    if (svg.createSVGPoint) {
      let point = svg.createSVGPoint();
      point.x = evt.clientX;
      point.y = evt.clientY;
      point = point.matrixTransform(node.getScreenCTM().inverse());
      return [
        point.x,
        point.y
      ];
    }
    if (node.getBoundingClientRect) {
      const rect = node.getBoundingClientRect();
      return [
        evt.clientX - rect.left - node.clientLeft,
        evt.clientY - rect.top - node.clientTop
      ];
    }
  }
  return [
    evt.pageX,
    evt.pageY
  ];
}
