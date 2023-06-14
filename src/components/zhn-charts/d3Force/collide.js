import { quadtree } from 'd3-quadtree';
import constant from './constant';
import jiggle from './jiggle';

const _isFn = v => typeof v === 'function'
, mathSqrt = Math.sqrt
, x = (d) => d.x + d.vx
, y = (d) => d.y + d.vy;

export default function(radius) {
  let nodes
  , radii
  , strength = 1
  , iterations = 1;

  if (!_isFn(radius)) radius = constant(radius == null ? 1 : +radius);

  const prepare = (
    quad
  ) => {
    if (quad.data) return quad.r = radii[quad.data.index];
    let i;
    for (i = quad.r = 0; i < 4; ++i) {
      if (quad[i] && quad[i].r > quad.r) {
        quad.r = quad[i].r;
      }
    }
  }
  , force = () => {
    let i
    , n = nodes.length
    , tree
    , node
    , xi
    , yi
    , ri
    , ri2
    , k
    , apply = (quad, x0, y0, x1, y1) => {
      let data = quad.data
      , rj = quad.r
      , r = ri + rj;
      if (data) {
        if (data.index > node.index) {
          let x = xi - data.x - data.vx
          , y = yi - data.y - data.vy
          , l = x * x + y * y;
          if (l < r * r) {
            if (x === 0) {
              x = jiggle();
              l += x * x;
            }
            if (y === 0) {
              y = jiggle();
              l += y * y;
            }
            l = (r - (l = mathSqrt(l))) / l * strength;
            node.vx += (x *= l) * (r = (rj *= rj) / (ri2 + rj));
            node.vy += (y *= l) * r;
            data.vx -= x * (r = 1 - r);
            data.vy -= y * r;
          }
        }
        return;
      }
      return x0 > xi + r || x1 < xi - r || y0 > yi + r || y1 < yi - r;
    };

    for (k = 0; k < iterations; ++k) {
      tree = quadtree(nodes, x, y).visitAfter(prepare);
      for (i = 0; i < n; ++i) {
        node = nodes[i];
        ri = radii[node.index];
        ri2 = ri * ri;
        xi = node.x + node.vx;
        yi = node.y + node.vy;
        tree.visit(apply);
      }
    }
  }
  , initialize = () => {
    if (!nodes) return;
    let i, n = nodes.length, node;
    radii = new Array(n);
    for (i = 0; i < n; ++i) {
    node = nodes[i];
    radii[node.index] = +radius(node, i, nodes);
    }
  }

  force.initialize = (_) => {
    nodes = _;
    initialize();
  };

  force.iterations = (_args) => _args.length
    ? (iterations = +_args[0], force)
    : iterations;

  force.strength = (_args) => _args.length
    ? (strength = +_args[0], force)
    : strength;

  force.radius = (_args) => _args.length
    ? (radius = _isFn(_args[0]) ? _args[0] : constant(+_args[0]), initialize(), force)
    : radius;

  return force;
}
