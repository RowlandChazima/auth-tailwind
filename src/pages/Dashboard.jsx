import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { fetchUsers } from "../api/users";

// Mirrors populateUserAnalytics from the original dashboard.js.
function getAnalytics(users) {
  const totalUsers = users.length;
  const usersThisMonth = users.filter((user) => {
    const createdAt = new Date(user.createdAt);
    const now = new Date();
    return (
      createdAt.getMonth() === now.getMonth() &&
      createdAt.getFullYear() === now.getFullYear()
    );
  });
  return { totalUsers, totalUsersThisMonth: usersThisMonth.length };
}

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  useEffect(() => {
    let isMounted = true;

    fetchUsers()
      .then((data) => {
        if (isMounted) setUsers(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const analytics = users ? getAnalytics(users) : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/80 px-6 py-4 shadow-lg shadow-cyan-950/20">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
              Admin panel
            </p>
            <h1 className="text-xl font-semibold">User dashboard</h1>
          </div>
          <button
            id="logout"
            onClick={handleLogout}
            className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-white"
          >
            Logout
          </button>
        </header>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
              Total Users
            </p>
            <p id="totalUsers" className="mt-3 text-4xl font-semibold text-white">
              {analytics ? analytics.totalUsers : "..."}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
              Users this month
            </p>
            <p id="usersThisMonth" className="mt-3 text-4xl font-semibold text-white">
              {analytics ? analytics.totalUsersThisMonth : "..."}
            </p>
          </div>
        </section>

        <section className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80">
          <div className="border-b border-slate-800 px-6 py-4">
            <h2 className="text-lg font-semibold">User list</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-800 text-sm">
              <thead className="bg-slate-950/70 text-left text-slate-300">
                <tr>
                  <th className="px-6 py-3 font-medium">First Name</th>
                  <th className="px-6 py-3 font-medium">Last Name</th>
                  <th className="px-6 py-3 font-medium">Username</th>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium">Phone</th>
                  <th className="px-6 py-3 font-medium">DOB</th>
                  <th className="px-6 py-3 font-medium">Gender</th>
                  <th className="px-6 py-3 font-medium">Created At</th>
                </tr>
              </thead>
              <tbody id="usersTableBody" className="divide-y divide-slate-800 text-slate-200">
                {users === null ? (
                  <tr>
                    <td className="px-6 py-4">Loading...</td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4">{user.firstName}</td>
                      <td className="px-6 py-4">{user.lastName}</td>
                      <td className="px-6 py-4">{user.username}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.phone}</td>
                      <td className="px-6 py-4">{user.dob}</td>
                      <td className="px-6 py-4">{user.gender}</td>
                      <td className="px-6 py-4">{user.createdAt}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
