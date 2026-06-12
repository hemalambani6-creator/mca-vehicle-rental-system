import { useState } from "react";

function LoginForm({ setLoggedInUser }) {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

function handleLogin() {

if (!email || !password) {
  alert("Please fill all fields!");
  return;
}

fetch("http://localhost:8080/api/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email,
    password
  })
})
  .then(response => response.json())
  .then(data => {

    if (!data) {
      alert("Invalid Email or Password!");
      return;
    }

    setLoggedInUser(data);

    alert(
      "Welcome " +
      data.fullName
    );

  })
  .catch(error => {

    console.error(error);

    alert("Login Failed!");

  });


}

return ( <div>


  <h2>Login</h2>

  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) =>
      setEmail(e.target.value)
    }
  />

  <br /><br />

  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) =>
      setPassword(e.target.value)
    }
  />

  <br /><br />

  <button onClick={handleLogin}>
    Login
  </button>

</div>


);
}

export default LoginForm;
