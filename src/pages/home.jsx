import { ConvertCurrencies } from "../components/convert-currencies";
import { Header } from "../components/header";
import { PopularCurrencies } from "../components/popular-currencies";
import { SearchForm } from "../components/search-form";
import { TableCurrencies } from "../components/table-currencies";

export function Home() {
  return (
    <div className="container">
      <Header />
      <div className="convert-section">
        <ConvertCurrencies />
        <PopularCurrencies />
      </div>
      <SearchForm />
      <TableCurrencies />
    </div>
  );
}
