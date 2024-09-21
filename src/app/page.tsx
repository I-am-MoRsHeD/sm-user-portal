import { redirect } from "next/navigation";

const DashboardPage = () => {
  redirect('/auth/login');
  return (
    <div>
      {/* <h2 className="text-2xl font-bold">Welcome to the Dashboard</h2> */}
      {/* Add your dashboard content here */}
    </div>
  );
};

export default DashboardPage;