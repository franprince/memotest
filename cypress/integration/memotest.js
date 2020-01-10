const URL = "http://172.26.128.1:8080";

context("Memotest", () => {
    before(()=>{
        cy.visit(URL);
    });

    describe("Juega al Memotest", ()=>{
        const NUMERO_CUADROS = 24;
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
});