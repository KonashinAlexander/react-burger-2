describe('Constructor page behaviour with unauthorized user', ()=>{
    beforeEach(()=>{
        cy.visit("/");
        cy.log('start test with beforeEach...')
    });

    it('Opens modal by click on ingredient', ()=>{
            
       cy.get('.burger-ingredient').first().as('bun').then($bun=>{
        const mockBun = $bun[0]     
        console.log(mockBun)

        cy.get('@bun').click()
        cy.get('#modals').as('modal')

        cy.get('@modal').find('h1').should('have.text', 'Детали ингредиента')

        cy.get('@modal').find('img').should(img=>{
            expect((img[0].toString() === mockBun.getElementsByTagName('img')[0].toString())).eql(true)
        })

        cy.get('@modal').find('p').should(name=>{
            // console.log(name[0].textContent)
            expect((name[0].textContent === mockBun.getElementsByClassName('text')[1].textContent)).eql(true)
        })
        
       })
        


    });
    it('show ingredient details in modal');
    it('close modal by click on button');
    it('close modal by click on overlay');
    it('close modal by escape');
    it('cant close modal by click on modal');


    it('move bun to constructor top and bottom fields');
    it('cant remove bun from constructor top and bottom fields');
    it('can replace bun');
    it('show count of added buns');
    it('show total price of added buns');
    it('show TOP/DOWN text of added buns');
    it('keep button inactive');


    it('move ingredient to constructor field');
    it('move ingredient within constructor field');
    it('delete ingredient from constructor field');
    it('show count of added ingredient');
    it('show total price of added ingredients');
    it('make button active');
    it('move to login-page by click on button');
    
})