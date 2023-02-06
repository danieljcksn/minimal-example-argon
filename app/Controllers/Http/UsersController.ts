import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class UsersController {
  public async index({}: HttpContextContract) {
    const users = await User.all()
    return users
  }

  public async store({ request, response }: HttpContextContract) {
    const userSchema = schema.create({
      name: schema.string({ trim: true }),
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email' }),
      ]),
      password: schema.string({ trim: true }, [rules.confirmed(), rules.minLength(8)]),
    })

    const messages = {
      'name.required': 'O nome é obrigatório',
      'email.required': 'O e-mail é obrigatório',
      'email.email': 'O e-mail é inválido',
      'email.unique': 'O e-mail já está em uso',
      'password.required': 'A senha é obrigatória',
      'password.confirmed': 'As senhas não conferem',
      'password.minLength': 'A senha deve ter no mínimo 8 caracteres',
    }

    const validation = await request.validate({ schema: userSchema, messages })

    const user = await User.create(validation)

    return response.status(201).send({
      success: true,
      message: 'Usuário criado com sucesso',
      user,
    })
  }

  public async show({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    return user
  }

  public async update() {}

  public async destroy({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    await user.delete()

    return response.status(204)
  }

  public async login({ request, auth, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password)

      return response.status(200).send({
        success: true,
        message: 'Login realizado com sucesso',
        token,
      })
    } catch (error) {
      return response.status(401).send({
        success: false,
        message: 'E-mail ou senha incorretos',
      })
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').logout()
  }
}
