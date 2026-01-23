import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { sub: string } // conteúdo do token
    user: { id: string }     // request.user após verificar token
  }
}
