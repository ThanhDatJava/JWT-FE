import { auth } from "@/auth";
import UserTable from "@/components/admin/user.table";
import { sendRequest } from "@/utils/api";

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

interface IUser {
  id: string;
  name: string;
  email: string;
  // Add any other fields relevant to the user object
}

interface IBackendRes<T> {
  data: {
    results: T[];
    // meta: { total: number; page: number; pageSize: number };
    meta: any;
  };
  // Add any other necessary fields for the response
}

const ManageUserPage = async (props: IProps) => {
  const current = props?.searchParams?.current ?? 1;
  const pageSize = props?.searchParams?.pageSize ?? 10;
  const session = await auth();

  try {
    const res = await sendRequest<IBackendRes<IUser>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`,
      method: "GET",
      queryParams: { current, pageSize },
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      nextOption: {
        next: { tags: ["list-users"] },
      },
    });

    return (
      <div>
        {res?.data?.results?.length ? (
          <UserTable users={res.data.results} meta={res.data.meta} />
        ) : (
          <p>No users found</p>
        )}
      </div>
    );
  } catch (error) {
    return (
      <div>
        <p>Error fetching user data. Please try again later.</p>
      </div>
    );
  }
};

export default ManageUserPage;
