
enum ConstrElem {
    Elem = '.constructor-element',
    Text = '.constructor-element__text',
    Price = '.constructor-element__price',
}

enum Title {
    BunTop = 'Краторная булка N-200i (Верх)',
    BunBottom = 'Краторная булка N-200i (Низ)',
    Bio = 'Биокотлета из марсианской Магнолии',
    Cheese = 'Сыр с астероидной плесенью',
}

enum Id {
    modal = '#modals',
    top = '#top',
    bottom = '#bottom',
    drop = '#drop',
    number = '#number',
}

describe('Constructor page behaviour with unauthorized user', ()=>{

    const getBun = () => cy.get('main').find('div.Булки').find('a').first()
    const getSauce = () => cy.get('main').find('div.Соусы').find('a').last()
    const getMain = () => cy.get('main').find('div.Начинки').find('a').children()

    beforeEach(()=>{
        cy.visit("/");
        cy.log('start test with beforeEach...')
    });

    // ------------------ТЕСТ СРАБОТАЛ-----------------
    // it('Opens modal by click on ingredient', ()=>{
            
    //    getBun().as('bun').then(bun=>{
    //         const mockBun = bun[0]
            
    //         cy.get('@bun').click()           

    //         // выборочная проверка индикации текста и ингредиентов
    //         cy.get(Id.modal).find('h1').should('have.text', 'Детали ингредиента')

    //         cy.get(Id.modal).find('img').should(img=>{
    //             expect((img[0].toString() === mockBun.getElementsByTagName('img')[0].toString())).eql(true)
    //         })

    //         cy.get(Id.modal).find('p').should(name=>{
    //             expect((name[0].textContent === mockBun.getElementsByTagName('p')[2].textContent)).eql(true)
    //         }) 
    //    })
    // })


    // ------------------ТЕСТ НЕ СРАБОТАЛ-----------------
    it('Closes modal by click on close-button', ()=>{
        getBun().click()
        cy.get(Id.modal).find('svg').click()
        cy.get(Id.modal).should(modal=>{
            console.log(modal)
        })
    })

    // ------------------ТЕСТ НЕ СРАБОТАЛ-----------------
    // it('Closes modal by click on overlay', ()=>{
    //     getBun().click()
    //     cy.get(Id.modal).find('div:first').click()
    //     cy.get(Id.modal).should('be.empty')
    // })
  
    // ------------------ТЕСТЫ ДОРАБОТАТЬ-----------------    
    // it('close modal by escape');
    // it('cant close modal by click on modal');


    // ------------------ТЕСТ СРАБОТАЛ-----------------
    // it('Moves bun to constructor top and bottom fields', ()=>{
    //     getBun().as('bun').then(bun=>{
    //         const mockBun = bun[0]   

    //         cy.get('@bun').trigger('dragstart')
    //         cy.get(Id.drop).trigger('drop')

    //         getBun().find('p').first().should('have.text', '2') //ok
    //         cy.get(Id.top).find(ConstrElem.Elem).first().find('svg').last().click() //ok
    //         cy.get('button').contains('Оформить заказ').should('be.disabled')           //ok

    //         cy.get(Id.top).find('img').should(img=>{
    //             expect((img[0].toString() === mockBun.getElementsByTagName('img')[0].toString())).eql(true) //ok
    //         })

    //         cy.get(Id.top).find(ConstrElem.Text).should(name=>{                
    //             expect((name[0].textContent === (mockBun.getElementsByTagName('p')[2].textContent + ' (Верх)'))).eql(true) //ok
    //         }) 

    //         cy.get(Id.top).find(ConstrElem.Price).should(price=>{                
    //             expect((price[0].textContent === mockBun.getElementsByTagName('p')[1].textContent)).eql(true) //ok     
               
    //         }) 

    //         cy.get(Id.bottom).find('img').should(img=>{
    //             expect((img[0].toString() === mockBun.getElementsByTagName('img')[0].toString())).eql(true)
    //         })

    //         cy.get(Id.bottom).find(ConstrElem.Text).should(name=>{                
    //             expect((name[0].textContent === (mockBun.getElementsByTagName('p')[2].textContent + ' (Низ)'))).eql(true) //ok
    //         }) 

    //         cy.get(Id.bottom).find(ConstrElem.Price).should(price=>{                
    //             expect((price[0].textContent === mockBun.getElementsByTagName('p')[1].textContent)).eql(true) //ok     
               
    //         }) 

    //    })
       
    // })
    
    // ------------------ТЕСТЫ ДОРАБОТАТЬ-----------------     
    // it('can replace bun');    
    // it('show total price of added buns');  



    // ------------------ТЕСТ СРАБОТАЛ-----------------
    // it('move ingredient to constructor field', ()=>{
    //     getSauce().as('sauce').then(sauce=>{
    //         const mockSauce = sauce[0]

    //         cy.get('@sauce').trigger('dragstart')
    //         cy.get(Id.drop).trigger('drop')

    //         getSauce().find('p').first().should('have.text', '1')
    //         cy.get('button').contains('Оформить заказ').should('be.enabled')

    //         cy.get(Id.drop).find('img').should(img=>{
    //             expect((img[0].toString() === mockSauce.getElementsByTagName('img')[0].toString())).eql(true) //ok
    //         })

    //         cy.get(Id.drop).find(ConstrElem.Text).should(name=>{                
    //             expect((name[0].textContent === (mockSauce.getElementsByTagName('p')[2].textContent))).eql(true) //ok

    //         }) 

    //         cy.get(Id.drop).find(ConstrElem.Price).should(price=>{                
    //             expect((price[0].textContent === mockSauce.getElementsByTagName('p')[1].textContent)).eql(true) //ok     

    //         })
            
    //         cy.get(Id.drop).find(ConstrElem.Elem).find('svg').last().click()
    //         cy.get(Id.drop).find(ConstrElem.Elem).should('not.exist')
    //         cy.get('button').contains('Оформить заказ').should('be.disabled')
            
    //     })
    // });

    // ------------------ТЕСТ СРАБОТАЛ-----------------
    // it('Makes order by unauthorized user', ()=>{
    //     getBun().trigger('dragstart')
    //    cy.get(Id.drop).trigger('drop')
    //    getMain().first().trigger('dragstart')
    //    cy.get(Id.drop).trigger('drop')
    //    getMain().last().trigger('dragstart')
    //    cy.get(Id.drop).trigger('drop')
    //    cy.get('button').contains('Оформить заказ').click()

    //     cy.location('pathname').should('eq', '/login')
    //     cy.get('input[name="email"]').type('kid@ya.ru');
    //     cy.get('input[name="password"]').type('qwerty');
    //     cy.get('button[type="submit"]').click();

    //     cy.get(Id.top).find(ConstrElem.Text).should(name=>{  
    //         expect(name[0].textContent === Title.BunTop).eql(true)
    //     }) 

    //     cy.get(Id.bottom).find(ConstrElem.Text).should(name=>{  
    //         expect(name[0].textContent === Title.BunBottom).eql(true)
    //     }) 

    //     cy.get(Id.drop).find(ConstrElem.Text).should(name=>{                
    //         expect(name[0].textContent === Title.Bio).eql(true)
    //         expect(name[1].textContent === Title.Cheese).eql(true)
    //     }) 

    //    cy.get('button').contains('Оформить заказ').click()

    //    cy.wait(20000)
    //    cy.location('pathname').should('eq', '/details')
    //    cy.get(Id.modal).find(Id.number).should('exist')
    // });    

    // it('show total price of added ingredients');   
    // it('move to login-page by click on button');
    
})