// @flow
import {
    React,
    Component,
    styled,
} from '@guardian/dotcom-rendering/packages/guui';
import { pillarsHighlight } from '@guardian/dotcom-rendering/packages/pasteup/palette';
import {
    tablet,
    leftCol,
    wide,
} from '@guardian/dotcom-rendering/packages/pasteup/breakpoints';
import palette from '@guardian/dotcom-rendering/packages/pasteup/palette';

import download from 'svgs/journalism/audio-player/download.svg';
import pauseBtn from 'svgs/journalism/audio-player/pause-btn.svg';
import playBtn from 'svgs/journalism/audio-player/play-btn.svg';
import volume from 'svgs/journalism/audio-player/volume.svg';
import fastBackward from 'svgs/journalism/audio-player/fast-backward.svg';
import fastForward from 'svgs/journalism/audio-player/fast-forward.svg';
import fastBackwardActive from 'svgs/journalism/audio-player/fast-backward-active.svg'
import fastForwardActive from 'svgs/journalism/audio-player/fast-forward-active.svg';


import { formatTime } from './utils';

import ProgressBar from './ProgressBar';
import Time from './Time';

const AudioGrid = styled('div')({
    borderTop: '1px solid #767676',
    display: 'grid',
    backgroundColor: palette.neutral[1],
    color: palette.neutral[5],
    gridTemplateColumns: '6fr 4fr',
    gridTemplateRows: '30px 90px 100px 50px 1fr',
    gridTemplateAreas:
        '"currentTime duration" "wave wave" "controls controls" "volume download" "links links"',

    [tablet]: {
        gridTemplateColumns: '150px 1fr 1fr',
        gridTemplateRows: '30px 90px 90px 1fr 1fr',
        gridTemplateAreas:
            '"currentTime currentTime duration" "wave wave wave" "controls controls controls" "volume volume volume" "download links links"',
    },

    [leftCol]: {
        gridTemplateRows: '30px 90px 1fr 1fr',
        gridTemplateAreas:
            '". currentTime duration" "controls wave wave" "volume . ." "download links links"',
    },

    [wide]: {
        gridTemplateColumns: '230px 1fr 1fr',
    },
});

const TimeSpan = styled('span')(({ area }) => ({
    [area === 'currentTime'
        ? 'borderLeft'
        : 'borderRight']: '1px solid #767676',
    [area === 'currentTime' ? 'paddingLeft' : 'paddingRight']: '10px',
    gridArea: area,
    paddingTop: '7px',
    fontFamily: 'Guardian Text Sans Web',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: area === 'duration' ? 'flex-end' : 'flex-start',
}));

const Controls = styled('div')({
    gridArea: 'controls',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '33px 0',
});

const WaveAndTrack = styled('div')({
    gridArea: 'wave',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
});

const Track = styled('div')({
    height: '12px',
    position: 'relative',
    top: '-4px',
});

const Wave = styled('svg')({
    flex: 1,
});

const Volume = styled('div')({
    gridArea: 'volume',
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
    borderTop: '1px solid #797979',
    borderRight: '1px solid #797979',
    [tablet]: {
        borderRight: 'none',
    },
    [leftCol]: {
        border: 'none',
    },
    '> img': {
        marginRight: '6px',
    },
    'div[role="progressbar"]': {
        flex: 1,
    },
});

const Download = styled('div')({
    borderTop: '1px solid #767676',
    gridArea: 'download',
    fontFamily: 'Guardian Text Sans Web',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [tablet]: {
        justifyContent: 'flex-start',
        paddingLeft: '10px',
        paddingTop: '8px',
    },
    a: {
        color: '#cbcbcb', // TODO: add to the palette
        border: '1px solid rgba(118, 118, 118, 0.7)',
        borderRadius: '15px',
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 12px',
        fontSize: '12px',
        textDecoration: 'none',

        ':hover': {
            borderColor: '#ffffff',
        },
    },
    img: {
        height: '18px',
        width: '18px',
        marginLeft: '6px',
    },
});

