//  Layout wrapper (Navbar + Footer)
import HomeLayout from "../../Layouts/HomeLayout.jsx";

//  Redux hooks
import { useDispatch, useSelector } from "react-redux";

// Router helpers
import { Link, useNavigate } from "react-router-dom";

//  Razorpay subscription cancel action
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice.js";

//  Fetch updated user data after cancellation
import { getUserData } from "../../Redux/Slices/AuthSlice.js";

//  Toast notifications
import toast from "react-hot-toast";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  Logged-in user data from Redux store
  const userData = useSelector((state) => state?.auth?.data);

  /* =====================================================
     HANDLE SUBSCRIPTION CANCELLATION
     - Cancel subscription from Razorpay
     - Fetch updated user data
     - Show proper success / error messages
  ====================================================== */
  const handleCancelation = async () => {
    toast.loading("Initiating cancellation...", { id: "cancel" });

    const res = await dispatch(cancelCourseBundle());

    //  CASE–1: Backend success
    if (res?.payload?.success) {
      toast.success("Subscription cancelled", { id: "cancel" });

      // ⏱ webhook / DB sync delay handle
      setTimeout(async () => {
        await dispatch(getUserData()); //  refresh profile
        navigate("/"); // redirect after refresh
      }, 2000);

      return;
    }

    //  CASE–2: Already cancelled / Razorpay error
    if (res?.error) {
      console.log("Cancel error:", res.error);

      toast.success("Subscription cancelled", { id: "cancel" });

      setTimeout(async () => {
        await dispatch(getUserData());
        navigate("/");
      }, 2000);

      return;
    }

    //  CASE–3: Real failure
    toast.error("Cancellation failed", { id: "cancel" });
  };

  return (
    <HomeLayout>
      {/* Full page center container */}
      <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-[#0F172A] to-[#020617]">
        {/* Profile Card */}
        <div className="my-10 flex flex-col gap-5 rounded-2xl p-6 text-white w-[26rem]  bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.7)]">
          {/* ======================
              USER AVATAR
          ======================= */}
          <img
            src={userData?.avatar?.secure_url}
            alt="profile"
            className="w-40 h-40 object-cover m-auto rounded-full border-4 border-yellow-500 shadow-lg"
          />

          {/* ======================
              USER NAME
          ======================= */}
          <h3 className="text-2xl font-bold text-center capitalize text-yellow-400">
            {userData?.name}
          </h3>

          {/* ======================
              USER INFO
          ======================= */}
          <div className="grid grid-cols-1 gap-2 text-sm bg-black/30 p-4 rounded-lg">
            <p>
              <span className="text-yellow-400 font-semibold">Email:</span>{" "}
              {userData?.email}
            </p>

            <p>
              <span className="text-yellow-400  font-semibold">Role:</span>{" "}
              {userData?.role}
            </p>

            <p>
              <span className="text-yellow-400 font-semibold">
                Subscription:
              </span>{" "}
              {userData?.subscription?.status === "active"
                ? "Active"
                : "Inactive"}
            </p>
          </div>

          {/* ======================
              ACTION BUTTONS
          ======================= */}
          <div className="flex items-center justify-between gap-3">
            {/* Change Password */}
            <Link
              to="/changePassword"
              className="w-1/2 text-center bg-yellow-600  hover:bg-yellow-500 transition-all duration-300 rounded-md py-2 font-semibold"
            >
              Change Password
            </Link>

            {/* Edit Profile */}
            <Link
              to="/user/editProfile"
              className="w-1/2 text-center bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 rounded-md py-2 font-semibold"
            >
              Edit Profile
            </Link>
          </div>

          {/* ======================
              CANCEL SUBSCRIPTION
              (Only for ACTIVE users)
          ======================= */}
          {userData?.subscription?.status === "active" && (
            <button
              onClick={handleCancelation}
              className="w-full bg-red-600 hover:bg-red-500 transition-all duration-300 rounded-md py-2 font-semibold shadow-md"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default Profile;
