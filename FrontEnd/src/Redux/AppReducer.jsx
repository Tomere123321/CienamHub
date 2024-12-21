const initialState = {
  movies: [],
  members: [],
  users: [],
  subscriptions: [],
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MOVIES":
      return { ...state, movies: action.payload };

    case "UPDATE_MOVIE": {
      const updateMovie = action.payload;
      const newData = state.movies.map((movie) =>
        movie._id === updateMovie._id ? { ...movie, ...updateMovie } : movie
      );
      return { ...state, movies: newData };
    }

    case "ADD_MOVIE": {
      const newMovie = action.payload;
      return { ...state, movies: [...state.movies, newMovie] };
    }

    case "DELETE_MOVIE": {
      const movieId = action.payload;
      const updatedMovies = state.movies.filter(
        (movie) => movie._id !== movieId
      );
      return { ...state, movies: updatedMovies };
    }

    case "GET_MEMBERS":
      return { ...state, members: action.payload };

    case "UPDATE_MEMBER": {
      const updateMember = action.payload;
      const newData = state.members.map((member) =>
        member._id === updateMember._id
          ? { ...member, ...updateMember }
          : member
      );
      return { ...state, members: newData };
    }

    case "ADD_MEMBER": {
      const newMember = action.payload;
      return { ...state, members: [...state.members, newMember] };
    }

    case "DELETE_MEMBER": {
      const memberId = action.payload;
      const updatedMembers = state.members.filter(
        (member) => member._id !== memberId
      );
      return { ...state, members: updatedMembers };
    }

    case "GET_SUBSCRIPTIONS":
      return { ...state, subscriptions: action.payload };

    case "ADD_SUBSCRIPTION": {
      const newSubscription = action.payload;
      const addToMember = state.subscriptions.find(
        (sub) => sub.memberId === newSubscription.memberId
      );
      if (addToMember) {
        const updateSubscriptions = state.subscriptions.map((sub) =>
          sub.memberId === newSubscription.memberId
            ? { ...sub, ...newSubscription }
            : sub
        );
        return { ...state, subscriptions: updateSubscriptions };
      }
      return {
        ...state,
        subscriptions: [...state.subscriptions, newSubscription],
      };
    }

    case "DELETE_SUBSCRIPTION": {
      const subscriptionId = action.payload;
      const updatedSubscriptions = state.subscriptions.filter(
        (subscription) => subscription._id !== subscriptionId
      );
      return { ...state, subscriptions: updatedSubscriptions };
    }

    case "GET_USERS":
      return { ...state, users: action.payload };

    case "UPDATE_USER": {
      const updatedUser = action.payload;
      const updatedUsers = state.users.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      );
      return { ...state, users: updatedUsers };
    }

    case "ADD_USER": {
      const newUser = action.payload;
      return { ...state, users: [...state.users, newUser] };
    }

    case "DELETE_USER": {
      const userId = action.payload;
      const updatedUsers = state.users.filter((user) => user.id !== userId);
      return { ...state, users: updatedUsers };
    }

    default:
      return state;
  }
};

export default AppReducer;
