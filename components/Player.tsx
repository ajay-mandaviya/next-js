import React from "react";
import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from "react-icons/md";
import ReactHowler from "react-howler";
import { useStoreActions } from "easy-peasy";
import { formatTime } from "../lib/formater";

const Player = ({ songs, activeSong }) => {
  const setActiveSong = useStoreActions((state: any) => state.chaneActiveSong);
  const playRef = useRef();

  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState(
    songs.findIndex((s) => s.id === activeSong.id)
  );
  const [seek, setSeek] = useState(0.0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0.0);
  const repeatRef = useRef(repeat);
  const handlePlaying = (value: boolean) => {
    setIsPlaying(value);
  };
  const prevSong = () => {
    setIndex((prev) => {
      return prev ? prev - 1 : songs.length - 1;
    });
  };
  const nextSong = () => {
    setIndex((prev) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length);
        if (next === prev) {
          return nextSong();
        }
        return next;
      }
      return prev === songs.length - 1 ? 0 : prev + 1;
    });
  };

  const onEnd = () => {
    if (repeatRef.current) {
      setSeek(0);
      playRef?.current.props.onSeek(0);
    } else {
      nextSong();
    }
  };

  console.log("playRef", playRef.current);

  const onLoad = () => {
    const songDuration = playRef.current.duration();
    console.log("songDuration", songDuration);
    setDuration(songDuration);
  };

  const onSeek = (e: any) => {
    console.log("e", e);
    setSeek(parseFloat(e[0]));
    playRef.current.seek(e[0]);
  };

  useEffect(() => {
    let timerId: any;
    if (isPlaying && !isSeeking) {
      const f = () => {
        setSeek(playRef.current.seek());
        timerId = requestAnimationFrame(f);
      };
      timerId = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timerId);
    }
    cancelAnimationFrame(timerId);
  }, [isPlaying, isSeeking]);

  useEffect(() => {
    setActiveSong(songs[index]);
  }, [index, songs, setActiveSong]);

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  return (
    <Box>
      <Box>
        <ReactHowler
          onLoad={onLoad}
          ref={playRef}
          src={activeSong?.url}
          playing={isPlaying}
          onEnd={onEnd}
        />
      </Box>
      <Center>
        <ButtonGroup>
          <IconButton
            outline={"none"}
            variant="link"
            color={shuffle ? "white" : "gray.600"}
            aria-label="shuffle"
            fontSize={"24px"}
            icon={<MdShuffle />}
            onClick={() => setShuffle((prev) => !prev)}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="skip"
            fontSize="24px"
            icon={<MdSkipPrevious />}
            onClick={prevSong}
          />
          {isPlaying ? (
            <IconButton
              outline="none"
              variant="link"
              aria-label="pause"
              fontSize="40px"
              color="white"
              onClick={() => handlePlaying(false)}
              icon={<MdOutlinePauseCircleFilled />}
            />
          ) : (
            <IconButton
              outline="none"
              variant="link"
              aria-label="play"
              fontSize="40px"
              color="white"
              onClick={() => handlePlaying(true)}
              icon={<MdOutlinePlayCircleFilled />}
            />
          )}

          <IconButton
            outline="none"
            variant="link"
            aria-label="next"
            fontSize="24px"
            color={"white"}
            icon={<MdSkipNext />}
            onClick={nextSong}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="next"
            fontSize="24px"
            color={repeat ? "white" : "gray.600"}
            onClick={() => setRepeat((prev) => !prev)}
            icon={<MdOutlineRepeat />}
          />
        </ButtonGroup>
      </Center>
      <Box color={"gray.600"}>
        <Flex justify="center" align={"center"}>
          <Box width={"10%"}>
            <Text fontSize={"xs"}>{formatTime(seek)}</Text>
          </Box>
          <Box width={"80%"}>
            <RangeSlider
              aria-label={["min", "max"]}
              min={0}
              value={[seek]}
              max={duration ? duration.toFixed(2) : 0}
              step={0.1}
              onChange={onSeek}
              id="player-range"
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
            >
              <RangeSliderTrack bg={"gray.800"}>
                <RangeSliderFilledTrack bg={"gray.600"} />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width={"10%"} textAlign="right">
            <Text fontSize={"xs"}>{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export { Player };
