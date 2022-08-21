import styled, { css } from "styled-components";
import { createRef, useEffect, useState } from "react";
import { Section } from "./Section";
import data from "./data.json";

export const App = () => {
  const [containerProps, setContainerProps] = useState({
    fullscreen: false,
    offset: 0,
  });

  const [bgHeight, setBgHeight] = useState(window.innerHeight);

  const sectionRef = createRef<HTMLDivElement>();

  const updateBackground = () => {
    const scrollHeight = sectionRef.current?.scrollHeight || 0;
    const parent = sectionRef.current?.offsetParent as HTMLDivElement;
    const offset = parent.offsetTop || 0;
    setBgHeight(scrollHeight + offset + 40);
  };

  useEffect(() => {
    window.addEventListener("resize", updateBackground);
    return () => window.removeEventListener("resize", updateBackground);
  }, [updateBackground]);

  useEffect(() => {
    updateBackground();
  }, [sectionRef.current, containerProps, containerProps.fullscreen]);

  return (
    <>
      <Background height={bgHeight} />
      <AppContainer {...containerProps}>
        <Section
          ref={sectionRef}
          updateAppContainer={setContainerProps}
          colorScheme={{ primary: "#cfcfcf", secondary: "#1d1d1d" }}
          title="Use Cases:"
          data={data.useCases}
        />
        <Section
          updateAppContainer={setContainerProps}
          colorScheme={{ primary: "#1d1d1d", secondary: "#cfcfcf" }}
          title="Prototypes:"
          data={data.protoTypes}
        />
      </AppContainer>
    </>
  );
};

const Background = styled.div<{ height?: number }>`
  width: 100%;
  background: #1d1d1d;
  height: ${({ height }) => `${height}px`};
  position: absolute;
`;

const AppContainer = styled.div<{ fullscreen?: boolean; offset: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5% 0;
  gap: 100px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding-bottom: 5%;
  width: 80%;
  max-width: 1200px;
  min-width: 800px;
  overflow: hidden;

  ${({ fullscreen, offset }) =>
    fullscreen &&
    css`
      width: 100%;
      max-width: 100%;
      min-width: 100%;
      margin: 0;
      height: 100%;
      top: ${offset}px;
    `}

  @media (max-width: 800px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`;
