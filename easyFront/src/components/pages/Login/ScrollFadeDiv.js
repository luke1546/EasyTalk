import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const TmpDiv = styled.div.attrs((props) => ({
  style: {
    opacity: props.opacity,
  },
}))`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`;

const ScrollFadeDiv = ({ children, isSearched }) => {
  const divRef = useRef(null);
  const [opacity, setOpacity] = useState(1);
  const [observer, setObserver] = useState(null);

  const resetObserver = async () => {
    await new Promise((resolve) => {
      if (observer) {
        observer.disconnect();
        resolve();
      } else {
        resolve();
      }
    });
    const newObserver = new IntersectionObserver(
      ([entry]) => {
        if (divRef.current) {
          const rect = divRef.current.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > window.innerHeight) {
            // TmpDiv가 완전히 뷰포트를 벗어났을 때 opacity를 0으로 설정
            setOpacity(0);
          } else if (rect.bottom < window.innerHeight) {
            // TmpDiv의 하단 부분이 뷰포트를 벗어나는 경우 opacity를 줄임
            setOpacity(rect.bottom / window.innerHeight);
          } else {
            // 그 외의 경우 opacity를 1로 설정
            setOpacity(1);
          }
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: Array.from({ length: 100 }, (_, i) => i / 100),
      }
    );
    if (divRef.current) {
      newObserver.observe(divRef.current);
    }
    setObserver(newObserver);
  };

  useEffect(() => {
    resetObserver().then(() => {
      setOpacity(1);
    });

    const mutationObserver = new MutationObserver((mutations) => {
      resetObserver();
    });
    mutationObserver.observe(divRef.current, { childList: true, subtree: true });

    return () => mutationObserver.disconnect();
  }, [isSearched]);

  return (
    <TmpDiv ref={divRef} opacity={opacity}>
      {children}
    </TmpDiv>
  );
};

export default ScrollFadeDiv;