const Links = styled('div')({
    borderTop: '1px solid #767676',
    gridArea: 'links',
    padding: '10px 10px 0',
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'column',
    [tablet]: {
        borderLeft: '1px solid #767676',
        alignItems: 'baseline',
        flexDirection: 'row',
        paddingTop: 0,
        ul: {
            display: 'flex',
        },
        li: {
            marginLeft: '30px',
        },
    },
    b: {
        fontSize: '18px',
        fontFamily: 'GH Guardian Headline',
    },
    ul: {
        fontFamily: 'Guardian Text Sans Web',
        fontSize: '15px',
    },
    a: {
        color: '#cbcbcb', // TODO: add to the palette
    },
    li: {
        marginTop: '12px',
    },
    img: {
        marginRight: '10px',
        verticalAlign: 'middle',
    },
});

const Button = styled('button')(({ isPlay }) => ({
    background: 'none',
    border: 0,
    margin: 0,
    padding: isPlay ? '0 20px' : 0,
    ':focus': {
        outline: 'none', // ಠ_ಠ
    },

    padding: isPlay ? '0 45px' : 0,
    img: {
        width: isPlay ? '70px' : '26px',
        height: isPlay ? '70px' : '26px',
    },

    [leftCol]: {
        padding: isPlay ? '0 12px' : 0,
        img: {
            width: isPlay ? '60px' : '24px',
            height: isPlay ? '60px' : '24px',
        },
    },

    [wide]: {
        padding: isPlay ? '0 20px' : 0,
        img: {
            width: isPlay ? '78px' : '26px',
            height: isPlay ? '78px' : '26px',
        },
    },
}));

