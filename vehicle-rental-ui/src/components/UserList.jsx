import { useEffect, useState } from "react";

function UserList() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  function loadUsers() {
    fetch("http://localhost:8080/api/users")
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error(error));
  }

  function deleteUser(id) {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    fetch(`http://localhost:8080/api/users/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        alert("User Deleted!");
        loadUsers();
      })
      .catch(error => {
        console.error(error);
        alert("Something went wrong!");
      });
  }

  return (
    <div>

      <h2>User List</h2>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>DOB</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user) => (
            <tr key={user.userId}>

              <td>{user.userId}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.dateOfBirth}</td>

              <td>
                <button
                  onClick={() => deleteUser(user.userId)}
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default UserList;