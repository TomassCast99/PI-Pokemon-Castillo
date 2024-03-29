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
          : state.pokemons.filter((e) =>
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
            return 1;
          }
          if (a.name.charAt(0) < b.name.charAt(0)) {
            return -1;
          }
          return 0;
        });
      } else if (payload === "desc") {
        sortAlf = state.pokemons2.sort((a, b) => {
          if (a.name.charAt(0) > b.name.charAt(0)) {
            return -1;
          }
          if (a.name.charAt(0) < b.name.charAt(0)) {
            return 1;
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
      let pokemons3 = state.pokemons2;
      let origin = payload;

      if (origin === "allPoke") {
        return {
          ...state,
          pokemons: pokemons3,
        };
      }

      if (origin === "apiPoke") {
        pokemons3 = pokemons3.filter((pokemon) => !pokemon.createdDB);
      }

      if (origin === "dbPoke") {
        pokemons3 = pokemons3.filter((pokemon) => pokemon.createdDB);
      }

      return {
        ...state,
        pokemons: pokemons3,
      };

    case "HANDLER_STRENGTH":
      let strength =
        payload === "asc"
          ? state.pokemons2.sort(function (a, b) {
              if (a.strength > b.strength) {
                return -1;
              }
              if (b.strength > a.strength) {
                return 1;
              }
              return 0;
            })
          : state.pokemons2.sort(function (a, b) {
              if (a.strength > b.strength) {
                return 1;
              }
              if (b.strength > a.strength) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: strength,
      };

    case "HANDLER_TYPES":
      let tipos =
        payload === "all"
          ? state.pokemons2
          : state.pokemons2?.filter((e) => e.types?.includes(payload));
      return {
        ...state,
        pokemons: tipos,
      };

    default:
      return state;
  }
}
