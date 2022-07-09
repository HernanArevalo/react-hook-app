import { fireEvent, render, screen } from '@testing-library/react'
import { TodoItem } from '../../src/08-useReducer/TodoItem';



describe('pruebas en el <TodoItem/>', () => {

    const todo = {
        id:1,
        description: 'Piedra del alma',
        done: false
    };

    const onDeleteTodoMock = jest.fn();
    const onToggleTodoMock = jest.fn();

    beforeEach(() => jest.clearAllMocks() );

    test('debe mostrar el Todo pendiente de completar', () => {

        render( <TodoItem 
                    todo={todo} 
                    onToggleTodo={ onToggleTodoMock}
                    onDeleteTodo ={ onDeleteTodoMock} 
                />)

        const liElement = screen.getByRole('listitem');
        expect( liElement.className ).toBe("list-group-item d-flex justify-content-between")

        const spanElement = screen.getByLabelText('span')
        expect( spanElement.className ).toContain('align-self-center')
        expect( spanElement.className ).not.toContain('text-decoration-line-through')

    });

    test('debe mostrar el Todo completado', () => {

        todo.done = true


        render( <TodoItem 
                    todo={todo} 
                    onToggleTodo={ onToggleTodoMock}
                    onDeleteTodo ={ onDeleteTodoMock} 
                />)


        const spanElement = screen.getByLabelText('span')
        expect( spanElement.className ).toContain('text-decoration-line-through')

    });

    test('span debe llamar al ToggleTodo cuando se hace click', () => {

        render( <TodoItem 
            todo={todo} 
            onToggleTodo={ onToggleTodoMock }
            onDeleteTodo ={ onDeleteTodoMock } 
        />);

        const spanElement = screen.getByLabelText('span');
        fireEvent.click(spanElement);
        
        expect( onToggleTodoMock ).toHaveBeenCalledWith( todo.id );


    });

    test('boton debe llamar al DeleteTodo cuando se hace click', () => {

        render( <TodoItem 
            todo={todo} 
            onToggleTodo={ onToggleTodoMock }
            onDeleteTodo ={ onDeleteTodoMock } 
        />);

        const spanElement = screen.getByRole('button');
        fireEvent.click(spanElement);
        
        expect( onDeleteTodoMock ).toHaveBeenCalledWith( todo.id );


    });


});