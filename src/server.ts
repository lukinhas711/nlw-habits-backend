import Fastify from "fastify";
import cors from '@fastify/cors'
import { myRoutes } from "./routes";

const app = Fastify()

app.register(cors)
app.register(myRoutes)

app.listen({
  port: 3333
}).then(() => {
  console.log('server running on localhost:3333')
})