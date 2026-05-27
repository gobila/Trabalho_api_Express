// src/controllers/homeController.ts
import { JsonController, Get, Post, Body, HttpCode } from 'routing-controllers';

@JsonController()
export class CommumController {

    @Get('/')
    public index() {
        return { mensagem: 'Bem-vindo à minha API com Express!' };
    }

    @Get('/users')
    public getUsers() {
        return [{ id: 1, nome: "João" }];
    }

    @Post('/users')
    @HttpCode(201)
    public createUser(@Body() body: { nome: string }) {
        return { mensagem: "Usuário criado!", nome: body.nome };
    }
}
