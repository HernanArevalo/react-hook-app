import { renderHook, act } from '@testing-library/react'
import { useCounter } from '../../src/hooks/useCounter';

describe('Pruebas en el useCounter', () => { 
    
    test('Debe retornar los valores por defecto', () => { 
        
        const { result  } = renderHook( ()=>useCounter() );
        const { counter, increment, decrement, reset } = result.current;

        expect( counter ).toBe( 10 );
        expect( decrement ).toEqual( expect.any( Function ));
        expect( increment ).toEqual( expect.any( Function ));
        expect( reset ).toEqual( expect.any( Function ));
        

        
     });

    test('Debe generar el counter con el valor 100', async () => { 
        
        const { result  } = renderHook( ()=>useCounter(100) );
        expect( result.current.counter ).toBe( 100 );
    })

    test('Debe incrementar el contador', async () => { 

        const { result  } = renderHook( ()=>useCounter(100) );
        const { counter, increment } = result.current;

        act( () => { 
            increment();
            increment(2);
            
        }) 

        expect( result.current.counter ).toBe( 103 );

    });

    test('Debe decrementar el contador', async () => { 

        const { result  } = renderHook( ()=>useCounter(100) );
        const { counter, decrement } = result.current;

        act( () => { 
            decrement();
            decrement(2);
            
        }) 

        expect( result.current.counter ).toBe( 97 );

    });
 
    test('Debe resetear el contador', async () => { 

        const { result  } = renderHook( ()=>useCounter(100) );
        const { counter, increment, reset } = result.current;

        act( () => { 
            increment(50);
            reset();
            
        }) 

        expect( result.current.counter ).toBe( 100 );

    });

 });