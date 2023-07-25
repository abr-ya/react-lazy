import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { IItem, useFetch } from "./hooks/useFetch";

const App = () => {
  const [data, setData] = useState<IItem[]>([]);
  const [page, setPage] = useState(1);

  const { data: resData, loading } = useFetch("https://jsonplaceholder.typicode.com/todos/", page);

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (data && inView) setPage((prev) => prev + 1);
  }, [inView]);

  useEffect(() => {
    if (resData) setData((prev) => [...prev, ...resData]);
  }, [resData]);

  return (
    <div className="min-h-screen bg-green-200 p-2">
      <div className="min-h-screen">
        {data &&
          data.map(({ id, title }) => (
            <div key={id} className="bg-white p-2 mb-1 rounded-md">
              {`${id} - ${title}`}
            </div>
          ))}
      </div>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className="h-5 bg-red-300" ref={ref}>
          end
        </div>
      )}
    </div>
  );
};

export default App;
