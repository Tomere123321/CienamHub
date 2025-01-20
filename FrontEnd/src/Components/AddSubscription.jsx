// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// const AddSubscription = ({ closeModal, currentMemberId }) => {
//   const [members, setMembers] = useState([]);
//   const [movies, setMovies] = useState([]);

//   const [newSubscription, setNewSubscriptions] = useState({
//     memberId: currentMemberId || "",
//     movies: [
//       {
//         movieId: "",
//         date: "",
//       },
//     ],
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!newSubscription || !newSubscription.memberId || !newSubscription.movies[0].movieId || !newSubscription.movies[0].date) {
//       toast.error("Please fill all the fields");
//       return;
//     }

//     try {
//       const { data } = await axios.post(
//         "http://localhost:8000/subscriptions/add",
//         newSubscription
//       );
//       toast.success(data.message);
//       setNewSubscriptions({
//         memberId: "",
//         movies: [
//           {
//             movieId: "",
//             date: "",
//           },
//         ],
//       });
//       closeModal();
//     } catch (error) {
//       toast.error("Failed to add subscription");
//     }
//   };

//   useEffect(() => {
//     const getMembers = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:8000/members");
//         if (currentMemberId) {
//           data = data.find((member) => member._id === currentMemberId);
//           setMembers(currentMember ? [currentMember] : []);
//         }

//       } catch (error) {
//         toast.error("Failed to fetch members");
//       }
//     };

//     const getMovies = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:8000/movies");
//         setMovies(data);
//       } catch (error) {
//         toast.error("Failed to fetch movies");
//       }
//     };

//     getMembers();
//     getMovies();
//   }, []);

//   return (
//     <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
//       <h1 className="text-2xl font-bold mb-6 text-center">
//         Add Subscription Movie
//       </h1>

//       <div className="mb-4">
//         <label htmlFor="members" className="block text-sm font-medium mb-2">
//           Members{members.name}:
//         </label>
//         <select
//           id="members"
//           className="select select-bordered w-full"
//           onChange={(e) =>
//             setNewSubscriptions({
//               ...newSubscription,
//               memberId: e.target.value,
//             })
//           }
//         >
//           <option value="" disabled>
//             {members.length === 0 ? "Loading members..." : "Select a member"}
//           </option>
//           {members.map((member) => (
//             <option key={member._id} value={member._id}>
//               {member.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="mb-4">
//         <label htmlFor="movie" className="block text-sm font-medium mb-2">
//           Movies ({movies.length}):
//         </label>
//         <select
//           id="movie"
//           className="select select-bordered w-full"
//           onChange={(e) =>
//             setNewSubscriptions({
//               ...newSubscription,
//               movies: [
//                 {
//                   ...newSubscription.movies[0],
//                   movieId: e.target.value,
//                 },
//               ],
//             })
//           }
//         >
//           <option value="" disabled>
//             {movies.length === 0 ? "Loading movies..." : "Select a Movie"}
//           </option>
//           {movies.map((movie) => (
//             <option key={movie._id} value={movie._id}>
//               {movie.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="mb-4">
//         <label htmlFor="date" className="block text-sm font-medium mb-2">
//           Date:
//         </label>
//         <input
//           type="date"
//           id="date"
//           className="input input-bordered w-full"
//           value={newSubscription.movies[0].date ? new Date(newSubscription.movies[0].date).toISOString().split("T")[0] : ""}
//           onChange={(e) =>
//             setNewSubscriptions({
//               ...newSubscription,
//               movies: [
//                 {
//                   ...newSubscription.movies[0],
//                   date: new Date(e.target.value).toISOString(),
//                 },
//               ],
//             })
//           }
//         />
//       </div>

//       <div className="flex justify-between">
//         <button className="btn btn-error" onClick={closeModal}>
//           Cancel
//         </button>
//         <button className="btn btn-primary" onClick={handleSubmit}>
//           Subscribe
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddSubscription;

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddSubscription = ({ closeModal, currentMemberId }) => {
  const [members, setMembers] = useState([]);
  const [movies, setMovies] = useState([]);

  const [newSubscription, setNewSubscriptions] = useState({
    memberId: currentMemberId || "",
    movies: [
      {
        movieId: "",
        date: "",
      },
    ],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !newSubscription ||
      !newSubscription.memberId ||
      !newSubscription.movies[0].movieId ||
      !newSubscription.movies[0].date
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:8000/subscriptions/add",
        newSubscription
      );
      toast.success(data.message);
      setNewSubscriptions({
        memberId: currentMemberId || "",
        movies: [
          {
            movieId: "",
            date: "",
          },
        ],
      });
      closeModal();
    } catch (error) {
      toast.error("Failed to add subscription");
    }
  };

  useEffect(() => {
    const getMembers = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/members");
        if (currentMemberId) {
          const currentMember = data.find(
            (member) => member._id === currentMemberId
          );
          setMembers(currentMember ? [currentMember] : []);
        } else {
          setMembers(data);
        }
      } catch (error) {
        toast.error("Failed to fetch members");
      }
    };

    const getMovies = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/movies");
        setMovies(data);
      } catch (error) {
        toast.error("Failed to fetch movies");
      }
    };

    getMembers();
    getMovies();
  }, [currentMemberId]);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Add Subscription Movie
      </h1>

      <div className="mb-4">
        <label htmlFor="members" className="block text-sm font-medium mb-2">
          Member:
        </label>
        <select
          id="members"
          className="select select-bordered w-full"
          value={newSubscription.memberId}
          disabled={!!currentMemberId}
          onChange={(e) =>
            setNewSubscriptions({
              ...newSubscription,
              memberId: e.target.value,
            })
          }
        >
          {members.map((member) => (
            <option key={member._id} value={member._id}>
              {member.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="movie" className="block text-sm font-medium mb-2">
          Movies:
        </label>
        <select
          id="movie"
          className="select select-bordered w-full"
          onChange={(e) =>
            setNewSubscriptions({
              ...newSubscription,
              movies: [
                {
                  ...newSubscription.movies[0],
                  movieId: e.target.value,
                },
              ],
            })
          }
        >
          <option value="" disabled>
            {movies.length === 0 ? "Loading movies..." : "Select a Movie"}
          </option>
          {movies.map((movie) => (
            <option key={movie._id} value={movie._id}>
              {movie.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium mb-2">
          Date:
        </label>
        <input
          type="date"
          id="date"
          className="input input-bordered w-full"
          value={
            newSubscription.movies[0].date
              ? new Date(newSubscription.movies[0].date)
                  .toISOString()
                  .split("T")[0]
              : ""
          }
          onChange={(e) =>
            setNewSubscriptions({
              ...newSubscription,
              movies: [
                {
                  ...newSubscription.movies[0],
                  date: new Date(e.target.value).toISOString(),
                },
              ],
            })
          }
        />
      </div>

      <div className="flex justify-between">
        <button className="btn btn-error" onClick={closeModal}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default AddSubscription;
