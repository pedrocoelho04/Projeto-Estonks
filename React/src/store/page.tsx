import React from "react";

export type Page =
  | { name: "login" }
  | { name: "dashboard" }
  | { name: "produtos" }
  | { name: "produto-new" }
  | { name: "produto-edit"; id: number }
  | { name: "categorias" }
  | { name: "categoria-new" }
  | { name: "categoria-edit"; id: number }
  | { name: "usuarios" }
  | { name: "usuario-new" }
  | { name: "usuario-edit"; id: number };

type PageContextType = {
  page: Page;
  setPage: React.Dispatch<React.SetStateAction<Page>>;
};

const PageContext = React.createContext<PageContextType | undefined>(undefined);

export function PageProvider({
  initialPage,
  children
}: {
  initialPage: Page;
  children: React.ReactNode;
}) {
  const [page, setPage] = React.useState<Page>(initialPage);
  return <PageContext.Provider value={{ page, setPage }}>{children}</PageContext.Provider>;
}

export function usePage() {
  const ctx = React.useContext(PageContext);
  if (!ctx) throw new Error("usePage deve ser usado dentro de PageProvider");
  return ctx;
}