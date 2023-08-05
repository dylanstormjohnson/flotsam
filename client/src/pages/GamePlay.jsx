import Page from "../components/Page";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useLazyQuery } from '@apollo/client';
import { QUERY_SINGLE_STORY, QUERY_SINGLE_STORY_SLIDE } from '../graphql/queries';
import { useEffect } from "react";
import audio from '../utils/audioAPI'
import spinner from '../assets/images/loadingSpinner/spinner.gif';

const headContent = (
  <>
    <title>FlotSam - GamePlay</title>
    <meta name="description" content="This is the game play page of my app." />
   {/* <audio>${audio}</audio> */}
  </>
);

const songExample = '16154'

export default function GamePlay() {
  const { gameId } = useParams();
  const [storyInfo, setStoryInfo] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(null);

  const { loading, error, data } = useQuery(QUERY_SINGLE_STORY, {
    variables: { storyId: gameId },
  });

  useEffect(() => {
    if(!storyData) return;

    setCurrentSlide({
      ...storyData.story.firstStorySlide
    });

    setStoryInfo({
      ...storyData.story
    });

  }, [storyData])

  const [getSlide, { loading: slideLoading, error: slideError, data: currentSlideData }] = useLazyQuery(QUERY_SINGLE_STORY_SLIDE);

  const handleButtonClick = async (slideId) => {
    const { data } = await getSlide({
      variables: {
        storySlideId: slideId,
      },
    });

  console.log(data)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
