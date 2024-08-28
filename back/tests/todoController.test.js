const Todo = require("../src/models/Todo");
const { getAllTodos } = require("../src/controllers/todoController");

describe("Test controller Todo", () => {
  // Test1:  Vérifiez qu'elle renvoie tous les todos triés par date de création décroissante.
  it("should return all todos sorted by creation date descending", async () => {
    const mockTodos = [
      {
        _id: "2",
        text: "Second Todo",
        completed: true,
        createdAt: new Date("2024-08-28T12:00:00Z"),
      },
      {
        _id: "1",
        text: "First Todo",
        completed: false,
        createdAt: new Date("2024-08-27T12:00:00Z"),
      },
    ];

    Todo.find = jest.fn().mockReturnValue({
      sort: jest.fn().mockResolvedValue(mockTodos),
    });

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

       await getAllTodos(req, res);
 
    expect(Todo.find).toHaveBeenCalledWith();

    expect(Todo.find().sort).toHaveBeenCalledWith({ createdAt: -1 });

    expect(res.json).toHaveBeenCalledWith(mockTodos);
  });

  it("should return a 500 error if there is a server error", async () => {
    Todo.find = jest.fn().mockReturnValue({
      sort: jest.fn().mockRejectedValue(new Error("Server error")),
    });

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    await getAllTodos(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Server error" });
  });
/*/ test2: Assurez-vous qu'elle crée un nouveau todo avec le texte fourni et renvoie un statut 201.
it('Creation de nouveau todo avec renvoi de statut 201', async () => {
  const req = {
    body: {
      text: 'New Todo'
    }
  };
  
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };

  const mockTodo = {
    _id: '1',
    text: 'New Todo',
    completed: false,
    createdAt: new Date()
  };
  
  Todo.prototype.save = jest.fn().mockResolvedValue(mockTodo);

  await createTodo(req, res);

  expect(Todo).toHaveBeenCalledWith({ text: req.body.text });
  expect(Todo.prototype.save).toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.status).toHaveReturnedWith(expect.objectContaining({ statusCode: 201 }));
  expect(res.json).toHaveBeenCalledWith(mockTodo);
});

it('Statut 400', async () => {
  const req = {
    body: {
      text: 'New Todo'
    }
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };
  Todo.prototype.save = jest.fn().mockRejectedValue(new Error('Creation failed'));

  await createTodo(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.status).toHaveReturnedWith(expect.objectContaining({ statusCode: 400 }));
  expect(res.json).toHaveBeenCalledWith({ message: 'Creation failed' });
});*/

})

