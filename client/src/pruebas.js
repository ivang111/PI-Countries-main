export function filtrarDietas(payload) {
  return {
    type: FILTRADO_DIETA,
    payload,
  };
}
 case FILTRADO_DIETA:
      const allRecipes = state.recipes;
      const filteredByDietType = allRecipes.filter((r) =>
        r.dietTypes?.some(
          (d) => d.toLowerCase() === action.payload.toLowerCase()
        )
      );
      return {
        ...state,
        recipes: filteredByDietType,
      };

import NavBar from "./NavBar";
// import Recipe from "./Recipe";
// import { Link } from "react-router-dom";
// import Paged from "./Paged";
import SearchBar from "./SearchBar";
import Recipe from "./Recipe";
import "./homepage.css";
import { Link } from "react-router-dom";
import nofoto from "..//Images/2983449.png";
let numberKey = 1;
export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const allDietas = useSelector((state) => state.allDiets);
  const [order, setOrder] = useState("");

  const [page, setPage] = useState(1);
  const [recipesPage, setRecipesPage] = useState(9);

  const quantityRecipesPage = page * recipesPage;
  const firstRecipePage = quantityRecipesPage - recipesPage;
  const recipesByPage = allRecipes.slice(firstRecipePage, quantityRecipesPage);
  const maxPages = Math.ceil(allRecipes.length / recipesPage);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllDietas());
  }, [dispatch]);

  function orderAZ(e) {
    e.preventDefault();
    dispatch(aplhabeticalSort(e.target.textContent.trim()));
    setPage(1);
    setOrder(e.target.textContent.trim());
  }
  function orderScore19(e) {
    e.preventDefault();
    setPage(1);
    dispatch(scoreSort(e.target.textContent.trim()));
    setOrder(e.target.textContent.trim());
  }

  function recargar(e) {
    e.preventDefault();
    dispatch(getRecipes());
    dispatch(getAllDietas());
  }

  function pageNum(e) {
    alert(page);
    document.getElementById("paginas").innerText = `Página ${page}`;
    setPage(page);
  }


  function anterior() {
    if (page > 1) {
      document.getElementById("paginas").innerText = `Página ${page - 1}`;
      setPage(page - 1);
    }
  }
  function siguiente() {
    if (page * recipesPage + page <= allRecipes.length) {
      document.getElementById("paginas").innerText = `Página ${page + 1}`;
      setPage(page + 1);
    }
  }

  function filtrarReceta(e) {
    e.preventDefault();
    dispatch(filtrarDietas(e.target.value.trim()));
    setPage(1);
    setOrder(e.target.value.trim());
  }
  return (
    <div className="containerHome">
      <div className="divSearchBar">
        <SearchBar />
      </div>
      <NavBar />

      {/* <div className="conteinerTop"> */}
      {/* <div className="div1">
          <button onClick={(e) => handleClickNAME(e)}>chicken</button>
        </div> */}
      {/* <div className="div1">
          <button onClick={(e) => handleClickID(e)}>716381</button>
        </div> */}
      <div className="div1">
        <button onClick={(e) => orderAZ(e)}>Az</button>
      </div>
      <div className="div1">
        <button onClick={(e) => orderAZ(e)}>Za</button>
      </div>
      <div className="div1">
        <button onClick={(e) => recargar(e)}>R</button>
      </div>
      <div className="div1">
        <button onClick={(e) => orderScore19(e)}>1-9</button>
      </div>
      <div className="div1">
        <button onClick={(e) => orderScore19(e)}>9-1</button>
      </div>
      <div className="div1">
        <button onClick={(e) => anterior(e)}>Anterior</button>
      </div>
      <div className="div1">
        <button onClick={(e) => siguiente(e)}>Siguiente</button>
      </div>
      <form
        action=""
        className="search-bar"
        onSubmit={(e) => {
          e.preventDefault();
          pageNum(e);
        }}
      >
        <div className="div1">
          <input id="paginadoNumerico" type="number" min="1" max={maxPages} />
        </div>
      </form>
      {/* <div className="div1">
        <select name="select" onChange={(e) => agregarDieta(e)}>
          {allDietas?.map((e) => {
            return <option value={e}>{e}</option>;
          })}
        </select>
      </div> */}
      <div className="div1">
        <select name="select" onChange={(e) => filtrarReceta(e)}>
          {allDietas?.map((e) => {
            return (
              <option value={e}>
                {e.charAt(0).toUpperCase() + e.slice(1)}
              </option>
            );
          })}
        </select>
      </div>
      <br />

      {/* <div>
          <div
            style={{ border: "solid red" }}
            id="divContenedor"
            class="divCont"
          ></div>
        </div>
        <br /> */}
      <span id="paginas">Página 1</span>
      <br />
      <div className="containerCardsApp">
        <div>
          {recipesByPage?.map((e) => {
            return (
              <div className="eachRecipe" key={numberKey++}>
                <Link className="linkRecetas" to={`recipeDetail/${e.id}`}>
                  <Recipe
                    image={e.image ? e.image : { nofoto }}
                    name={e.name}
                    dietTypes={e.dietTypes}
                  />
                </Link>
              </div>
            );
            // return (
            //   <div>
            //     <hr />
            //     <div>{p.id}</div>
            //     <div>{p.name}</div>
            //     <div>{p.healthScore}</div>
            //     <div>
            //       <img className="recipeImg" src={p.image} alt="Not found" />
            //     </div>
            //     <div>Tipo de dieta: {p.dietTypes}</div>

            //     <hr />
            //   </div>
            // );
          })}
        </div>
      </div>
      <hr />
      {/* </div> */}
    </div>
  );
}