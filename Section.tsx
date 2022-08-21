import { forwardRef, ForwardedRef, SetStateAction, Dispatch } from "react";
import styled from "styled-components";
import { Card } from "./Card";

interface SectionProps {
  updateAppContainer: Dispatch<
    SetStateAction<{ fullscreen: boolean; offset: number }>
  >;
  colorScheme: { primary: string; secondary: string };
  title: string;
  data: Array<{ source: string; type: string; notes: string }>;
}

export const Section = forwardRef(
  (
    { updateAppContainer, colorScheme, title, data }: SectionProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <SectionWrapper ref={ref} color={colorScheme.primary}>
        <Title>{title}</Title>
        <List>
          {data.map((entry, i) => {
            return (
              <Card
                {...entry}
                key={entry.source + String(i)}
                updateAppContainer={updateAppContainer}
                colorScheme={colorScheme}
              />
            );
          })}
        </List>
      </SectionWrapper>
    );
  }
);

const SectionWrapper = styled.section<{ color: string }>`
  width: 100%;
  color: ${({ color }) => color};
`;

const Title = styled.div`
  margin-bottom: 20px;
  font-size: 40px;

  @media (max-width: 800px) {
    margin-left: 7%;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-self: center;
`;
