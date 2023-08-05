import Page from "../components/Page";
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_STORY, QUERY_SINGLE_STORY_SLIDE, QUERY_SINGLE_STORY_OPTION } from '../graphql/queries';
// import { audio } from '.../server/utils/audioAPI.js'
import { useEffect } from "react";
import audio from '../utils/audioAPI'
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

  // const { loading, error, data } = useQuery(QUERY_SINGLE_STORY, {
  //   variables: { storyId: gameId },
  // });

  const getAudio = async (song) => {
    try {

      const data = await audio(song);

      console.log(data);

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAudio(songExample)
  }, []);

  // const { hloading, herror, hdata } = useQuery(QUERY_SINGLE_STORY_SLIDE, {
  //   variables: { storyId: gameId },
  // });

  // console.log(data)

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  return (
    // add isProtected to this line
    <Page className="authContainer"  headContent={headContent}>
      {/* <h1>Welcome to {data.story.name}</h1> */}
    </Page>
  );
}
