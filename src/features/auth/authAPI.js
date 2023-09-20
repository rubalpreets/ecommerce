// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    //TODO on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const email = loginInfo.email;
      const password = loginInfo.password;

      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });

      const data = await response.json();
      if (response.ok) {
        resolve({ data });
      } else {
        reject(data);
      }
    } catch (err) {
      reject(err);
    }
  });
}

export function signOut() {
  return new Promise(async (resolve) => {
    //TODO remove session from server
    resolve({ data: "success" });
  });
}
