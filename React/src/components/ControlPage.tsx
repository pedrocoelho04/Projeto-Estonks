import React from "react";
import { usePage } from "../store/page";

// Páginas
import DashboardPage from "../pages/DashboardPage";
import ProdutosList from "../pages/produtos/ProdutosList";
import ProdutoForm from "../pages/produtos/ProdutoForm";
import CategoriasList from "../pages/categorias/CategoriasList";
import CategoriaForm from "../pages/categorias/CategoriaForm";
import UsuariosList from "../pages/usuarios/UsuariosList";
import UsuarioForm from "../pages/usuarios/UsuarioForm";

export default function ControlPage() {
  const { page } = usePage();

  switch (page.name) {
    case "dashboard":
      return <DashboardPage />;

    case "produtos":
      return <ProdutosList />;

    case "produto-new":
      return <ProdutoForm mode="new" />;

    case "produto-edit":
      return <ProdutoForm mode="edit" id={page.id} />;

    case "categorias":
      return <CategoriasList />;

    case "categoria-new":
      return <CategoriaForm mode="new" />;

    case "categoria-edit":
      return <CategoriaForm mode="edit" id={page.id} />;

    case "usuarios":
      return <UsuariosList />;

    case "usuario-new":
      return <UsuarioForm mode="new" />;

    case "usuario-edit":
      return <UsuarioForm mode="edit" id={page.id} />;

    // login é renderizado fora do Layout em App.tsx
    default:
      return <DashboardPage />;
  }
}