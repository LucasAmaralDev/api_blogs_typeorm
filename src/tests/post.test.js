

require('dotenv').config();

const data = {
    titulo: `JEST POST ${Math.random()}`,
    subtitulo: `JEST POST ${Math.random()}`,
    conteudo: `JEST TEST`,
    autores: `JEST TEST`,
    slug: `JEST_TEST_${String(Math.random() * 100)}`,
    usuarioCriacao: `JEST TEST`,
    status: `RASCUNHO`,
};

const dataUpdate = {
    ...data,
    urlImagemPrincipal: `JEST TEST`,
    altUrlImagemPrincipal: `JEST TEST`,
    legendaUrlImagemPrincipal: `JEST TEST`,
    categoria: 1,
    menu: 19,
    tags: 'JEST TEST',
    destaqueOrdem: 1,
    usuarioAlteracao: `JEST TEST`
};

test("Criar um post com todos os campos válidos retorna 201", async () => {
    const response = await fetch(`${process.env.API_URL}/cms/post`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    const responseJson = await response.json();
    data.id = responseJson.id;
    expect(response.status).toEqual(201);
})

test("Criar um post com o mesmo slug retorna 400", async () => {

    const response = await fetch(`${process.env.API_URL}/cms/post`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...data, id: null }),
    })

    expect(response.status).toEqual(400);
})

Object.keys(data).forEach((key) => {
    test(`Criar um post faltando ${key} retorna 400`, async () => {

        const response = await fetch(`${process.env.API_URL}/cms/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...data,
                [key]: null,
                id: null
            }),
        })

        expect(response.status).toEqual(400);
    })
})

test("Atualizar um post com todos os campos válidos retorna 200", async () => {
    const response = await fetch(`${process.env.API_URL}/cms/post/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataUpdate),
    })
    expect(response.status).toEqual(200);
})

test("Atualizar um post com um slug existente retorna 400", async () => {
    const response = await fetch(`${process.env.API_URL}/cms/post/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ slug: 'mt-apresenta-instrumentos-de-transparência-e-combate-à-corrupção-do-estado-à-transparência-internacional' }),
    })
    expect(response.status).toEqual(500);
})

test("Atualizar um post sem dados retorna 400", async () => {
    const response = await fetch(`${process.env.API_URL}/cms/post/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({}),
    })
    expect(response.status).toEqual(400);
})

test("procurar um post pelo slug existente retorna 200", async () => {
    const response = await fetch(`${process.env.API_URL}/post/slug/${data.slug}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    expect(response.status).toEqual(200);
})

test("procurar um post pelo slug inexistente retorna 404", async () => {
    const response = await fetch(`${process.env.API_URL}/post/slug/123456789`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    expect(response.status).toEqual(404);
})