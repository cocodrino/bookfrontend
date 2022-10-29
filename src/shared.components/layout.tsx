// eslint-disable-next-line react/prop-types
export const Layout: React.FC<any> = ({ children }) => {
  return (
    <div className="App w-full h-screen bg-slate-100">
      <div className="w-full bg-slate-900 h-20 flex items-center justify-between px-4">
        <div>
          <span className="text-2xl text-slate-300 ml-3">ZAREGO</span>
          <span className="text-lg text-slate-500 ml-1">Book Store</span>
        </div>
        <div>
          <button className="text-lg py-3 px-4 bg-amber-400 hover:cursor-pointer">
            Add New Book
          </button>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};
