import LineClamp1 from "./1_r";
import LineClamp2 from "./2_r";
import LineClamp3 from "./3_r";
import LineClamp4 from "./4_v";
import cx from "./cx";
import ViewportContextProvider from "./lib/viewportContext";

const LineClamps = () => {
  return (
    <div className={cx("LineClamps")} style={{ marginBottom: 200 }}>
      <h2>말줄임</h2>
      {/* #1~#3은 뷰포트 너비를 구독해 줄 수를 다시 잽니다.
          Provider를 감싸지 않으면 useContext가 기본값(0)만 돌려주고,
          `if (!viewportWidth) return`에 걸려 측정이 한 번도 일어나지 않습니다. */}
      <ViewportContextProvider>
        <LineClamp1 />
        <LineClamp2 />
        <LineClamp3 />
      </ViewportContextProvider>
      {/* #4는 React Context 대신 자체 Observer를 쓰므로 Provider 밖에 둡니다. */}
      <LineClamp4 />
    </div>
  );
};
export default LineClamps;
