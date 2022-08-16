import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { listProducts } from "../actions/ProductActions";
import LoadingBox from "../components/Loading";
import MessageBox from "../components/Message";
import Product from "../components/Product";
import Rating from "../components/Rating";
import { prices, ratings } from "../utils";

export default function SearchScreen(props) {
  const [isActiveCategory, setIsActiveCategory] = useState(false);
  const [isActiveBrand, setIsActiveBrand] = useState(false);
  const [isActivePrice, setIsActivePrice] = useState(false);
  const [isActiveRating, setIsActiveRating] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [selectedBrand, setSelectedBrand] = useState("Brand");
  const [selectedPrice, setSelectedPrice] = useState("Price");
  const [selectedRating, setSelectedRating] = useState("Rating");

  const {
    name = "all",
    category = "all",
    brand = "all",
    min = 0,
    max = 0,
    rating = 0,
    order = "newest",
    pageNumber = 1,
  } = useParams();

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error, page, pages } = productList;
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  const productBrandList = useSelector((state) => state.productBrandList);
  const {
    loading: loadingBrands,
    error: errorBrands,
    brands,
  } = productBrandList;

  useEffect(() => {
    dispatch(
      listProducts({
        pageNumber,
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
        brand: brand !== "all" ? brand : "",
        min,
        max,
        rating,
        order,
      })
    );
  }, [category, brand, dispatch, name, min, max, rating, order, pageNumber]);
  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.category || category;
    const filterBrand = filter.brand || brand;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/brand/${filterBrand}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
  };

  return (
    <div>
      <div className="row">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div> {products.length} Results</div>
        )}
        <div className="sortby">
          Sort by{" "}
          <select
            value={order}
            onChange={(e) => {
              props.history.push(getFilterUrl({ order: e.target.value }));
            }}
          >
            <option value="newest">Newest Arrivals</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
            <option value="toprated">Avg. Customer Reviews</option>
          </select>
        </div>
      </div>
      <div className="row top" id="searchscreen">
        <div className="col-6">
          <h1 className="title">Products</h1>
          <div>
            <h1 className="title3">Filters</h1>
          </div>
          <div>
            {loadingCategories ? (
              <LoadingBox />
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              <div className="dropdow">
                <div
                  className="dropdow-btn"
                  onClick={(e) => setIsActiveCategory(!isActiveCategory)}
                >
                  {selectedCategory}
                  <span className="fa fa-caret-down"></span>
                </div>
                {isActiveCategory && (
                  <ul className="dropdow-content">
                    <li
                      onClick={(e) => {
                        setSelectedCategory("Any");
                        setIsActiveCategory(false);
                      }}
                    >
                      <Link
                        className={"all" === category ? "active" : ""}
                        to={getFilterUrl({ category: "all" })}
                      >
                        Any
                      </Link>
                    </li>
                    {categories.map((c) => (
                      <li
                        key={c}
                        onClick={(e) => {
                          setSelectedCategory(c);
                          setIsActiveCategory(false);
                        }}
                      >
                        <Link
                          className={c === category ? "active" : ""}
                          to={getFilterUrl({ category: c })}
                        >
                          {c}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          <div>
            {loadingBrands ? (
              <LoadingBox />
            ) : errorBrands ? (
              <MessageBox variant="danger">{errorBrands}</MessageBox>
            ) : (
              <div className="dropdow">
                <div
                  className="dropdow-btn"
                  onClick={(e) => setIsActiveBrand(!isActiveBrand)}
                >
                  {selectedBrand}
                  <span className="fa fa-caret-down"></span>
                </div>
                {isActiveBrand && (
                  <ul className="dropdow-content">
                    <li
                      onClick={(e) => {
                        setSelectedBrand("Any");
                        setIsActiveBrand(false);
                      }}
                    >
                      <Link
                        className={"all" === brand ? "active" : ""}
                        to={getFilterUrl({ brand: "all" })}
                      >
                        Any
                      </Link>
                    </li>
                    {brands.map((b) => (
                      <li
                        key={b}
                        onClick={(e) => {
                          setSelectedBrand(b);
                          setIsActiveBrand(false);
                        }}
                      >
                        <Link
                          className={b === brand ? "active" : ""}
                          to={getFilterUrl({ brand: b })}
                        >
                          {b}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          <div>
            <div className="dropdow">
              <div
                className="dropdow-btn"
                onClick={(e) => setIsActivePrice(!isActivePrice)}
              >
                {selectedPrice}
                <span className="fa fa-caret-down"></span>
              </div>
              {isActivePrice && (
                <div>
                  <ul className="dropdow-content">
                    {prices.map((p) => (
                      <li
                        key={p.name}
                        onClick={(e) => {
                          setSelectedPrice(p.name);
                          setIsActivePrice(false);
                        }}
                      >
                        <Link
                          to={getFilterUrl({ min: p.min, max: p.max })}
                          className={
                            `${p.min}-${p.max}` === `${min}-${max}`
                              ? "active"
                              : ""
                          }
                        >
                          {p.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="dropdow">
              <div
                className="dropdow-btn"
                onClick={(e) => setIsActiveRating(!isActiveRating)}
              >
                {selectedRating}
                <span className="fa fa-caret-down"></span>
              </div>
              {isActiveRating && (
                <ul className="dropdow-content">
                  {ratings.map((r) => (
                    <li
                      key={r.name}
                      onClick={() => {
                        setSelectedRating(r.name);
                        setIsActiveRating(false);
                      }}
                    >
                      <Link
                        to={getFilterUrl({ rating: r.rating })}
                        className={
                          `${r.rating}` === `${rating}` ? "active" : ""
                        }
                      >
                        <Rating caption={" & up"} rating={r.rating}></Rating>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="col-3">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <div className="row center">
                {products.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>
              <div className="row center pagination">
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    className={x + 1 === page ? "active" : ""}
                    key={x + 1}
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
