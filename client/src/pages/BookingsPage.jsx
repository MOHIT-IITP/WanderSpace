import { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav.jsx";
import axios from "axios";
import PlaceImg from "../components/PlaceImg.jsx";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";
import BookingDates from "../components/BookingDate.jsx";
import Footer from "../components/Footer.jsx";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios
      .get("/bookings")
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.log("Error hai bhai ", error);
      });
  }, []);
  return (
    <div>
      <AccountNav />
      <div className="min-h-96">
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              key={booking._id}
              className="flex gap-8 mt-4 bg-gray-200 rounded-2xl"
            >
              <div className="w-48">
                <PlaceImg place={booking.place} />
              </div>
              <div className="grow pr-3 ">
                <h2 className=" mt-2 font-semibold text-2xl">
                  {booking.place.title}
                </h2>
                <div className="py-2 text-xl gap-3">
                  <BookingDates
                    booking={booking}
                    className="mb-2 mt-4 text-gray-500 font-thin"
                  />
                  <div className="flex gap-1">
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
                        d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    Total Price: ₹{booking.price}
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <Footer />
    </div>
  );
}
