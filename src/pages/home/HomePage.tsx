import { CellGrid } from "./components/CellGrid";
import AddOrEditPanel from "../../shared.components/AddOrEditPanel";

export const HomePage = () => {
  return (
      <div>
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
