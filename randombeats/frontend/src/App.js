import Youtube from "./components/Youtube";

function App() {
  return (
    <div className="flex h-screen justify-center align-middle flex-col">
      <div className="flex justify-center">
        <div className="text-center">
          <div>CS430P Final</div>
          <div>
            <Youtube />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
