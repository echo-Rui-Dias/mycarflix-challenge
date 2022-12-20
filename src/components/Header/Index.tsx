import { useSearch } from "../../context/SearchProvider";
import SortDown from "../../icons/SortDown";
import SortUp from "../../icons/SortUp";
import SearchForm from "./SearchForm";

export default function Header() {
  const { isErrorFound, setIsAscending, isAscending } = useSearch();
  return (
    <header className="grid py-4 px-6 gap-4">
      <img
        className="justify-self-center mix-blend-multiply max-h-10"
        src="images/logo.png"
        alt="Logo"
      />
      <SearchForm />
      <div
        className={`${
          isErrorFound ? "hidden" : "block"
        } bg-mycarflix-white p-4 justify-self-center rounded-2xl self-start`}
      >

        <button
          disabled={isErrorFound}
          onClick={() => setIsAscending(true)}
          className={`${
            isAscending
              ? "border-primary border bg-primary-bg text-primary rounded-lg"
              : "border border-transparent bg-transparent"
          } p-3`}
        >
          <SortUp />
        </button>

        <button
          disabled={isErrorFound}
          onClick={() => setIsAscending(false)}
          className={`${
            !isAscending
              ? "border-primary border bg-primary-bg text-primary rounded-lg"
              : "border border-transparent bg-transparent"
          } p-3`}
        >
          <SortDown />
        </button>

      </div>
    </header>
  );
}
