import type { Categoria, Produto, Usuario, Id } from "../types";

const API_URL = "http://localhost:8080/api";

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Erro na requisição: ${res.statusText}`);
  }

  // Se for 204 No Content, retorna null (ou undefined)
  if (res.status === 204) return null as T;

  return res.json();
}

// AUTH
export async function login(nome: string, senha: string): Promise<Usuario | null> {
  try {
    const res = await request<{ token: string; message: string; usuario: Usuario } | Usuario>("/login", {
      method: "POST",
      body: JSON.stringify({ user: nome, password: senha }),
    });

    if ('token' in res && res.usuario) {
      // Sucesso
      return res.usuario;
    }
    return null;

  } catch (e) {
    console.error(e);
    return null;
  }
}

// USUÁRIOS
export async function getUsuarios(): Promise<Usuario[]> {
  return request<Usuario[]>("/usuarios");
}

export async function getUsuarioById(id: Id): Promise<Usuario | undefined> {
  try {
    return await request<Usuario>(`/usuarios/${id}`);
  } catch {
    return undefined;
  }
}

export async function createUsuario(data: Omit<Usuario, "id">): Promise<Usuario> {
  return request<Usuario>("/usuarios", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateUsuario(id: Id, data: Partial<Usuario>): Promise<Usuario | null> {
  return request<Usuario>(`/usuarios/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteUsuario(id: Id): Promise<boolean> {
  await request<void>(`/usuarios/${id}`, {
    method: "DELETE",
  });
  return true;
}

// CATEGORIAS
export async function getCategorias(): Promise<Categoria[]> {
  return request<Categoria[]>("/categorias");
}

export async function getCategoriaById(id: Id): Promise<Categoria | undefined> {
  try {
    return await request<Categoria>(`/categorias/${id}`);
  } catch {
    return undefined;
  }
}

export async function createCategoria(data: Omit<Categoria, "id">): Promise<Categoria> {
  return request<Categoria>("/categorias", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateCategoria(id: Id, data: Partial<Categoria>): Promise<Categoria | null> {
  return request<Categoria>(`/categorias/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteCategoria(id: Id): Promise<boolean> {
  await request<void>(`/categorias/${id}`, {
    method: "DELETE",
  });
  return true;
}

// PRODUTOS
export async function getProdutos(): Promise<Produto[]> {
  return request<Produto[]>("/produtos");
}

export async function getProdutoById(id: Id): Promise<Produto | undefined> {
  try {
    return await request<Produto>(`/produtos/${id}`);
  } catch {
    return undefined;
  }
}

export async function createProduto(data: Omit<Produto, "id">, categoriaIds: Id[] = []): Promise<Produto> {
  const produtoToSend = {
    ...data,
    categorias: categoriaIds.map(id => ({ id }))
  };

  return request<Produto>("/produtos", {
    method: "POST",
    body: JSON.stringify(produtoToSend),
  });
}

export async function updateProduto(id: Id, data: Partial<Produto>, categoriaIds?: Id[]): Promise<Produto | null> {
  const produtoToSend: any = { ...data };

  if (categoriaIds) {
    produtoToSend.categorias = categoriaIds.map(id => ({ id }));
  }

  return request<Produto>(`/produtos/${id}`, {
    method: "PUT",
    body: JSON.stringify(produtoToSend),
  });
}

export async function deleteProduto(id: Id): Promise<boolean> {
  await request<void>(`/produtos/${id}`, {
    method: "DELETE",
  });
  return true;
}

// Helpers
export async function getCategoriasByProdutoId(produtoId: Id): Promise<Categoria[]> {
  const produto = await getProdutoById(produtoId);
  return produto?.categorias || [];
}