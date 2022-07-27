const initialState = {
  pokemons: [],
  pokemons2: [],
  types: [],
  detail: {},
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case "GET_ALL_POKEMONS":
      return {
        ...state,
        pokemons: payload,
        pokemons2: payload,
      };

    case "GET_ALL_TYPES":
      return {
        ...state,
        types: payload,
      };

    case "GET_NAME":
      let nombres =
        payload === ""
          ? state.pokemons2
          : state.pokemons2.filter((e) =>
              e.name.toLowerCase().includes(payload.toLowerCase())
            );
      return {
        ...state,
        pokemons: nombres,
      };

    case "GET_DETAILS":
      return {
        ...state,
        detail: payload,
      };

    case "CLEAN_FILTERS":
      return {
        ...state,
        pokemons2: state.pokemons,
      };

    case "RES_STATE":
      return {
        ...state,
        detail: [],
      };

    case "HANDLER_NAME":
      let sortAlf;
      if (payload === "asc") {
        sortAlf = state.pokemons2.sort((a, b) => {
          if (a.name.charAt(0) > b.name.charAt(0)) {
            return -1;
          }
          if (a.name.charAt(0) < b.name.charAt(0)) {
            return 1;
          }
          return 0;
        });
      } else if (payload === "desc") {
        sortAlf = state.pokemons2.sort((a, b) => {
          if (a.name.charAt(0) > b.name.charAt(0)) {
            return 1;
          }
          if (a.name.charAt(0) < b.name.charAt(0)) {
            return -1;
          }
          return 0;
        });
      } else {
        sortAlf = state.pokemons2;
      }
      return {
        ...state,
        pokemons: sortAlf,
      };

    case "HANDLE_FILTERS":
      let pokemons2 = state.pokemons2;
      const { origin } = payload;

      if (origin === "apiPoke") {
        pokemons2 = pokemons2.filter((pokemons) => !pokemons.createdDB);
      }
      if (origin === "dbPoke") {
        pokemons2 = pokemons2.filter((pokemons) => pokemons.createdDB);
      }

      return {
        ...state,
        pokemons: pokemons2,
      };

    case "HANDLER_STRENGTH":
      let strength =
        payload === "asc"
          ? state.pokemons2.sort(function (a, b) {
              if (a.strength > b.strength) {
                return 1;
              }
              if (b.strength > a.strength) {
                return -1;
              }
              return 0;
            })
          : state.pokemons2.sort(function (a, b) {
              if (a.strength > b.strength) {
                return -1;
              }
              if (b.strength > a.strength) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: strength,
      };

    case "HANDLER_TYPES":
      let generos =
        payload === "all"
          ? state.pokemons2
          : state.pokemons2?.filter((e) => e.type?.includes(payload));
      return {
        ...state,
        pokemons: generos,
      };

    default:
      return state;
  }
}
