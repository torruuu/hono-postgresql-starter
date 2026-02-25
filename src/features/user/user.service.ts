import { prisma } from '@/integrations/database/config.js'

export default class UserService {
  static async getAllUsers() {
    return prisma.user.findMany()
  }
  static async getUserById(id: number) {
    return prisma.user.findUnique({ where: { id } })
  }
}
