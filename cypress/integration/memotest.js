const URL = "http://172.26.128.1:8080";

context("Memotest", () => {
    before(()=>{
        cy.visit(URL);
    });

    const NUMERO_CUADROS = 24;

    describe("Juega al Memotest", ()=>{

        it('Se asegura que haya un tablero con 24 cuadros', () =>{
            cy.get('#tablero').find('.tarjeta').should('have.length', NUMERO_CUADROS);
        });

        it('Se asegura que los cuadros sean aleatorios', () =>{
            cy.get(".tarjeta").then(tarjetas =>{
                let nombreLogo = [];
                tarjetas.each(function(i, tarjeta){
                    nombreLogo.push(tarjeta.children[0].dataset.valor);
                });
                cy.visit(URL);
                let nombreLogoNuevo = [];
                cy.get(".tarjeta").then(tarjetas =>{
                    tarjetas.each(function(i, tarjeta){
                        nombreLogoNuevo.push(tarjeta.children[0].dataset.valor);
                    });
                });
                cy.wrap(nombreLogo).should('not.deep.equal', nombreLogoNuevo);
            });
        });
    });

    describe("Resuelve el juego", ()=>{

        let mapaDePares, listaDePares;

        it("Selecciona una combinación errónea", () =>{
            cy.get('.tarjeta').then(tarjetas =>{
                console.log(tarjetas)
                mapaDePares = obtenerParesDeTarjetas(tarjetas);
                listaDePares = Object.values(mapaDePares);
                listaDePares[0][0].click();
                listaDePares[1][0].click();

                cy.get('.tarjeta').should('have.length', NUMERO_CUADROS);
            });
        });

        it('Resuelve el juego', ()=>{
            cy.get('.tarjeta').should('have.length', NUMERO_CUADROS);

            listaDePares.forEach((par)=>{
                cy.get(par[0]).click();
                cy.get(par[1]).click();
            });
        });
    });
});

function obtenerParesDeTarjetas(tarjetas){

    const pares = [];

    tarjetas.each((i, tarjeta) => {
        const logo = tarjeta.children[0].dataset.valor;

        if(pares[logo]) {
            pares[logo].push(tarjeta);
        }else{
            pares[logo] = [];
            pares[logo].push(tarjeta);
        };
    });
    return pares;
};