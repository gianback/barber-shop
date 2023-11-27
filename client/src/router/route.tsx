import { Header } from "@/components/Header";
import { Home } from "@/pages/Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}
