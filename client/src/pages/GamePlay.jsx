import Page from "../components/Page";
import React, { useState, useEffect } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  QUERY_SINGLE_STORY,
  QUERY_SINGLE_STORY_SLIDE,
} from "../graphql/queries";
// import { audio } from '.../server/utils/audioAPI.js'
import spinner from "../assets/images/loadingSpinner/spinner.gif";
import { useSelector } from "react-redux";
import { getUser } from "../redux/slices/userSlice";
const headContent = (
  <>
    <title>FlotSam - GamePlay</title>
    <meta name="description" content="This is the game play page of my app." />
    {/* <audio>${audio}</audio> */}
  </>
);

export default function GamePlay() {
  const { gameId } = useParams();
  const [storyInfo, setStoryInfo] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(null);

  const {
    loading: storyLoading,
    error: storyError,
    data: storyData,
  } = useQuery(QUERY_SINGLE_STORY, {
    variables: { storyId: gameId },
  });

  useEffect(() => {
    if (!storyData) return;

    setCurrentSlide({
      ...storyData.story.firstStorySlide,
    });

    setStoryInfo({
      ...storyData.story,
    });
  }, [storyData]);

  const [
    getSlide,
    { loading: slideLoading, error: slideError, data: currentSlideData },
  ] = useLazyQuery(QUERY_SINGLE_STORY_SLIDE);

  const { isAuthenticated } = useSelector(getUser());

  if (!isAuthenticated) {
    return <Navigate to="/signup" />;
  }

const handleButtonClick = async (slideId, optionsText) => {

    const { data } = await getSlide({
      variables: {
        storySlideId: slideId,
      },
    });

    setCurrentSlide({
      ...data.storySlide,
    });
};

  console.log(storyInfo);
  console.log(currentSlide);

  return (
    <Page
      className="authContainer gamePlayCon"
      isProtected
      headContent={headContent}
    >
      {storyInfo ? (
        <div className="gameSpace d-flex align-items-center flex-column">
          <h1 className="gameTitle">{storyInfo?.name}</h1>
          {/* <div className="gameContainer">
          <img src={storyInfo?.backgroundImage} alt="Background" />
        </div> */}
          <p className="textContainer">{currentSlide?.text}</p>
          <div className="optionsContainer d-flex align-items-center flex-column">
            {currentSlide?.options.map((options) => (
              options.text === "Go to Stories Page" ? (
              <button
                className="options btn btn-outline-light w-100 mb-2"
                onClick={() => handleButtonClick(options.nextStorySlide._id, options.text)}
                key={options._id}
              >
                <Link to="/stories">{options.text}</Link>
              </button>
              ) : (
              <button
                className="options btn btn-outline-light w-100 mb-2"
                onClick={() => handleButtonClick(options.nextStorySlide._id, options.text)}
                key={options._id}
              >
                {options.text}
              </button>
              )
            ))}
          </div>
        </div>
      ) : null}
      {storyLoading || slideLoading ? (
        <img src={spinner} alt="loading" />
      ) : null}
    </Page>
  );
}
