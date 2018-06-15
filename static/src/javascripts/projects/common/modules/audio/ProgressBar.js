import { Component, styled } from '@guardian/dotcom-rendering/packages/guui';

import AuralAid from './AuralAid';
import Slider from './Slider';

const Progress = styled('div')(
  ({ backgroundColor, height }) => ({
    alignItems: 'stretch',
    backgroundColor,
    backgroundClip: 'content-box',
    display: 'flex',
    height: `${height + 4 * 2}px`,
    padding: '4px 0',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    position: 'relative',

    '[role="slider"]': {
      opacity: 0,
      transition: 'opacity linear 200ms'
    },

    ':hover [role="slider"]': {
      opacity: 1
    }
  })
);

const Track = styled('div')(
  ({ backgroundColor, width }) => ({
    backgroundColor,
    width
  })
);

const pct = n => `${n}%`;

export default class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.onChange = props.onChange;
    this.state = {
      dragging: false,
      value: props.value,
      position: 0,
      width: 0
    };
  }

  componentDidMount() {
    const { width, left } = this.element.getBoundingClientRect();
    const position = this.state.value * width / 100;
    this.setState({ width, left, position });
  }

  getElement = el => {
    this.element = el;
  }

  start = e => {
    const position = e.clientX - this.state.left;
    const value = position * 100 / this.state.width;
    this.setState({ dragging: true, position, value });
    window.addEventListener('mousemove', this.update);
    window.addEventListener('mouseup', this.stop, { once: true });
  }

  stop = () => {
    this.setState({ dragging: false })
    this.onChange(this.state.value);
    window.removeEventListener('mousemove', this.update);
  }

  update = e => {
    const position = e.clientX - this.state.left;
    const value = position * 100 / this.state.width;
    this.setState({ value, position });
  }

  render() {
    return (
      <Progress
        innerRef={this.getElement}
        backgroundColor={this.props.progressColour}
        height={this.props.barHeight}
        onMouseDown={this.start}
        role="progressbar"
        aria-valuenow={this.state.dragging ? this.state.draggingValue : this.props.value}
        aria-valuemin="0"
        aria-valuemax="100"
        >
        <Track backgroundColor={this.props.trackColour} width={pct(this.props.value)} />
        <AuralAid text={this.props.formattedValue} />
        <Slider min={0} max={this.state.width} value={this.state.position} />
      </Progress>
    )
  }
}
