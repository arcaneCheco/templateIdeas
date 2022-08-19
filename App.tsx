import styled from "styled-components";

export const App = () => {
  return (
    <AppContainer>
      <Section id="useCases">
        <Title>Use Cases:</Title>
        <List>
          <Card>
            <Box>
              <iframe
                src="https://activetheory.net/work"
                allowFullScreen={true}
              ></iframe>
            </Box>
            <Box></Box>
          </Card>
          <Card>
            <Box></Box>
            <Box></Box>
          </Card>
          <Card>
            <Box></Box>
            <Box></Box>
          </Card>
        </List>
      </Section>
      <Section id="prototypes">
        <Title>Prototypes:</Title>
        <List>
          <Card>
            <Box></Box>
            <Box></Box>
          </Card>
          <Card>
            <Box></Box>
            <Box></Box>
          </Card>
          <Card>
            <Box></Box>
            <Box></Box>
          </Card>
        </List>
      </Section>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5% 0;
  gap: 50px;
  width: 80%;
  max-width: 1200px;
  min-width: 800px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid black;
  overflow: hidden;
`;

const Section = styled.section`
  width: 100%;
`;

const Title = styled.div`
  margin-bottom: 20px;
  font-size: 40px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1px solid red;
  align-self: center;
`;

const Card = styled.div`
  width: 100%;
  display: flex;
  height: 400px;
  gap: 20px;
  border: 1px solid green;
`;

const Box = styled.div`
  width: 50%;
  height: 100%;
  border: 1px solid blue;
`;
