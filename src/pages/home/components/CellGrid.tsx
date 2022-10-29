export const CellGrid = () => {
  return (
    <div
      className="
    p-1 bg-slate-50 flex flex-col items-center hover:underline subpixel-antialiased 
    pt-5 pb-5 hover:cursor-pointer"
    >
      <img src="https://via.placeholder.com/150x150.png" alt="book-image" />
      <span className="mt-3 text-2xl text-slate-700">xxxx</span>
      <span className="text-sm text-slate-400">
        by: <span className="text-slate-600">xxxxx</span>
      </span>
    </div>
  );
};
