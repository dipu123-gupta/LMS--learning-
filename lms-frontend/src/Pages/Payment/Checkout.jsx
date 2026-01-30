import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BiRupee } from "react-icons/bi";
import toast from "react-hot-toast";

import HomeLayout from "../../Layouts/HomeLayout.jsx";

// Razorpay actions
import {
  getRazorpayId,
  purchaseCourseBundle,
  verifyUserPayment,
} from "../../Redux/Slices/RazorpaySlice.js";

// Refresh user after payment
import { getUserData } from "../../Redux/Slices/AuthSlice.js";

// const Checkout = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { state } = useLocation();

//   // courseId from CourseDescription
//   const courseId = state?.courseId;

//   // Razorpay key
//   const razorpayKey = useSelector((state) => state?.razorpay?.key);

//   // Logged-in user
//   const user = useSelector((state) => state?.auth?.data);

//   // ORDER DATA (IMPORTANT)
//   const [orderData, setOrderData] = useState(null);

//   /* =========================
//      INITIAL LOAD
//   ========================== */
//   useEffect(() => {
//     if (!courseId) {
//       toast.error("Invalid course selection");
//       navigate("/");
//       return;
//     }

//     (async () => {
//       await dispatch(getRazorpayId());

//       const res = await dispatch(
//         purchaseCourseBundle({ courseId })
//       );

//       if (res?.payload?.success) {
//         setOrderData(res.payload);
//       } else {
//         toast.error("Payment initialization failed");
//       }
//     })();
//   }, [courseId, dispatch, navigate]);

//   /* =========================
//      HANDLE PAYMENT
//   ========================== */
//   const handleSubscription = async (e) => {
//     e.preventDefault();

//     if (!razorpayKey || !orderData?.order) {
//       toast.error("Payment initialization failed");
//       return;
//     }

//     const options = {
//       key: razorpayKey,
//       amount: orderData.order.amount,
//       currency: "INR",
//       name: "Coursify Pvt Ltd",
//       description: "Course Purchase",
//       order_id: orderData.order.id,

//       theme: {
//         color: "#facc15",
//       },

//       prefill: {
//         name: user?.name,
//         email: user?.email,
//       },

//       handler: async (response) => {
//         const paymentDetails = {
//           razorpay_payment_id: response.razorpay_payment_id,
//           razorpay_order_id: response.razorpay_order_id,
//           razorpay_signature: response.razorpay_signature,
//           courseId,
//           amount: orderData.amount,
//         };

//         const res = await dispatch(
//           verifyUserPayment(paymentDetails)
//         );

//         if (res?.payload?.success) {
//           toast.success("Payment successful 🎉");

//           await dispatch(getUserData());
//           navigate("/checkout/success", {
//             state: { courseId },
//           });
//         } else {
//           toast.error("Payment verification failed");
//         }
//       },

//       modal: {
//         ondismiss: () => {
//           toast.error("Payment cancelled");
//         },
//       },
//     };

//     const razorpay = new window.Razorpay(options);
//     razorpay.open();
//   };

//   return (
//     <HomeLayout>
//       <form
//         onSubmit={handleSubscription}
//         className="min-h-[90vh] flex items-center justify-center text-white"
//       >
//         <div className="w-80 h-[27rem] flex flex-col justify-between rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
          
//           {/* HEADER */}
//           <h1 className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-center py-4 text-2xl font-extrabold text-black">
//             Course Checkout
//           </h1>

//           {/* CONTENT */}
//           <div className="px-5 py-4 space-y-4 text-center">
//             <p className="text-sm text-gray-200">
//               You are purchasing access to this course.
//               <br />
//               <span className="text-yellow-400 font-semibold">
//                 Lifetime access included
//               </span>
//             </p>

//             <p className="flex items-center justify-center gap-1 text-3xl font-extrabold text-yellow-400">
//               <BiRupee />
//               <span>{orderData?.amount || 0}</span>
//             </p>

