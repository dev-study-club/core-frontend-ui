import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

const SingleOpenContext = createContext<
  [string | null, Dispatch<SetStateAction<string | null>>]
>([null, () => {}]);

const SingleOpenProvider = ({ children }: { children: React.ReactNode }) => {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <SingleOpenContext.Provider value={[openId, setOpenId]}>
      {children}
    </SingleOpenContext.Provider>
  );
};
export default SingleOpenProvider;

export const useSingleOpen = (id: string) => {
  const [currentId, dispatch] = useContext(SingleOpenContext);
  return [id === currentId, dispatch] as const;
};
