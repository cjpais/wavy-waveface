import { FunctionalComponent, h } from 'preact';
import { useEffect, useState, useCallback } from 'preact/hooks';
import style from './style.css';

import Select from 'react-select'

import ig_icon from "../../assets/brand-icons/insta_glyph.png"
import yt_icon from "../../assets/brand-icons/yt_icon.png"

interface Props {
}

type Feed = {
    id: string
    name: string
    thumbnail: string
    type: string
    selected?: boolean
    searched?: boolean
}

function getPlatformLogo(type: string): string {
    var logo = ""

    switch(type) {
        case "ig":
            logo = ig_icon
        case "yt":
            logo = yt_icon
        default:
            logo = ""
    }

    logo = ig_icon

    return logo
}

const Profile: FunctionalComponent<Props> = (props: Props) => {
    const [feeds, setFeeds] = useState<Feed[]>([]);
    const [selectedFeeds, setSelectedFeeds] = useState<Feed[]>([]);
    const [selectOptions, setSelectOptions] = useState<any[]>([]);

    const [test, setTest] = useState(0)

    // gets called when this route is navigated to
    useEffect(() => {
        fetch('http://localhost:8000/api/feeds/')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setFeeds(data)

            var opt: any[] = []
            data.map((feed: Feed) => {
                
                var label = <div style={{display: "flex", alignItems: "center"}}>
                    <img src={feed.thumbnail} style={{width: "32px", height: "32px", borderRadius: "50%", marginRight: ".5em"}}></img>
                    <img src={getPlatformLogo(feed.type)} style={{width: "12px", height: "12px", marginRight: ".25em"}}></img>
                    <h5>{feed.name}</h5>
                </div>
                opt.push({value: feed.id, label: label, data: feed})
            })

            setSelectOptions(opt)

        })
    }, []);

    /* TODO we really should try to find a component or make a generic version */
    /* This is just a filtered search */
    const updateSearch = useCallback((e: any) => {

        var search = e.target.value.toLowerCase()

        if (search != "") {
            feeds.map((feed: Feed, index: number) => {
                if (feed.name.toLowerCase().includes(search)) {
                    feeds[index].searched = true
                } else {
                    feeds[index].searched = false
                }
            })
        } else {
            feeds.map((feed: Feed, index: number) => {
                feeds[index].searched = true
            })
        }

        setFeeds(feeds)
        setTest(test + 1)
    }, [feeds, test])

    const selectFeed = useCallback((e: any, index: number) => {
        var dup = selectedFeeds

        var feed = feeds[index]
        feed.selected = true
        feeds[index].selected = true

        dup.push(feed)

        setFeeds(feeds)
        setSelectedFeeds(dup)
        setTest(test + 1)

    }, [test, feeds, selectedFeeds])

    function countSearched() {
        var count = 0

        feeds.map((feed: Feed, index: number) => {
            if (feed.searched == null || feed.searched == true) {
                count++;
            }
        })

        return count
    }

    return (
        <div class={style.profile}>
            <h1>Create Feed</h1>

            <div style={{display: "flex", paddingBottom: "1em"}}>
                <form>
                    <input type="text" id="feedName" name="feedName" placeholder="Feed Name..."></input>
                </form>
                {/* TODO only display if can add */}
                <button>
                    Add Feed
                </button>
            </div>

            <h3>Added Feeds {test}</h3>

            {/* TODO deselect on click, hover cursor and bg color */}
            <div style={{display: "flex", flexWrap: "wrap"}}>
                {selectedFeeds.map((feed: Feed, i: number) => {
                    if (feed.selected == true) {
                        return (
                            <div style={{display: "flex", alignItems: "center", backgroundColor: "#eeeeee", padding: ".25em", margin: ".25em", paddingLeft: ".75em", paddingRight: ".75em", borderRadius: "1em"}} onClick={(e) => selectFeed(e, i)}>
                                <img src={feed.thumbnail} style={{width: "48px", height: "48px", borderRadius: "50%", marginRight: ".5em"}}></img>
                                <img src={getPlatformLogo(feed.type)} style={{width: "16px", height: "16px", marginRight: ".25em"}}></img>
                                <h5>{feed.name}</h5>
                            </div>
                        )
                    }
                })}
            </div>

            <h3>Search Feeds {countSearched()}</h3>
            <form>
                <input type="text" id="feedSearch" name="feedSearch" placeholder="Search Feeds" onKeyDown={(e) => updateSearch(e)}></input>
            </form>

            <div style={{display: "flex", flexWrap: "wrap"}}>
                {feeds.map((feed: Feed, i: number) => {
                    if ( (feed.selected == null || feed.selected == false) && 
                         (feed.searched == null || feed.searched == true) ) {
                        return (
                            <div style={{display: "flex", alignItems: "center", backgroundColor: "#eeeeee", padding: ".25em", margin: ".25em", paddingLeft: ".75em", paddingRight: ".75em", borderRadius: "1em"}} onClick={(e) => selectFeed(e, i)}>
                                <img src={feed.thumbnail} style={{width: "48px", height: "48px", borderRadius: "50%", marginRight: ".5em"}}></img>
                                <img src={getPlatformLogo(feed.type)} style={{width: "16px", height: "16px", marginRight: ".25em"}}></img>
                                <h5>{feed.name}</h5>
                            </div>
                        )
                    }
                })}
            </div>


            <Select
                name="selectedFeeds"
                options={selectOptions}
                isMulti
            />

{/* 
            <p>This is the user profile for a user named {user}.</p>

            <div>Current time: {new Date(time).toLocaleString()}</div>

            <p>
                <button onClick={increment}>Click Me</button> Clicked {count}{' '}
                times.
            </p> */}
        </div>
    );
};

export default Profile;