//             <div className="text-xs text-gray-400">
//               <p>✔ One-time payment</p>
//               <p>✔ Full course access</p>
//               <p>✔ No auto-renewal</p>
//             </div>
//           </div>

//           {/* BUTTON */}
//           <button
//             type="submit"
//             className="w-full py-3 text-xl font-bold bg-yellow-400 text-black hover:bg-yellow-500 transition-all"
//           >
//             Pay Now 🚀
//           </button>
//         </div>
//       </form>
//     </HomeLayout>
//   );
// };


const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const courseId = state?.courseId;
  const razorpayKey = useSelector((state) => state?.razorpay?.key);
  const user = useSelector((state) => state?.auth?.data);

  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (!courseId) {
      toast.error("Invalid course selection");
      navigate("/");
      return;
    }

    (async () => {
      await dispatch(getRazorpayId());

      const res = await dispatch(purchaseCourseBundle({ courseId }));

      if (res?.payload?.success) {
        setOrderData(res.payload);
      } else {
        toast.error("Payment initialization failed");
      }
    })();
  }, [courseId, dispatch, navigate]);

  const handleSubscription = async (e) => {
    e.preventDefault();

    if (!razorpayKey || !orderData?.order) {
      toast.error("Payment initialization failed");
      return;
    }

    const options = {
      key: razorpayKey,
      amount: orderData.order.amount,
      currency: "INR",
      name: "Coursify Pvt Ltd",
      description: "Course Purchase",
      order_id: orderData.order.id,
      theme: { color: "#facc15" },
      prefill: {
        name: user?.name,
        email: user?.email,
      },
      handler: async (response) => {
        const paymentDetails = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          courseId,
          amount: orderData.amount,
        };

        const res = await dispatch(verifyUserPayment(paymentDetails));

        if (res?.payload?.success) {
          toast.success("Payment successful 🎉");
          await dispatch(getUserData());
          navigate("/checkout/success", { state: { courseId } });
        } else {
          toast.error("Payment verification failed");
        }
      },
      modal: {
        ondismiss: () => toast.error("Payment cancelled"),
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <HomeLayout>
      <form
        onSubmit={handleSubscription}
        className="min-h-[90vh] flex items-center justify-center px-4 text-white bg-gradient-to-br from-[#0F172A] to-[#020617]"
      >
        <div
          className="
            w-full max-w-xs sm:max-w-sm
            h-[26rem] sm:h-[27rem]
            flex flex-col justify-between
            rounded-2xl overflow-hidden
            bg-white/5 backdrop-blur-md
            border border-white/10
            shadow-xl
          "
        >
          {/* HEADER */}
          <h1
            className="
              bg-gradient-to-r from-yellow-400 to-yellow-500
              text-center
              py-3 sm:py-4
              text-xl sm:text-2xl
              font-extrabold
              text-black
            "
          >
            Course Checkout
          </h1>

          {/* CONTENT */}
          <div className="px-4 sm:px-5 py-4 space-y-4 text-center">
            <p className="text-xs sm:text-sm text-gray-200">
              You are purchasing access to this course.
              <br />
              <span className="text-yellow-400 font-semibold">
                Lifetime access included
              </span>
            </p>

            <p className="flex items-center justify-center gap-1 text-2xl sm:text-3xl font-extrabold text-yellow-400">
              <BiRupee />
              <span>{orderData?.amount || 0}</span>
            </p>

            <div className="text-[11px] sm:text-xs text-gray-400 space-y-1">
              <p>✔ One-time payment</p>
              <p>✔ Full course access</p>
              <p>✔ No auto-renewal</p>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="
              w-full py-2.5 sm:py-3
              text-lg sm:text-xl
              font-bold
              bg-yellow-400 text-black
              hover:bg-yellow-500
              transition-all
            "
          >
            Pay Now 🚀
          </button>
        </div>
      </form>
    </HomeLayout>
  );
};


export default Checkout;
