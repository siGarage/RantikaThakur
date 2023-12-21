let default_reducers = ["load", "success", "error", "unload", "set"];
let default_reducer_prefix = "REDUCERS";
let default_saga_prefix = "SAGAS";

function generateConsts(type){
  switch (type) {
    case "auth":
      return {
        reducers: default_reducers,
        actions: ["login"],
        name: "AUTH",
      };
      case "cart":
      return {
        reducers: ['AddToCart','DeleteFromCart'],
        actions: ["cart"],
        name: "CART",
      };
      case "product":
      return {
        reducers: ['AddToProducts'],
        actions: ["product"],
        name: "PRODUCT",
      };
      case "wishlist":
      return {
        reducers: ['AddToWishlist'],
        actions: ["wishlist"],
        name: "WISHLIST",
      };
      default:
        
  }
}



export default function constants(type){
  let consts = {
    reducers: {},
    sagas: {},
  };

  let genConsts = generateConsts(type);

  for (let i in genConsts.actions) {
    if (!consts.sagas[genConsts.actions[i]]) {
      consts.sagas[genConsts.actions[i]] = {};
    }
    consts.sagas[
      genConsts.actions[i]
    ] = `${type}/${default_saga_prefix}/${genConsts.actions[i]}`;
    for (let j in genConsts.reducers) {
      if (!consts.reducers[genConsts.actions[i]]) {
        consts.reducers[genConsts.actions[i]] = {};
      }
      consts.reducers[genConsts.actions[i]][
        genConsts.reducers[j]
      ] = `${type}/${default_reducer_prefix}/${genConsts.actions[i]}/${genConsts.reducers[j]}`;
    }
  }

  return consts;
}