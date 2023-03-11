import Fastify from "fastify";

const app = Fastify()

app.get('/', () => {
  return 'Helo World!'
})

app.listen({
  port: 3333
}).then(() => {
  console.log('server running on 3333')
})