import pointer from './pointer';
import sourceEvent from './sourceEvent';

const arrayFrom = Array.from;

export default function(events, node) {
  // i.e., instanceof Event, not TouchList or iterable
  if (events.target) {
    events = sourceEvent(events);
    if (node === void 0) node = events.currentTarget;
    events = events.touches || [events];
  }
  return arrayFrom(
    events,
    event => pointer(event, node)
  );
}
