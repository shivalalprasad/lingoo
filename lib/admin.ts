import { auth } from "@clerk/nextjs"

const adminIds=[
  "user_2n9YPgpKU6vNGLELcGlw4Jq6KP8",
  "user_2nFdjRxEUa3hx3N0bWXxB8dVUeG",
];

export const isAdmin = ()=>{
  const { userId } = auth();

  if(!userId) return false;

  return adminIds.indexOf(userId) !== -1;

}
