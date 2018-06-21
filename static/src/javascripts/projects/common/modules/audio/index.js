// @flow

import Player from './AudioPlayer';
import {
    Component,
    React,
    render,
} from '@guardian/dotcom-rendering/packages/guui';

class AudioContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Player
                sourceUrl={this.props.source}
                mediaId={this.props.mediaId}
                barWidth={2}
                css={cssProps}
                controls="controls"
                neutralColor="#767676"
                highlightColor="blue"
            />
        );
    }
}

const init = (): void => {
    const placeholder: ?HTMLElement = document.getElementById(
        'audio-component-container'
    );

    if (placeholder) {
        const audioSource = placeholder.dataset.source;
        const audioDuration = placeholder.dataset.duration;
        const audioMediaId = placeholder.dataset.mediaId;
        render(
            <AudioContainer
                source={audioSource}
                duration={audioDuration}
                mediaId={audioMediaId}
            />,
            placeholder
        );
    }
};

export { init };

// temporary fixtures

const cssProps = {
    volume: {
        trackColour: '#000000',
        progressColour: '#00ff00',
    },
    track: {
        trackColour: '#000000',
        progressColour: '#0000ff',
    },
};

const episodes = [
    {
        id:
            'football/blog/audio/2018/may/21/fa-cup-cans-of-worms-serie-a-drama-and-talking-turkey-football-weekly',
        type: 'audio',
        sectionId: 'football',
        sectionName: 'Football',
        webPublicationDate: '2018-05-21T12:10:44Z',
        webTitle:
            'FA Cup cans of worms, Serie A drama and talking Turkey – Football Weekly',
        webUrl:
            'https://www.theguardian.com/football/blog/audio/2018/may/21/fa-cup-cans-of-worms-serie-a-drama-and-talking-turkey-football-weekly',
        apiUrl:
            'https://content.guardianapis.com/football/blog/audio/2018/may/21/fa-cup-cans-of-worms-serie-a-drama-and-talking-turkey-football-weekly',
        isHosted: false,
        pillarId: 'pillar/sport',
        pillarName: 'Sport',
    },
    {
        id:
            'football/blog/audio/2018/may/17/englands-world-cup-hopes-everton-and-trigonometry-football-weekly-extra',
        type: 'audio',
        sectionId: 'football',
        sectionName: 'Football',
        webPublicationDate: '2018-05-17T16:01:06Z',
        webTitle:
            "England's World Cup hopes, Everton and trigonometry – Football Weekly Extra",
        webUrl:
            'https://www.theguardian.com/football/blog/audio/2018/may/17/englands-world-cup-hopes-everton-and-trigonometry-football-weekly-extra',
        apiUrl:
            'https://content.guardianapis.com/football/blog/audio/2018/may/17/englands-world-cup-hopes-everton-and-trigonometry-football-weekly-extra',
        isHosted: false,
        pillarId: 'pillar/sport',
        pillarName: 'Sport',
    },
    {
        id:
            'football/blog/audio/2018/may/14/wenger-gone-goal-frenzies-and-tranmere-rovers-return-football-weekly-podcast',
        type: 'audio',
        sectionId: 'football',
        sectionName: 'Football',
        webPublicationDate: '2018-05-14T16:31:27Z',
        webTitle:
            "Wenger gone, goal frenzies and Tranmere Rovers' return – Football Weekly",
        webUrl:
            'https://www.theguardian.com/football/blog/audio/2018/may/14/wenger-gone-goal-frenzies-and-tranmere-rovers-return-football-weekly-podcast',
        apiUrl:
            'https://content.guardianapis.com/football/blog/audio/2018/may/14/wenger-gone-goal-frenzies-and-tranmere-rovers-return-football-weekly-podcast',
        isHosted: false,
        pillarId: 'pillar/sport',
        pillarName: 'Sport',
    },
    {
        id:
            'football/blog/audio/2018/may/10/premier-league-joy-and-despair-as-finale-looms-football-weekly-extra-podcast',
        type: 'audio',
        sectionId: 'football',
        sectionName: 'Football',
        webPublicationDate: '2018-05-10T14:26:56Z',
        webTitle:
            'Premier League joy and despair as finale looms – Football Weekly Extra',
        webUrl:
            'https://www.theguardian.com/football/blog/audio/2018/may/10/premier-league-joy-and-despair-as-finale-looms-football-weekly-extra-podcast',
        apiUrl:
            'https://content.guardianapis.com/football/blog/audio/2018/may/10/premier-league-joy-and-despair-as-finale-looms-football-weekly-extra-podcast',
        isHosted: false,
        pillarId: 'pillar/sport',
        pillarName: 'Sport',
    },
    {
        id:
            'football/audio/2018/may/07/squeaky-bum-time-at-the-bottom-of-the-premier-league-football-weekly',
        type: 'audio',
        sectionId: 'football',
        sectionName: 'Football',
        webPublicationDate: '2018-05-07T16:05:42Z',
        webTitle:
            'Squeaky bum time at the bottom of the Premier League – Football Weekly',
        webUrl:
            'https://www.theguardian.com/football/audio/2018/may/07/squeaky-bum-time-at-the-bottom-of-the-premier-league-football-weekly',
        apiUrl:
            'https://content.guardianapis.com/football/audio/2018/may/07/squeaky-bum-time-at-the-bottom-of-the-premier-league-football-weekly',
        isHosted: false,
        pillarId: 'pillar/sport',
        pillarName: 'Sport',
    },
    {
        id:
            'football/blog/audio/2018/may/03/goals-crows-and-lying-league-tables-football-weekly-extra-podcast',
        type: 'audio',
        sectionId: 'football',
        sectionName: 'Football',
        webPublicationDate: '2018-05-03T15:11:22Z',
        webTitle:
            'Goals, crows and lying league tables – Football Weekly Extra',
        webUrl:
            'https://www.theguardian.com/football/blog/audio/2018/may/03/goals-crows-and-lying-league-tables-football-weekly-extra-podcast',
        apiUrl:
            'https://content.guardianapis.com/football/blog/audio/2018/may/03/goals-crows-and-lying-league-tables-football-weekly-extra-podcast',
        isHosted: false,
        pillarId: 'pillar/sport',
        pillarName: 'Sport',
    },
    {
        id:
            'football/blog/audio/2018/apr/30/boxes-baggies-celtic-sunderland-and-more-football-weekly-podcast',
        type: 'audio',
        sectionId: 'football',
        sectionName: 'Football',
        webPublicationDate: '2018-04-30T15:51:21Z',
        webTitle:
            'Boxes, Baggies, Celtic, Sunderland and more – Football Weekly',
        webUrl:
            'https://www.theguardian.com/football/blog/audio/2018/apr/30/boxes-baggies-celtic-sunderland-and-more-football-weekly-podcast',
        apiUrl:
            'https://content.guardianapis.com/football/blog/audio/2018/apr/30/boxes-baggies-celtic-sunderland-and-more-football-weekly-podcast',
        isHosted: false,
        pillarId: 'pillar/sport',
        pillarName: 'Sport',
    },
    {
        id:
            'football/audio/2018/apr/26/mo-salah-mo-problems-for-roma-football-weekly-extra-podcast',
        type: 'audio',
        sectionId: 'football',
        sectionName: 'Football',
        webPublicationDate: '2018-04-26T14:18:24Z',
        webTitle: "Mo Salah, mo' problems for Roma – Football Weekly Extra",
        webUrl:
            'https://www.theguardian.com/football/audio/2018/apr/26/mo-salah-mo-problems-for-roma-football-weekly-extra-podcast',
        apiUrl:
            'https://content.guardianapis.com/football/audio/2018/apr/26/mo-salah-mo-problems-for-roma-football-weekly-extra-podcast',
        isHosted: false,
        pillarId: 'pillar/sport',
        pillarName: 'Sport',
    },
    {
        id:
            'football/audio/2018/apr/23/wenger-finally-out-and-managers-surviving-nuclear-fallout-football-weekly',
        type: 'audio',
        sectionId: 'football',
        sectionName: 'Football',
        webPublicationDate: '2018-04-23T15:40:15Z',
        webTitle:
            'Wenger finally out and managers surviving nuclear fallout – Football Weekly',
        webUrl:
            'https://www.theguardian.com/football/audio/2018/apr/23/wenger-finally-out-and-managers-surviving-nuclear-fallout-football-weekly',
        apiUrl:
            'https://content.guardianapis.com/football/audio/2018/apr/23/wenger-finally-out-and-managers-surviving-nuclear-fallout-football-weekly',
        tags: [],
        references: [],
        isHosted: false,
        pillarId: 'pillar/sport',
        pillarName: 'Sport',
    },
    {
        id:
            'football/audio/2018/apr/19/andy-carroll-surrounded-by-toddlers-football-weekly-extra',
        type: 'audio',
        sectionId: 'football',
        sectionName: 'Football',
        webPublicationDate: '2018-04-19T14:37:53Z',
        webTitle: 'Andy Carroll surrounded by toddlers – Football Weekly Extra',
        webUrl:
            'https://www.theguardian.com/football/audio/2018/apr/19/andy-carroll-surrounded-by-toddlers-football-weekly-extra',
        apiUrl:
            'https://content.guardianapis.com/football/audio/2018/apr/19/andy-carroll-surrounded-by-toddlers-football-weekly-extra',
        tags: [],
        references: [],
        isHosted: false,
        pillarId: 'pillar/sport',
        pillarName: 'Sport',
    },
];
