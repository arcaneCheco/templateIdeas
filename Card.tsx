import { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";
import styled, { css } from "styled-components";
import { GiExpander } from "react-icons/gi";
import { FaPlay } from "react-icons/fa";

export const Card = ({
  source,
  type,
  notes,
  updateAppContainer,
  colorScheme,
}: {
  source: string;
  type: string;
  notes: string;
  updateAppContainer: Dispatch<
    SetStateAction<{ fullscreen: boolean; offset: number }>
  >;
  colorScheme: { primary: string; secondary: string };
}) => {
  const disablePageScroll = () => {
    document.body.classList.add("noScroll");
  };
  const enablePageScroll = () => {
    document.body.classList.remove("noScroll");
  };

  const iframe = useRef<HTMLIFrameElement>(null);

  const [isIdle, setIsIdle] = useState(true);

  const [fullscreen, setFullscreen] = useState(false);

  const launchSite = () => {
    iframe.current && (iframe.current.src = source);
    setIsIdle(false);
  };

  useEffect(() => {
    updateAppContainer({ fullscreen, offset: window.scrollY });
  }, [fullscreen]);

  return (
    <CardWrapper>
      <Box
        fullscreen={fullscreen}
        color={colorScheme.secondary}
        color2={colorScheme.primary}
      >
        <iframe
          src=""
          allowFullScreen={true}
          onMouseEnter={disablePageScroll}
          onMouseLeave={enablePageScroll}
          ref={iframe}
        ></iframe>
        {!isIdle && (
          <ToggleFullscreen onClick={() => setFullscreen(!fullscreen)} />
        )}
        {isIdle && (
          <PlayOverlay onClick={launchSite} color={colorScheme.primary} />
        )}
      </Box>
      <Box color={colorScheme.secondary} color2={colorScheme.primary}>
        <InfoWrapper>
          <InfoItem>
            <InfoItemHeader>Type:</InfoItemHeader>
            {type}
          </InfoItem>
          <InfoItem>
            <InfoItemHeader>
              <SourceLink href={source} target="_blank">
                Source &#128279;
              </SourceLink>
            </InfoItemHeader>
          </InfoItem>
          <InfoItem>
            <InfoItemHeader>Notes:</InfoItemHeader>
            <NotesWrapper>
              {notes.split(/\r?\n|\r|\n/g).map((line, i) => (
                <Note key={(i + Math.random().toFixed(3)).toString()}>
                  {line}
                </Note>
              ))}
            </NotesWrapper>
          </InfoItem>
        </InfoWrapper>
      </Box>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 400px;
  gap: 20px;

  @media (max-width: 800px) {
    flex-direction: column;
    height: 800px;
  }
`;

const InfoWrapper = styled.ul`
  width: 100%;
  height: 100%;
  padding: 10%;
`;

const InfoItemHeader = styled.p`
  display: inline-block;
  font-weight: bold;
  margin-right: 8px;
`;

const InfoItem = styled.li`
  margin: 10px 0;
`;

const SourceLink = styled.a`
  pointer-events: all;
  text-decoration: none;
  color: inherit;
`;

const NotesWrapper = styled.ul`
  padding-left: 15px;
`;

const Note = styled.li``;

const PlayOverlay = styled(FaPlay)<{ color: string }>`
  position: absolute;
  width: auto;
  height: 30%;
  color: ${({ color }) => color};
  z-index: 5;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  pointer-events: all;
`;

const ToggleFullscreen = styled(GiExpander)`
  color: white;
  position: absolute;
  left: 0;
  top: 0;
  margin: 5px;
  height: 40px;
  width: 40px;
  z-index: 2;
  pointer-events: all;
  cursor: pointer;
  background: #12121244;
`;

const Box = styled.div<{ fullscreen?: boolean; color: string; color2: string }>`
  width: 50%;
  height: 100%;
  position: relative;
  pointer-events: none;
  background-color: ${({ color }) => color};
  border: 1px solid ${({ color2 }) => color2};

  ${({ fullscreen }) =>
    fullscreen &&
    css`
      width: 100vw;
      height: 100vh;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 10;
    `}
  & > iframe {
    width: 100%;
    height: 100%;
    z-index: 1;
    display: block;
    pointer-events: all;
  }

  @media (max-width: 800px) {
    align-self: center;
    width: 86%;
  }
`;
