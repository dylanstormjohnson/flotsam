import Page from "../components/Page";
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_STORY, QUERY_SINGLE_STORY_SLIDE, QUERY_SINGLE_STORY_OPTION } from '../graphql/queries';
import { useEffect } from "react";
import audio from '../utils/audioAPI'
const headContent = (
  <>
    <title>FlotSam - GamePlay</title>
    <meta name="description" content="This is the game play page of my app." />
  </>
);

const songExample = '16154'

export default function GamePlay() {
  const { gameId } = useParams();

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

  return (
    <Page className="authContainer"  headContent={headContent}>
    </Page>
  );
}
