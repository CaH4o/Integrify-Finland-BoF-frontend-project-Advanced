import { ChangeEvent } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { productsSearch, productUpdatePresent } from "../../redux/reducers/products";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.4),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.6),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  border: "1px solid",
  borderColor: "primary"
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export default function HomeAsideSearch(): JSX.Element {
  const dispatch = useAppDispatch();
  const searchValue: string = useAppSelector(function (state) {
    return state.products.filters.search;
  });
  let timer: NodeJS.Timeout | undefined = undefined;

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    dispatch(productsSearch(e.target.value || ""));
    clearTimeout(timer);
    timer = setTimeout(function () {
      dispatch(productUpdatePresent());
    }, 1000);
  }

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        onChange={handleChange}
        value={searchValue}
      />
    </Search>
  );
}
