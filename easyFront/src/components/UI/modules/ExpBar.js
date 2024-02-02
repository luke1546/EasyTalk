import styled from "styled-components";

const StyledBarBorder = styled.div`
  height: 20px;
  border: 1px solid;
  margin-right: 15%;
  margin-left: 15%;
  justify-content: center;
`;

const StyledLength = styled.div`
  width: ${({ width }) => `${width}%`}; // 값을 받아서 %로 바꾸어 설정해준다.
  height: 20px;
  background: black;
`;
const ExpBar = ({ exp }) => {
  const tmp = exp;
  const ratio = parseInt(tmp % 100);

  return (
    <StyledBarBorder>
      <StyledLength width={ratio} />
    </StyledBarBorder>
  );
};

export default ExpBar;
