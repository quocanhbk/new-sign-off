/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';
import styled from 'styled-components'
import RequestCard from './RequestCard';
import ListToolbar from './ListToolbar';
import {getFader} from 'utils/color';
import { useLocation } from '@reach/router';
import InfiniteScroll from 'react-infinite-scroll-component';
const StyleListWrapper =styled.div`
    flex: 5;
    background-color: ${(props) => props.theme.color.background.primary};
    color: ${(props) => props.theme.color.text.primary};
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0 0.5rem;
`
const TagBar = styled.div`
    display: flex;
    & > * + * {
		margin-left: 0.5rem;
	}
    height: 2.5rem;
    align-items: center;
`;
const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > * + * {
		margin-left: 0.5rem;
	}
`;

const CardList = styled.div`
    width: 100%;
    flex: 1;
    overflow: auto;
    position: relative;

    & .infinite-scroll-component__outerdiv {
        height: 100%;
        display:flex;
        flex-direction: column;
        & > * + * {
            margin-top: 0.5rem;
        }
    }
    & .request-scroller {
        ::-webkit-scrollbar {
        width: 0.5rem;
        }
        ::-webkit-scrollbar-track {
        background: transparent;
        }
        ::-webkit-scrollbar-thumb {
        background: ${props => getFader(props.theme.color.fill.secondary, 0.5)};
        border-radius: 99px;
        }
        ::-webkit-scrollbar-thumb:hover {
        background: ${props => props.theme.color.fill.secondary};
        }
    }
`
const FilterTag = styled.span`
    padding: 0.2rem 0.4rem;
    border-radius: 0.2rem;
    background: ${props => getFader(props.theme.color.border.primary, 0.9)};
    cursor: pointer;
    font-size: 0.8rem;
`
// I use the same component for Search and Sign, mode = "search" | "sign"
function List({mode, hook, scroll, setScroll}) {
    const location = useLocation().pathname.split("/")
    const {onChangeTitleSearch, query, setQuery, queryTags, render, fetchNextPage, hasNextPage, data} = hook

    return (
        <StyleListWrapper>
            <ListToolbar 
                setQueryTitle={(v) => onChangeTitleSearch(v)}
                query={query}
                set={setQuery}
            />
            <TagBar>
                <p>Filter: </p>
                <TagContainer>
                    {queryTags.map(tag => <FilterTag onClick={tag.onClick} key={tag.key}>{tag.text}</FilterTag>)}
                </TagContainer>
            </TagBar>
            <CardList id="scrollableDiv">
                {render(
                    <InfiniteScroll
                        dataLength={data ? data.pages.reduce((init, cur) => init.concat(cur), []).length : 0}
                        className="request-scroller"
                        next={() => fetchNextPage()}
                        hasMore={hasNextPage}
                        height="100%"
                        initialScrollY={scroll || 0}
                        onScroll={v => {if (setScroll) setScroll(v.target.scrollTop)}}
                    >
                        {data && data.pages.map((page, i) =>
                            <Fragment key={i}>
                                {page.map(task =>
                                    <RequestCard
                                        key={task.id}
                                        data={task}
                                        page={mode}
                                        active={task.id == location[location.length - 1]}
                                        set={setQuery}
                                    />
                                )}
                            </Fragment>
                        )}
                    </InfiniteScroll>
                )}
            </CardList>
        </StyleListWrapper>
    );
}

export default List;