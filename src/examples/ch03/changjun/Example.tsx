import Tooltip1 from "./1_r";
import Tooltip2_1 from "./2-1_r";
import Tooltip2_2 from "./2-2_r";
import Tooltip2_2_1 from "./2-2-1_r";
import Tooltip2_3 from "./2-3_r";
import Tooltip3 from "./3_r";
import Tooltip4 from "./4_r";
import cx from "./cx";
import ViewportContextProvider from "./lib/viewportContext";

const Tooltips = () => {
	return (
		<div className={cx("Tooltips")} style={{ marginBottom: 200 }}>
			<h2>툴팁</h2>
			<Tooltip1 />
			<Tooltip2_1 />
			<Tooltip2_2 />
			<Tooltip2_2_1 />
			<Tooltip2_3 />
			{/* #3은 스크롤·리사이즈 정보를 구독해 위치를 재계산합니다.
			    Provider를 감싸지 않으면 useContext가 기본값(0)만 돌려주어
			    뒤집기 판정이 동작하지 않습니다. */}
			<ViewportContextProvider>
				<Tooltip3 />
			</ViewportContextProvider>
			<Tooltip4 />
		</div>
	);
};
export default Tooltips;
