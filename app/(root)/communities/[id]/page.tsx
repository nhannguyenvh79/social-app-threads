// import ProfileHeader from "@/components/shared/ProfileHeader";
// import { currentUser } from "@clerk/nextjs";
// import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
// import Image from "next/image";
// import { communityTabs } from "@/constants";
// import ThreadTab from "@/components/shared/ThreadTab";
// import { fetchCommunityDetails } from "@/lib/actions/community.action";
// import UserCard from "@/components/cards/UserCard";

// const Page = async ({ params }: { params: { id: string } }) => {
//   const user = await currentUser();

//   if (!user) return null;

//   const communityDetails = await fetchCommunityDetails(params.id);
//   console.log(communityDetails);
//   return (
//     <section>
//       <ProfileHeader
//         accountId={communityDetails.id}
//         authUserId={user.id}
//         name={communityDetails.name}
//         username={communityDetails.username}
//         imgUrl={communityDetails.image}
//         bio={communityDetails.bio}
//         type="Community"
//       />
//       <div className="mt-9 ">
//         <Tabs defaultValue="threads" className="w-full">
//           <TabsList className="tab">
//             {communityTabs.map((tab) => (
//               <TabsTrigger key={tab.label} value={tab.value} className="tab">
//                 <Image
//                   src={tab.icon}
//                   alt={tab.label}
//                   width={24}
//                   height={24}
//                   className="object-contain"
//                 />
//                 <p className="max-sm:hidden">{tab.label}</p>
//                 {tab.label === "Threads" && (
//                   <p className="ml-1 rounded-full bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
//                     {communityDetails?.threads?.length}
//                   </p>
//                 )}
//               </TabsTrigger>
//             ))}
//           </TabsList>

//           <TabsContent value="Threads" className="w-full text-light-1">
//             <ThreadTab
//               currentUserId={user.id}
//               accountId={communityDetails._id}
//               accountType="Community"
//             />
//           </TabsContent>

//           <TabsContent value="Members" className="w-full text-light-1">
//             <section className="mt-10 flex flex-col gap-10">
//               {communityDetails?.members?.map((member: any) => (
//                 <UserCard
//                   key={member.id}
//                   id={member.id}
//                   name={member.name}
//                   username={member.username}
//                   imgUrl={member.image}
//                   personType="user"
//                 />
//               ))}
//             </section>
//           </TabsContent>

//           <TabsContent value="Requests" className="w-full text-light-1">
//             <ThreadTab
//               currentUserId={user.id}
//               accountId={communityDetails._id}
//               accountType="Community"
//             />
//           </TabsContent>
//         </Tabs>
//       </div>
//     </section>
//   );
// };

// export default Page;
