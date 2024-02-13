import styled from "styled-components";

const StyledBarBorder = styled.div`
  height: 20px;
  border-radius: 50px;
  border: 2px solid #8382ff;
  margin-right: 40px;
  margin-left: 40px;
  justify-content: center;
  position: relative;

  margin-top: 40px;
`;

const StyledLength = styled.div`
  width: ${({ width }) => `${width}%`};
  height: 20px;
  background: #8382ff;
  border-radius: 50px 0 0 50px;
`;

const ExpText = styled.div`
  position: absolute;
  left: ${({ width }) => `${width}%`};
  bottom: 100%;
  color: white;
  font-size: 15px;
  background-color: #8382ff;
  border-radius: 50px; 
  padding: 2px 10px 4px;
  transform: translateX(-50%);
  margin: 20px 0; 

  margin-top: 40px;

  &::after { // 말풍선의 꼬리 부분을 만듭니다.
    content: '';
    position: absolute;
    top: 100%;
    left: 40%;
    border-width: 10px;
    border-style: solid;
    border-color: #8382ff transparent transparent transparent;
    
  }
`;


const ExpBar = ({ exp }) => {
  const tmp = exp;
  const ratio = parseInt(tmp % 100);

  return (
    <StyledBarBorder>
      <StyledLength width={ratio} />
      <ExpText width={ratio}>{exp} EXP</ExpText>
    </StyledBarBorder>
  );
};

export default ExpBar;
