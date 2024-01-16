import { SignUp } from '@clerk/nextjs'

const page = () => {
  return <SignUp afterSignUpUrl="/new-user" redirectUrl="/new-user" />
}
export default page
