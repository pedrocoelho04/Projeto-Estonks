import { KEYS } from "./seed";
import { getItem, nextId, setItem } from "./storage";
import type { CatXprod, Categoria, Produto, Usuario, Id } from "../types";

// AUTH
export async function login(nome: string, senha: string): Promise<Usuario | null> {
  const usuarios = await getItem<Usuario[]>(KEYS.usuarios, []);
  const user = usuarios.find((u) => u.Nome === nome && u.Senha === senha);
  return user ?? null;
}

export async function getUsuarios(): Promise<Usuario[]> {
  return getItem<Usuario[]>(KEYS.usuarios, []);
}
export async function getUsuarioById(id: Id): Promise<Usuario | undefined> {
  const all = await getUsuarios();
  return all.find((u) => u.Id === id);
}
export async function createUsuario(data: Omit<Usuario, "Id">): Promise<Usuario> {
  const all = await getUsuarios();
  const Id = (await nextId(KEYS.usuarios)) || (all.length ? Math.max(...all.map((x) => x.Id)) + 1 : 1);
  const novo: Usuario = { Id, ...data };
  await setItem(KEYS.usuarios, [...all, novo]);
  return novo;
}
export async function updateUsuario(id: Id, data: Partial<Omit<Usuario, "Id">>): Promise<Usuario | null> {
  const all = await getUsuarios();
  const idx = all.findIndex((u) => u.Id === id);
  if (idx < 0) return null;
  const updated = { ...all[idx], ...data };
  all[idx] = updated;
  await setItem(KEYS.usuarios, all);
  return updated;
}
export async function deleteUsuario(id: Id): Promise<boolean> {
  const all = await getUsuarios();
  const filtered = all.filter((u) => u.Id !== id);
  await setItem(KEYS.usuarios, filtered);
  return filtered.length < all.length;
}

// CATEGORIAS
export async function getCategorias(): Promise<Categoria[]> {
  return getItem<Categoria[]>(KEYS.categorias, []);
}
export async function getCategoriaById(id: Id): Promise<Categoria | undefined> {
  const all = await getCategorias();
  return all.find((c) => c.Id === id);
}
export async function createCategoria(data: Omit<Categoria, "Id">): Promise<Categoria> {
  const all = await getCategorias();
  const Id = (await nextId(KEYS.categorias)) || (all.length ? Math.max(...all.map((x) => x.Id)) + 1 : 1);
  const novo: Categoria = { Id, ...data };
  await setItem(KEYS.categorias, [...all, novo]);
  return novo;
}
export async function updateCategoria(id: Id, data: Partial<Omit<Categoria, "Id">>): Promise<Categoria | null> {
  const all = await getCategorias();
  const idx = all.findIndex((c) => c.Id === id);
  if (idx < 0) return null;
  const updated = { ...all[idx], ...data };
  all[idx] = updated;
  await setItem(KEYS.categorias, all);
  return updated;
}
export async function deleteCategoria(id: Id): Promise<boolean> {
  const all = await getCategorias();
  const filtered = all.filter((c) => c.Id !== id);
  await setItem(KEYS.categorias, filtered);
  // Apagar relacionamentos CatXprod
  const links = await getItem<CatXprod[]>(KEYS.catxprod, []);
  await setItem(KEYS.catxprod, links.filter((l) => l.Id_Categoria !== id));
  return filtered.length < all.length;
}

// PRODUTOS
export async function getProdutos(): Promise<Produto[]> {
  return getItem<Produto[]>(KEYS.produtos, []);
}
export async function getProdutoById(id: Id): Promise<Produto | undefined> {
  const all = await getProdutos();
  return all.find((p) => p.Id === id);
}
export async function createProduto(data: Omit<Produto, "Id">, categoriaIds: Id[] = []): Promise<Produto> {
  const all = await getProdutos();
  const Id = (await nextId(KEYS.produtos)) || (all.length ? Math.max(...all.map((x) => x.Id)) + 1 : 1);
  const novo: Produto = { Id, ...data };
  await setItem(KEYS.produtos, [...all, novo]);

  // Relacionamentos CatXprod
  const currentLinks = await getItem<CatXprod[]>(KEYS.catxprod, []);
  let newLinks = [...currentLinks];
  for (const cid of categoriaIds) {
    const link: CatXprod = {
      Id: (await nextId(KEYS.catxprod)) || (newLinks.length ? Math.max(...newLinks.map((x) => x.Id)) + 1 : 1),
      Id_Produto: Id,
      Id_Categoria: cid
    };
    newLinks.push(link);
  }
  await setItem(KEYS.catxprod, newLinks);

  return novo;
}
export async function updateProduto(id: Id, data: Partial<Omit<Produto, "Id">>, categoriaIds?: Id[]): Promise<Produto | null> {
  const all = await getProdutos();
  const idx = all.findIndex((p) => p.Id === id);
  if (idx < 0) return null;
  const updated = { ...all[idx], ...data, Data_Modificacao: new Date().toISOString() };
  all[idx] = updated;
  await setItem(KEYS.produtos, all);

  if (categoriaIds) {
    // Atualizar CatXprod
    const links = await getItem<CatXprod[]>(KEYS.catxprod, []);
    const filtered = links.filter((l) => l.Id_Produto !== id);
    let newLinks = [...filtered];
    for (const cid of categoriaIds) {
      const link: CatXprod = {
        Id: (await nextId(KEYS.catxprod)) || (newLinks.length ? Math.max(...newLinks.map((x) => x.Id)) + 1 : 1),
        Id_Produto: id,
        Id_Categoria: cid
      };
      newLinks.push(link);
    }
    await setItem(KEYS.catxprod, newLinks);
  }

  return updated;
}
export async function deleteProduto(id: Id): Promise<boolean> {
  const all = await getProdutos();
  const filtered = all.filter((p) => p.Id !== id);
  await setItem(KEYS.produtos, filtered);

  // ON DELETE CASCADE em CatXprod
  const links = await getItem<CatXprod[]>(KEYS.catxprod, []);
  await setItem(KEYS.catxprod, links.filter((l) => l.Id_Produto !== id));

  return filtered.length < all.length;
}

// CATXPROD helpers
export async function getCategoriasByProdutoId(produtoId: Id): Promise<Categoria[]> {
  const links = await getItem<CatXprod[]>(KEYS.catxprod, []);
  const catIds = links.filter((l) => l.Id_Produto === produtoId).map((l) => l.Id_Categoria);
  const categorias = await getCategorias();
  return categorias.filter((c) => catIds.includes(c.Id));
}