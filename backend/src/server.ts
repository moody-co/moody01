import { buildApp } from './app'
import { env } from './config/env'
import { logger } from './config/logger'

async function main() {
  const app = await buildApp()

  await app.listen({ port: env.PORT, host: '0.0.0.0' })
  logger.info(`API running on port ${env.PORT}`)
}

main().catch((e) => {
  logger.error(e)
  process.exit(1)
})
