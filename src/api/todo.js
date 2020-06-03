import { todo } from "./axios";

export const register = async (name, email, password) => {
  return await todo.post("register/", {
    name,
    email,
    password,
  });
};

export const login = async (email, password) => {
  return await todo.post("login/", {
    email,
    password,
  });
};

export const getAllLists = async (email) => {
  return await todo.get("lists/", {
    params: {
      email,
    },
  });
};

export const createNewList = async (email, name, description) => {
  return await todo.post("lists/", {
    email,
    name,
    description,
  });
};

export const getAllTasks = async (id) => {
  return await todo.get("tasks/", {
    params: {
      id,
    },
  });
};

export const getSingleTask = async (id) => {
    return await todo.get(("tasks/"+id+"/"))
}

export const createNewTask = async (
  id,
  name,
  description,
  label,
  status,
  date,
  time
) => {
  return await todo.post("tasks/", {
    id,
    name,
    description,
    label,
    status,
    date,
    time,
  });
};

export const updateTask = async (
  id,
  name,
  description,
  label,
  status,
  date,
  time,
  isCompleted
) => {
  return await todo.put("tasks/", {
    id,
    name,
    description,
    label,
    status,
    date,
    time,
    isCompleted
  });
};

export const deleteTask = async (id) => {
  return await todo.delete("tasks/", {
    data: {
      id: id,
    },
  });
};

export const filterTask = async (id, progress, label, status, priority) => {
  return await todo.get("tasks/",{
    params:{
      id, 
      progress,
      label,
      status,
      priority
    }
  })
}

export const subscribe = async (email, subscribe) => {
  return await todo.post("subscribe/",{
    email,
    subscribe
  })
}

export const deleteUserAccount = async (email) => {
  return await todo.delete("user/", {
    data: {
      email
    }
  })
}