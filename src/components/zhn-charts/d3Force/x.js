import constant from './constant';

const _isFn = v => typeof v === 'function';

export default function(x) {
  let strength = constant(0.1)
  , nodes
  , strengths
  , xz;

  if (!_isFn(x)) x = constant(x == null ? 0 : +x);

  const force = (alpha) => {
    let i = 0
    , n = nodes.length
    , node;
    for (; i < n; ++i) {
      node = nodes[i];
      node.vx += (xz[i] - node.x) * strengths[i] * alpha;
    }
  }
  , initialize = () => {
    if (!nodes) return;
    let i, n = nodes.length;
    strengths = new Array(n);
    xz = new Array(n);
    for (i = 0; i < n; ++i) {
      strengths[i] = isNaN(xz[i] = +x(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
    }
  }

  force.initialize = (_) => {
    nodes = _;
    initialize();
  };

  force.strength = (..._args) => _args.length
    ? (strength = _isFn(_args[0]) ? _args[0] : constant(+_args[0]), initialize(), force)
    : strength;

  force.x = (..._args) => _args.length
    ? (x = _isFn(_args[0]) ? _args[0] : constant(+_args[0]), initialize(), force)
    : x;  

  return force;
}
