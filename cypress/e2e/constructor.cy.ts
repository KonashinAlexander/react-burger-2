describe('Constructor page behaviour with unauthorized user', ()=>{

    const getBun = () => cy.get('.burger-ingredient').first()
    const getSauce = () => cy.get('.burger-ingredient').last()
    const getMain = () => cy.get('.Начинки').find('a.burger-ingredient').children()

    beforeEach(()=>{
        cy.visit("/");
        cy.log('start test with beforeEach...')
    });

    it('Opens modal by click on ingredient', ()=>{
            
       getBun().as('bun').then(bun=>{
            const mockBun = bun[0]     

            cy.get('@bun').click()
            cy.get('#modals').as('modal')

            // выборочная проверка индикации текста и ингредиентов
            cy.get('@modal').find('h1').should('have.text', 'Детали ингредиента')

            cy.get('@modal').find('img').should(img=>{
                expect((img[0].toString() === mockBun.getElementsByTagName('img')[0].toString())).eql(true)
            })

            cy.get('@modal').find('p').should(name=>{
                expect((name[0].textContent === mockBun.getElementsByClassName('text')[1].textContent)).eql(true)
            }) 

       })
    })

    it('Closes modal by click on close-button', ()=>{
        getBun().click()
        cy.get('#modals').find('svg').click()
        cy.get('#modals').should('be.empty')    
    })

    it('Closes modal by click on overlay', ()=>{
        getBun().click()
        cy.get('#modals').find('div:first').click()
        cy.get('#modals').should('be.empty')
    })
  
    
    it('close modal by escape');
    it('cant close modal by click on modal');

    it('Moves bun to constructor top and bottom fields', ()=>{
        getBun().as('bun').then(bun=>{
            const mockBun = bun[0]     

            cy.get('@bun').trigger('dragstart')
            cy.get('#drop').trigger('drop')

            getBun().find('p').first().should('have.text', '2')
            cy.get('#top').find('.constructor-element').first().find('svg').last().click()
            cy.get('button').contains('Оформить заказ').should('be.disabled')           

            cy.get('#top').find('img').should(img=>{
                expect((img[0].toString() === mockBun.getElementsByTagName('img')[0].toString())).eql(true)
            })

            cy.get('#top').find('.constructor-element__text').should(name=>{                
                expect((name[0].textContent === (mockBun.getElementsByClassName('text')[1].textContent + ' (Верх)'))).eql(true)
            }) 

            cy.get('#top').find('.constructor-element__price').should(name=>{                
                expect((name[0].textContent === mockBun.getElementsByClassName('text')[0].textContent)).eql(true)
            }) 

            cy.get('#bottom').find('img').should(img=>{
                expect((img[0].toString() === mockBun.getElementsByTagName('img')[0].toString())).eql(true)
            })

            cy.get('#bottom').find('.constructor-element__text').should(name=>{                
                expect((name[0].textContent === (mockBun.getElementsByClassName('text')[1].textContent + ' (Низ)'))).eql(true)
            }) 

            cy.get('#bottom').find('.constructor-element__price').should(name=>{                
                expect((name[0].textContent === mockBun.getElementsByClassName('text')[0].textContent)).eql(true)
            }) 

       })
       
    })
    
    
    it('can replace bun');    
    it('show total price of added buns');  

    it('move ingredient to constructor field', ()=>{
        getSauce().as('sauce').then(sauce=>{
            const mockSauce = sauce[0]

            cy.get('@sauce').trigger('dragstart')
            cy.get('#drop').trigger('drop')

            getSauce().find('p').first().should('have.text', '1')
            cy.get('button').contains('Оформить заказ').should('be.enabled')

            cy.get('#drop').find('img').should(img=>{
                expect((img[0].toString() === mockSauce.getElementsByTagName('img')[0].toString())).eql(true)
            })

            cy.get('#drop').find('.constructor-element__text').should(name=>{                
                expect(name[0].textContent === (mockSauce.getElementsByClassName('text')[1].textContent)).eql(true)
            }) 

            cy.get('#drop').find('.constructor-element__price').should(name=>{                
                expect((name[0].textContent === mockSauce.getElementsByClassName('text')[0].textContent)).eql(true)
            })
            
            cy.get('#drop').find('.constructor-element').find('svg').last().click()
            cy.get('#drop').find('.constructor-element').should('not.exist')
            cy.get('button').contains('Оформить заказ').should('be.disabled')
            
        })
    });


    it('Makes order by unauthorized user', ()=>{
        getBun().trigger('dragstart')
       cy.get('#drop').trigger('drop')
       getMain().first().trigger('dragstart')
       cy.get('#drop').trigger('drop')
       getMain().last().trigger('dragstart')
       cy.get('#drop').trigger('drop')
       cy.get('button').contains('Оформить заказ').click()

        cy.location('pathname').should('eq', '/login')
        cy.get('input[name="email"]').type('kid@ya.ru');
        cy.get('input[name="password"]').type('qwerty');
        cy.get('button[type="submit"]').click();



    });    

    it('show total price of added ingredients');   
    it('move to login-page by click on button');
    
})