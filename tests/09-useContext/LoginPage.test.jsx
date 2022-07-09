import { fireEvent, render, screen } from "@testing-library/react";
import { UserContext } from "../../src/09-useContext/context/UserContext";
import { LoginPage } from "../../src/09-useContext/LoginPage";




describe('Pruebas en <LoginPage />', () => {

    test('debe mostrar el componente sin el usuario', () => {

        render( 
            <UserContext.Provider value={{ user:null }}>
                <LoginPage /> 
            </UserContext.Provider>
        );

        const preTag = screen.getByLabelText('pre')

        expect( preTag.innerHTML ).toContain( 'null' );

    });

    test('debe llamar el setUser con el click', () => {

        const setUserMock = jest.fn();



        render( 
            <UserContext.Provider value={{ user:null, setUser: setUserMock }}>
                <LoginPage /> 
            </UserContext.Provider>
            );

        screen.debug()

        const btn = screen.getByRole('button')
        fireEvent.click(btn)

        expect( setUserMock ).toHaveBeenCalledWith({"email": "juan@google.com", "id": 123, "name": "Juan"})

    });


});