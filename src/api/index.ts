import { IRequestData, todo } from "../types";

const url = "http://3.86.164.220";

export const signup = async (data: IRequestData): Promise<any> => {
  try {
    const response = await fetch(url + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const login = async (data: IRequestData): Promise<any> => {
  try {
    const response = await fetch(url + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const getTodos = async (): Promise<todo[] | any> => {
  try {
    const response = await fetch(url + "/todos", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("access_token") || "",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addTodo = async (title: string): Promise<todo | any> => {
  try {
    const response = await fetch(url + "/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access_token") || "",
      },
      body: JSON.stringify({ title }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const completeTodo = async (id: number): Promise<todo | any> => {
  try {
    const response = await fetch(url + `/todos/${id}/completed`, {
      method: "PATCH",
      credentials: "include",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const unCompleteTodo = async (id: number): Promise<todo | any> => {
  try {
    const response = await fetch(url + `/todos/${id}/uncompleted`, {
      method: "PATCH",
      credentials: "include",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const deleteTodo = async (id: number) => {
  try {
    const response = await fetch(url + `/todos/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
