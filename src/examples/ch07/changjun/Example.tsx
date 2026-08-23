import ViewportContextProvider from "@/context/viewportContext";
import LazyLoading1 from "./1_r";
import LazyLoading2 from "./2_r";
import LazyLoading3 from "./3_v";
import LazyLoading4 from "./4_r";

const LazyLoadingExamples = () => (
  <ViewportContextProvider>
    <LazyLoading1 />
    <LazyLoading2 />
    <LazyLoading3 />
    <LazyLoading4 />
  </ViewportContextProvider>
);

export default LazyLoadingExamples;
