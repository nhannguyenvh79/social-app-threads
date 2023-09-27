import { fetchUser, fetchUsers } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import UserCard from "@/components/cards/UserCard";
import Pagination from "@/components/shared/Pagination";
import Searchbar from "@/components/shared/SearchBar";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo || !userInfo.onboarded) redirect("/onboarding");

  const res = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });
  return (
    <section>
      <h1 className="head-text mb1-0">Search</h1>

      <Searchbar routeType="search" />
      <div className="mt-14 flex flex-col gap-9">
        {res.users.length === 0 ? (
          <p className="no-result">No users</p>
        ) : (
          <>
            {res.users.map((el) => (
              <UserCard
                key={el.id}
                id={el.id}
                name={el.name}
                username={el.username}
                imgUrl={el.image}
                personType="user"
              />
            ))}
          </>
        )}
      </div>
      <Pagination
        path="search"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={res.isNext}
      />
    </section>
  );
};

export default Page;
