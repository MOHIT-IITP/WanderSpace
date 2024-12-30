import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function AccountNav() {
  const {pathname} = useLocation();
    let subpage = pathname.split("/")?.[2];
    if(subpage === "undefined"){
        subpage = "profile";
    }
  function linkClasses(type = null) {
    let classes = "inline-flex gap-1 py-2 px-6 rounded-full";
    if (type === subpage) {
      classes += " bg-primary";
    } else {
      classes += " bg-gray-200";
    }
    return classes;
  }

  return (
    <>
      <nav className="w-full flex mt-4 gap-4 justify-center mb-9">
        <Link className={linkClasses("profile")} to={"/account"}>
          {" "}
          My Profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          {" "}
          My bookings
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          {" "}
          My accomodations
        </Link>
      </nav>
    </>
  );
}