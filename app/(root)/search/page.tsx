import { fetchUser, fetchUsers } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import UserCard from "@/components/cards/UserCard";

const page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo || !userInfo.onboarded) redirect("/onboarding");

  const res = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });
  return (
    <section>
      <h1 className="head-text mb1-0">Search</h1>

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
    </section>
  );
};

export default page;
