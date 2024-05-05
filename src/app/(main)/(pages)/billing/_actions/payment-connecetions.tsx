'use server'

import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs'

export const onPaymentDetails = async () => {
  try {
    const user = await currentUser()

    if (user) {
      const connection = await db.user.findFirst({
        where: {
          clerkId: user.id,
        },
        select: {
          tier: true,
          credits: true,
        },
      })

      if (user) {
        return connection
      }
    }
  } catch (error) {
    console.error('An error occurred:', error)
    // Handle the error here, such as logging it or returning a default value
  }
}
