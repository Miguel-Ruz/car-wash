import { withAuth } from "next-auth/middleware"


export default withAuth(
  {
    pages: {
      signIn: '/auth'
    },
    callbacks: {
      authorized: ({ token }) => {
        if (process.env.ENVIRONMENT !== 'production') {
          return true
        } else {
          return !!token
        }
      }
    },
  }
)

export const config = {
  matcher: [
    "/api/wash",
    "/reportes",
    "/lavadores",
    "/api/wash"
  ]
}