import { ConvertCurrencies } from "../components/convert-currencies";
import { Header } from "../components/header";
import { Pagination } from "../components/pagination";
import { SearchForm } from "../components/search-form";
import { TableCurrencies } from "../components/table-currencies";

export function Home() {
  return (
    <div>
      <Header />
      <ConvertCurrencies />
      <SearchForm />
      <TableCurrencies />
      <Pagination />
    </div>
  );
}
