export default function(evt) {
  let sourceEvent;
  while (sourceEvent = evt.sourceEvent) evt = sourceEvent;
  return evt;
}
