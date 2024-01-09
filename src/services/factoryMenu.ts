
export function limparObjeto(objeto) {
    if (objeto['subMenu']) {
        objeto['subMenu'] = objeto['subMenu'].map(subMenu => {
            return limparObjeto(subMenu);
        });
    }
    for (const propriedade in objeto) {
        if (objeto[propriedade] === null || objeto[propriedade] === undefined) {
            delete objeto[propriedade];
        }
    }
    for (const key of Object.keys(objeto)) {
        if (key === "usuarioCriacao" || key === "usuarioAlteracao" || key === "dataCriacao" || key === "dataAlteracao" || key === "inicioVigencia" || key === "fimVigencia" || key === "principal") {
            delete objeto[key];
        }
    }
    return objeto;
}


export function ordenarObjeto(objeto) {
    if (objeto['subMenu']) {
        objeto['subMenu'] = objeto['subMenu'].map(subMenu => {
            return ordenarObjeto(subMenu);
        });
    }
    objeto.sort((a, b) =>
        a.destaqueOrdem - b.destaqueOrdem
    )
    return objeto;
}



export function factoryLimparMenuEOrdenar(objeto) {
    const objetoATratar = objeto
    for (let item in objetoATratar) {
        objetoATratar[item] = limparObjeto(objetoATratar[item]);
    }
    const objetoFinal = ordenarObjeto(objetoATratar)
    return objetoFinal
}