export default class AudioPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            started: false,
            playing: false,
            currentTime: 0,
            iteration: 0,
            duration: NaN,
            volume: NaN,
            bins: null,
            interval: NaN,
        };
    }

    componentDidMount() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
        const nbins = Math.floor(rect.width / 3);
        this.audio.addEventListener('volumechange', this.onVolumeChange);
        this.audio.addEventListener('timeupdate', this.onTimeUpdate);
        this.context = new window.AudioContext();
        this.analyser = this.context.createAnalyser();
        this.analyser.fftSize = 256;
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        this.source = this.context.createMediaElementSource(this.audio);
        this.source.connect(this.analyser);

        this.setState(
            {
                bins: new Array(nbins)
                    .fill(0, 0, nbins)
                    .map(() => Math.floor(Math.random() * rect.height * 0.6)),
                canvasH: rect.height,
                canvasW: rect.width,
            },
            () => {
                if (Number.isNaN(this.audio.duration)) {
                    this.audio.addEventListener('durationchange', this.ready, {
                        once: true,
                    });
                } else {
                    this.ready();
                }
            }
        );
    }

    setCanvas = el => {
        this.canvas = el;
    };

    setAudio = el => {
        this.audio = el;
    };

    ready = () => {
        const duration = this.audio.duration;
        const interval = duration / this.state.bins.length;
        this.setState({
            ready: true,
            duration,
            interval,
            volume: this.audio.volume,
        });
    };

    onVolumeChange = () => {
        this.setState({ volume: this.audio.volume });
    };

    onTimeUpdate = () => {
        this.setState({ currentTime: this.audio.currentTime });
    };

    play = () => {
        this.setState({ started: true, playing: !this.state.playing }, () => {
            if (this.state.playing) {
                this.audio.play();
                this.sample();
                this.setState({
                    sampler: window.setInterval(
                        this.sample,
                        this.state.interval * 1000
                    ),
                });
            } else {
                this.audio.pause();
                window.clearInterval(this.state.sampler);
                this.setState({ sampler: null });
            }
        });
    };

    forward = () => {
        this.audio.currentTime = Math.min(
            this.state.currentTime + 15,
            this.state.duration
        );
    };

    backward = () => {
        this.audio.currentTime = Math.max(this.state.currentTime - 15, 0);
    };

    updateVolume = v => {
        this.audio.volume = v / 100;
    };

    seek = v => {
        this.audio.currentTime = (this.audio.duration * v) / 100;
        this.setState({
            iteration: Math.floor((this.state.bins.length * v) / 100) - 1,
        });
    };

    sample = () => {
        this.analyser.getByteFrequencyData(this.dataArray);
        const factor = Math.max(1, ...this.dataArray);
        const mean =
            this.dataArray.reduce((res, x) => res + x, 0) /
            this.dataArray.length;
        const minHeight = 5;
        const barHeight =
            minHeight +
            Math.ceil((mean / factor) * (this.state.canvasH - minHeight));
        const bins = this.state.bins;
        bins[this.state.iteration] = barHeight;
        this.setState({
            bins,
            iteration: this.state.iteration + 1,
        });
    };

    render() {
        const currentOffset = this.state.ready ? (this.state.currentTime / this.state.duration) * 100 : 0;

        return (
            <AudioGrid>
                <audio
                    ref={this.setAudio}
                    data-media-id={this.props.mediaId}
                    preload="metadata">
                    <source src={this.props.sourceUrl} type="audio/mpeg" />
                </audio>
                <Controls>
                    <Button
                        isPlay={false}
                        onClick={this.backward}
                        disabled={!this.state.playing}
                        dangerouslySetInnerHTML={{__html: this.state.playing ? fastBackwardActive.markup : fastBackward.markup }}>
                    </Button>
                    <Button isPlay
                            onClick={this.play}
                            dangerouslySetInnerHTML={{__html: this.state.playing ? pauseBtn.markup: playBtn.markup }}>
                    </Button>

                    <Button
                        isPlay={false}
                        onClick={this.forward}
                        disabled={!this.state.playing}>
                        <span dangerouslySetInnerHTML={{__html: this.state.playing ? fastForwardActive.markup : fastForward.markup}}></span>
                    </Button>

                </Controls>
                <TimeSpan area="currentTime">
                    <Time t={this.state.currentTime} />
                </TimeSpan>
                <TimeSpan area="duration">
                    {this.state.ready ? <Time t={this.state.duration} /> : ''}
                </TimeSpan>
                <WaveAndTrack>
                    <Wave
                        innerRef={this.setCanvas}
                        colour={pillarsHighlight.sport}>
                        {this.state.ready
                            ? this.state.bins.map(
                                  (barHeight, i) =>
                                      i < this.state.iteration ? (
                                          <rect
                                              x={i * (this.props.barWidth + 1)}
                                              y={this.state.canvasH - barHeight}
                                              width={this.props.barWidth}
                                              height={barHeight}
                                              fill={this.props.highlightColor}
                                          />
                                      ) : i < this.state.iteration + 1 ? (
                                          <rect
                                              x={i * (this.props.barWidth + 1)}
                                              y={this.state.canvasH}
                                              width={this.props.barWidth}
                                              height={0}
                                              fill={this.props.neutralColor}
                                          />
                                      ) : (
                                          <rect
                                              x={i * (this.props.barWidth + 1)}
                                              y={this.state.canvasH - barHeight}
                                              width={this.props.barWidth}
                                              height={barHeight}
                                              fill={this.props.neutralColor}
                                          />
                                      )
                              )
                            : ''}
                    </Wave>
                    <Track>
                        <ProgressBar
                            value={this.state.currentOffset}
                            formattedValue={formatTime(
                                this.state.currentOffset
                            )}
                            barHeight={4}
                            trackColour={pillarsHighlight.sport}
                            progressColour={palette.neutral[4]}
                            onChange={this.seek}
                        />
                    </Track>
                </WaveAndTrack>
                {Number.isNaN(this.state.volume) ? (
                    ''
                ) : (
                    <Volume>
                        <span dangerouslySetInnerHTML={{__html: volume.markup}}></span>
                        <ProgressBar
                            value={this.state.volume * 100}
                            formattedValue={`Volume set to ${
                                this.state.volume
                            }`}
                            barHeight={2}
                            trackColour={pillarsHighlight.sport}
                            progressColour={palette.neutral[4]}
                            onChange={this.updateVolume}
                        />
                    </Volume>
                )}
                <Download>
                    <a href="#">
                        Download MP3
                        <span dangerouslySetInnerHTML={{__html: download.markup }}></span>
                    </a>
                </Download>
                <Links>
                    <b>Subscribe for free</b>
                    <ul>
                        <li>
                            <a href="#">
                                <img
                                    src="/static/icons/apple-podcast.png"
                                    srcSet="/static/icons/apple-podcast@2x.png 2x,
                                        /static/icons/apple-podcast@3x.png 3x"
                                />
                                Apple podcast
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img
                                    src="/static/icons/spotify.png"
                                    srcSet="/static/icons/spotify@2x.png 2x,
                                        /static/icons/spotify@3x.png 3x"
                                />
                                Spotify
                            </a>
                        </li>
                    </ul>
                </Links>
            </AudioGrid>
        );
    }
}
