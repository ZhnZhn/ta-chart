import { Component } from '../../../uiApi';
import { shallowEqual } from './shallowEqual';

export class PureComponent extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      !shallowEqual(this.props, nextProps)
      || !shallowEqual(this.state, nextState)
      || !shallowEqual(this.context, nextContext)
    );
  }
}
