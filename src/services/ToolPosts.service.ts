export const CamposAusentes = (listaCampos: any) => {
    const camposAusentes = [];
    Object.keys(listaCampos).forEach((key) => {
         if (listaCampos[key] === undefined) {
             camposAusentes.push(key);
         } 
    });
    return camposAusentes.join(', ');
 }