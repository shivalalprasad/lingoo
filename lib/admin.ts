import { auth } from "@clerk/nextjs"

const adminIds=[
  "user_2n9YPgpKU6vNGLELcGlw4Jq6KP8",
];

export const isAdmin = ()=>{
  const { userId } = auth();

  if(!userId) return false;

  return adminIds.indexOf(userId) !== -1;

}
