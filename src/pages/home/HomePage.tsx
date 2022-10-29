import { CellGrid } from "./components/CellGrid";
import AddPanel from "./components/AddPanel";

export const HomePage = () => {
  return (
      <div>
        <AddPanel/>
        <div className="mx-10 mt-4 grid grid-cols-8 gap-2">
          {Array(20)
              .fill(true)
              .map((v, i) => (
                  <CellGrid key={`cg-${i}`} />
              ))}
        </div>
      </div>

  );
};
