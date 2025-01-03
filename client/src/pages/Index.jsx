import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer.jsx";
export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <>
      <div>
        <div className="flex justify-center items-center absolute  top-2 ml-[43%] mr-[40%]">
          <button className="bg-primary rounded-full p-1 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
          <input
            className="!rounded-full"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Any Where"
            type="text"
          />
        </div>
      </div>
      <div className=" mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {places.length > 0 &&
          places
            .filter((it) => {
              return search.toLowerCase() === ""
                ? it
                : it.address.toLowerCase().includes(search.toLowerCase());
            })
            .map((place) => (
              <Link to={"/place/" + place._id}>
                <div className="bg-gray-500 flex rounded-2xl ">
                  {place.photos?.[0] && (
                    <img
                      className="rounded-2xl aspect-square object-cover"
                      src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                      alt=""
                    />
                  )}
                </div>
                <div>
                  <h3 className="font-bold">{place.address}</h3>
                  <h2 className="text-gray-600">{place.title}</h2>
                  <div className="mt-2">
                    <span className="font-bold mr-1">₹{place.price}</span>
                    per night
                  </div>
                </div>
              </Link>
            ))}
      </div>
      <Footer />
    </>
  );
}
